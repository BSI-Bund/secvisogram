import { getAdvisories, getAdvisory } from '../../fixtures/cmsBackendData.js'
import testsSample from '../../fixtures/samples/cmsBackendData/tests.js'

describe('SecvisogramPage / DocumentsTab', function () {
  beforeEach(function () {
    cy.intercept('/api/2.0/advisories/', getAdvisories(testsSample)).as(
      'apiGetAdvisories'
    )
  })

  it('can fetch documents from the csaf cms backend', function () {
    cy.visit('?tab=DOCUMENTS')

    for (const advisory of getAdvisories(testsSample)) {
      cy.get(
        `[data-testid="advisory-${advisory.advisoryId}-list_entry"]`
      ).should('exist')
      cy.get(
        `[data-testid="advisory-${advisory.advisoryId}-list_entry-workflow_state"]`
      ).should('have.text', advisory.workflowState)
    }
  })

  describe('can delete documents', function () {
    for (const advisory of getAdvisories(testsSample)) {
      it(`advisoryId=${advisory.advisoryId}`, function () {
        const advisoryDetail = getAdvisory(testsSample, {
          advisoryId: advisory.advisoryId,
        })
        cy.intercept(
          {
            method: 'DELETE',
            url: `/api/2.0/advisories/${advisory.advisoryId}/?revision=${advisoryDetail.revision}`,
          },
          { statusCode: 204 }
        ).as('apiDeleteAdvisory')
        cy.intercept(
          `/api/2.0/advisories/${advisory.advisoryId}/`,
          advisoryDetail
        ).as('apiGetAdvisoryDetail')

        cy.visit('?tab=DOCUMENTS')
        cy.wait('@apiGetAdvisories')

        // Pretend to have the advisory removed
        cy.intercept(
          '/api/2.0/advisories/',
          getAdvisories(testsSample).filter(
            (a) => a.advisoryId !== advisory.advisoryId
          )
        ).as('apiGetAdvisories')

        cy.get(
          `[data-testid="advisory-${advisory.advisoryId}-list_entry-delete_button"]`
        ).click()
        cy.get('[data-testid="alert-confirm_button"]').click()
        cy.wait([
          '@apiGetAdvisoryDetail',
          '@apiDeleteAdvisory',
          '@apiGetAdvisories',
        ])
        cy.get('[data-testid="loading_indicator"]').should('not.exist')
        cy.get(
          `[data-testid="advisory-${advisory.advisoryId}-list_entry"]`
        ).should('not.exist')
      })
    }
  })
})
