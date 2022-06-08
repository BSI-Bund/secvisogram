import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'
import {
  getAdvisories,
  getAdvisory,
  getUserInfo,
  getUsers,
} from '../../fixtures/cmsBackendData.js'
import testsSample from '../../fixtures/samples/cmsBackendData/tests.js'

describe('SecvisogramPage / EditorTab', function () {
  describe('can save documents', function () {
    for (const user of getUsers()) {
      for (const advisory of getAdvisories(testsSample)) {
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
            getAdvisories(testsSample)
          ).as('apiGetAdvisories')

          const advisoryDetail = getAdvisory(testsSample, {
            advisoryId: advisory.advisoryId,
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
            JSON.parse(advisoryDetail.csaf).document.title + '-some-more-text'
          cy.get('[data-testid="attribute-/document/title"] input')
            .clear()
            .type(documentTitle)

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
        })
      }
    }
  })
})
