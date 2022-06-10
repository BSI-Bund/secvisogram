import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'
import {
  getAdvisories,
  getAdvisory,
  getUserInfo,
  getUsers,
} from '../../fixtures/cmsBackendData.js'
import testsSample from '../../fixtures/samples/cmsBackendData/tests.js'

describe('SecvisogramPage / DocumentsTab', function () {
  beforeEach(function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')
    cy.intercept('/api/2.0/advisories/', getAdvisories(testsSample)).as(
      'apiGetAdvisories'
    )
  })

  describe('can fetch documents from the csaf cms backend', function () {
    for (const user of getUsers()) {
      it(`user: ${user.preferredUsername}`, function () {
        cy.intercept(getLoginEnabledConfig().userInfoUrl, getUserInfo(user)).as(
          'apiGetUserInfo'
        )

        cy.visit('?tab=DOCUMENTS')

        cy.wait('@wellKnownAppConfig')
        cy.wait('@apiGetUserInfo')
        for (const advisory of getAdvisories(testsSample)) {
          cy.get(
            `[data-testid="advisory-${advisory.advisoryId}-list_entry"]`
          ).should('exist')
          cy.get(
            `[data-testid="advisory-${advisory.advisoryId}-list_entry-workflow_state"]`
          ).should('have.text', advisory.workflowState)
        }
      })
    }
  })

  describe('can delete documents', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories(testsSample)) {
        it(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}`, function () {
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user)
          ).as('apiGetUserInfo')
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
          cy.wait('@wellKnownAppConfig')
          cy.wait('@apiGetUserInfo')
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
    }
  })

  describe('can open documents', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories(testsSample)) {
        it(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}`, function () {
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user)
          ).as('apiGetUserInfo')
          const advisoryDetail = getAdvisory(testsSample, {
            advisoryId: advisory.advisoryId,
          })
          cy.intercept(
            `/api/2.0/advisories/${advisory.advisoryId}/`,
            advisoryDetail
          ).as('apiGetAdvisoryDetail')

          cy.visit('?tab=DOCUMENTS')
          cy.wait('@wellKnownAppConfig')
          cy.wait('@apiGetUserInfo')
          cy.wait('@apiGetAdvisories')

          cy.get(
            `[data-testid="advisory-${advisory.advisoryId}-list_entry-open_button"]`
          ).click()
          cy.wait('@apiGetAdvisoryDetail')
          cy.get('[data-testid="loading_indicator"]').should('not.exist')
          cy.location('search').should('equal', '?tab=EDITOR')
          cy.get('[data-testid="attribute-/document/title"] input').should(
            'have.value',
            /** @type {any} */ (advisoryDetail.csaf).document.title
          )
          cy.get('[data-testid="document_tracking_id"]').should(
            'have.text',
            /** @type {any} */ (advisoryDetail.csaf).document.title
          )
        })
      }
    }
  })
})
