import { canCreateDocuments } from '../../../lib/app/shared/permissions.js'
import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'
import {
  canChangeDocument,
  getAdvisories,
  getCreateAdvisoryResponse,
  getGetAdvisoriesResponse,
  getGetAdvisoryDetailResponse,
  getUserInfo,
  getUsers,
} from '../../fixtures/cmsBackendData.js'

describe('SecvisogramPage / EditorTab', function () {
  describe('can save new documents', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        it(`user: ${user.preferredUsername}, advisoryId: ${advisory.advisoryId}`, function () {
          cy.intercept(
            '/.well-known/appspecific/de.bsi.secvisogram.json',
            getLoginEnabledConfig()
          ).as('wellKnownAppConfig')
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user)
          ).as('apiGetUserInfo')
          cy.intercept(
            'GET',
            '/api/2.0/advisories/',
            getGetAdvisoriesResponse()
          ).as('apiGetAdvisories')

          cy.visit('?tab=EDITOR')
          cy.wait('@wellKnownAppConfig')
          cy.wait('@apiGetUserInfo')

          const documentTitle = 'some-more-text'
          cy.get('[data-testid="attribute-/document/title"] input')
            .clear()
            .type(documentTitle)

          const createAdvisoryResponse = getCreateAdvisoryResponse()
          cy.intercept(
            'POST',
            '/api/2.0/advisories',
            createAdvisoryResponse
          ).as('apiCreateAdvisory')
          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
            userName: user.user,
          })
          if (canCreateDocuments(user.groups)) {
            cy.intercept(
              'GET',
              `/api/2.0/advisories/${createAdvisoryResponse.id}/`,
              advisoryDetail
            ).as('apiGetAdvisoryDetail')
            cy.get('[data-testid="save_button"]').click()

            cy.wait('@apiCreateAdvisory').then((xhr) => {
              expect(xhr.request.body.document.title).to.equal(documentTitle)
            })
            cy.wait('@apiGetAdvisoryDetail')
            cy.get('[data-testid="document_tracking_id"]').should(
              'have.text',
              advisoryDetail.csaf.document.title
            )
          } else {
            cy.get('[data-testid="save_button"]').should('not.exist')
          }
        })
      }
    }
  })

  describe('can save documents', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories()) {
        it(`user: ${user.preferredUsername}, advisoryId: ${
          advisory.advisoryId
        }, canChangeDocument: ${canChangeDocument(user.user)}`, function () {
          cy.intercept(
            '/.well-known/appspecific/de.bsi.secvisogram.json',
            getLoginEnabledConfig()
          ).as('wellKnownAppConfig')
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user)
          ).as('apiGetUserInfo')
          cy.intercept(
            'GET',
            '/api/2.0/advisories/',
            getGetAdvisoriesResponse()
          ).as('apiGetAdvisories')

          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
            userName: user.user,
          })
          cy.intercept(
            'GET',
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

          const documentTitle =
            /** @type {any} */ (advisoryDetail.csaf).document.title +
            '-some-more-text'
          cy.get('[data-testid="attribute-/document/title"] input')
            .clear()
            .type(documentTitle)

          if (canChangeDocument(user.user)) {
            cy.intercept(
              'PATCH',
              `/api/2.0/advisories/${advisory.advisoryId}/?revision=${advisoryDetail.revision}`,
              {}
            ).as('apiUpdateAdvisory')
            cy.get('[data-testid="save_button"]').click()

            cy.wait('@apiUpdateAdvisory').then((xhr) => {
              expect(xhr.request.body.document.title).to.equal(documentTitle)
            })
            cy.wait('@apiGetAdvisoryDetail')
          } else {
            cy.get('[data-testid="save_button"]').should('not.exist')
          }
        })
      }
    }
  })
})
