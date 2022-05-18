import { deleteAdvisory } from '../../../lib/app/SecvisogramPage/DocumentsTab/service.js'
import { getAdvisories, getAdvisory } from '../../fixtures/cmsBackendData.js'
import testsSample from '../../fixtures/samples/cmsBackendData/tests.js'

describe('SecvisogramPage / DocumentsTab / service', function () {
  it('can fetch documents from the csaf cms backend', function () {
    cy.intercept('/api/2.0/advisories/', getAdvisories(testsSample))

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

        cy.then(async () => {
          await deleteAdvisory({ advisoryId: advisory.advisoryId })
        })

        cy.wait(['@apiGetAdvisoryDetail', '@apiDeleteAdvisory'])
      })
    }
  })
})
