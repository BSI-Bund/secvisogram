import { getObjectMenuPaths } from '../../../lib/app/SecvisogramPage/View/FormEditor/editors/GenericEditor/ObjectEditor.js'
import schema from '../../../lib/app/SecvisogramPage/View/FormEditor/schema.js'
import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'
import {
  canChangeDocument,
  getAdvisories,
  getGetAdvisoriesResponse,
  getGetAdvisoryDetailResponse,
  getUserInfo,
  getUsers,
} from '../../fixtures/cmsBackendData.js'
import {
  advisoryIdV1,
  latestRevisionHistoryLegacyVersion,
  latestRevisionHistorySummary,
} from '../../fixtures/samples/cmsBackendData/tests.js'

describe('SecvisogramPage / FormEditor Tab', function () {
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
            '/api/v1/advisories/',
            getGetAdvisoriesResponse()
          ).as('apiGetAdvisories')

          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisoryId: advisory.advisoryId,
            userName: user.user,
          })
          cy.intercept(
            'GET',
            `/api/v1/advisories/${advisory.advisoryId}/`,
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

          cy.get(`[data-testid="menu_entry-/document"]`).click()

          const documentTitle =
            /** @type {any} */ (advisoryDetail.csaf).document.title +
            '-some-more-text'
          cy.get('[data-testid="attribute-document-title"] input')
            .clear()
            .type(documentTitle)

          if (canChangeDocument(user.user)) {
            cy.setCookie('XSRF-TOKEN', 'test-Value-123')
            cy.intercept(
              'PATCH',
              `/api/v1/advisories/${advisory.advisoryId}/?revision=${advisoryDetail.revision}`,
              {}
            ).as('apiUpdateAdvisory')
            cy.get('[data-testid="save_button"]').click()

            // check if the input fields are pre-filled with the latest revision history item data
            // for draft documents (version < 1) and if no revision history is given the fields should be empty
            let expectedSummary = ''
            let expectedLegacyVersion = ''
            if (advisory.advisoryId === advisoryIdV1) {
              expectedSummary = latestRevisionHistorySummary
              expectedLegacyVersion = latestRevisionHistoryLegacyVersion
            }

            cy.get('[data-testid="submit_version-summary-textarea"]')
              .should('have.value', expectedSummary)
              .as('prefilledSummary')
            cy.get('[data-testid="submit_version-legacy_version-input"]')
              .should('have.value', expectedLegacyVersion)
              .as('prefilledLegacyVersion')

            const summary = 'Summary'
            const legacyVersion = 'Legacy version'
            cy.get('@prefilledSummary').clear().type(summary)
            cy.get('@prefilledLegacyVersion').clear().type(legacyVersion)
            cy.get('[data-testid="submit_version-submit"]').click()
            cy.get('[data-testid="submit_version"]').should('not.exist')

            cy.wait('@apiUpdateAdvisory').then((xhr) => {
              expect(xhr.request.body.csaf.document.title).to.equal(
                documentTitle
              )
              expect(xhr.request.body.summary).to.equal(summary)
              expect(xhr.request.body.legacyVersion).to.equal(legacyVersion)
            })
            cy.wait('@apiGetAdvisoryDetail')
          } else {
            cy.get('[data-testid="save_button"]').should('not.exist')
          }
        })
      }
    }
  })

  it('can display usage help', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="document-acknowledgments-infoButton"]`).click()
    cy.get(`[data-testid="sideBar-DOCUMENTATION-button"]`).click()
    const infoPanelContent = cy.get('[data-testid="infoPanel-content"]')
    infoPanelContent.should('exist')
    infoPanelContent.should('contain.text', 'Acknowledgments - Usage')
  })

  describe('can add and remove new array items from object editor', function () {
    it('/product_tree/branches', function () {
      cy.intercept('/.well-known/appspecific/de.bsi.secvisogram.json', {
        statusCode: 404,
        body: {},
      }).as('wellKnownAppConfig')

      cy.visit('?tab=EDITOR')
      cy.wait('@wellKnownAppConfig')

      cy.get(`[data-testid="menu_entry-/product_tree/branches"]`).click()
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches-add_item_button"]`
      ).click({ force: true })
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches/0/branches"]`
      ).should('have.class', 'menu_entry-selected')
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches/0/branches-add_item_button"]`
      ).click({ force: true })
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches/0/branches/0/branches"]`
      ).should('have.class', 'menu_entry-selected')

      cy.get(`[data-testid="product_tree-branches-0-deleteButton"]`).click({
        force: true,
      })
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches/0/branches/0/branches"]`
      ).should('not.exist')
    })
  })

  describe('getMenuPaths()', function () {
    it('can calculate the menu structure for the top level sidebar', function () {
      expect(
        getObjectMenuPaths(
          /** @type {import('../../../lib/app/SecvisogramPage/View/FormEditor/schema.js').Property} */ (
            schema
          )
        )
      ).to.deep.equal([
        { instancePath: ['document'] },
        { instancePath: ['document', 'acknowledgments'] },
        { instancePath: ['document', 'aggregate_severity'] },
        { instancePath: ['document', 'distribution'] },
        { instancePath: ['document', 'notes'] },
        { instancePath: ['document', 'publisher'] },
        { instancePath: ['document', 'references'] },
        { instancePath: ['document', 'tracking'] },
        { instancePath: ['product_tree'] },
        { instancePath: ['product_tree', 'branches'] },
        { instancePath: ['product_tree', 'full_product_names'] },
        { instancePath: ['product_tree', 'product_groups'] },
        { instancePath: ['product_tree', 'relationships'] },
        { instancePath: ['vulnerabilities'] },
      ])
    })
  })

  it('shows fields based on selected level', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="menu_entry-/document"]`).click()

    // with default category csaf_base publisher should be displayed
    cy.get(`[data-testid="layer-button-best_practice"]`).click()
    cy.get(`[data-testid="menu_entry-/document/publisher"]`).should('exist')

    // aggregate severity menu should not be displayed for level best_practice
    cy.get(`[data-testid="menu_entry-/document/aggregate_severity"]`).should(
      'not.exist'
    )

    // the language attribute should not be displayed for level mandatory
    cy.get(`[data-testid="layer-button-mandatory"]`).click()
    cy.get(`[data-testid="attribute-document-lang"]`).should('not.exist')

    // it should exist for level nice_to_know
    cy.get(`[data-testid="layer-button-nice_to_know"]`).click()
    cy.get(`[data-testid="attribute-document-lang"]`).should('exist')
  })

  it('hides "Fields" button when no input fields are shown', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="menu_entry-/document/distribution"]`).click()
    cy.get(`[data-testid="document/distribution-fieldButton"]`).should('exist')
    cy.get(`[data-testid="layer-button-want_to_have"]`).click()
    cy.get(`[data-testid="document/distribution-fieldButton"]`).should(
      'not.exist'
    )
  })

  it('selects the closest relevant path if the selected becomes irrelevant', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="menu_entry-/document"]`).click()
    cy.get(`[data-testid="menu_entry-/document/tracking"]`).click()
    cy.get(`[data-testid="menu_entry-/document/tracking/generator"]`).click()
    cy.get(`[data-testid="layer-button-best_practice"]`).click()
    cy.get(
      `[data-testid="menu_entry-/document/tracking/generator/engine"]`
    ).should('not.exist')
  })

  it('selects the closest relevant path if the selected becomes irrelevant when deep down', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="menu_entry-/vulnerabilities-add_item_button"]`).click(
      { force: true }
    )
    cy.get(
      `[data-testid="menu_entry-/vulnerabilities/0/scores-add_item_button"]`
    ).click({ force: true })
    cy.get(
      `[data-testid="menu_entry-/vulnerabilities/0/scores/0/cvss_v3"]`
    ).click()
    cy.get(`[data-testid="layer-button-mandatory"]`).click()
    cy.get(`[data-testid="vulnerabilities-0-infoButton"]`).should('not.exist')
  })

  it('shows errors in sidebar according to selected path', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="document-tracking-infoButton"]`).click()

    // there should be 6 error cards under /document/tracking for the default minimal document
    cy.get(`[data-testid="error-cards"] div`).should('have.length', 6)

    cy.get(`[data-testid="menu_entry-/document/tracking"]`).click()
    cy.get('[data-testid="attribute-document-tracking-version"] input')
      .clear()
      .type('doesNotMatchRegex')
    cy.get(`[data-testid="document-tracking-version-infoButton"]`).click()

    // there should be one error card for /document/tracking/version when it does not match the expected regex
    cy.get(`[data-testid="error-cards"] div`).should('have.length', 1)
    cy.get(`[data-testid="error_card-/document/tracking/version-0"]`).should(
      'exist'
    )
  })

  it('enable fields that should be editable when not logged in', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=EDITOR')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="menu_entry-/document/tracking"]`).click()
    cy.get(`[data-testid="menu_entry-/document/tracking/generator"]`).click()
    cy.get(
      `[data-testid="menu_entry-/document/tracking/generator/engine"]`
    ).click()
    cy.get(
      `[data-testid="attribute-document-tracking-generator-engine-name"] input`
    ).should('not.have.attr', 'disabled')
  })

  it('disable fields that should not be editable when logged in', function () {
    for (const user of getUsers()) {
      cy.intercept(
        '/.well-known/appspecific/de.bsi.secvisogram.json',
        getLoginEnabledConfig()
      ).as('wellKnownAppConfig')
      cy.intercept(getLoginEnabledConfig().userInfoUrl, getUserInfo(user)).as(
        'apiGetUserInfo'
      )

      cy.visit('?tab=EDITOR')
      cy.wait('@wellKnownAppConfig')
      cy.wait('@apiGetUserInfo')

      cy.get(`[data-testid="menu_entry-/document/tracking"]`).click()
      cy.get(`[data-testid="menu_entry-/document/tracking/generator"]`).click()
      cy.get(
        `[data-testid="menu_entry-/document/tracking/generator/engine"]`
      ).click()
      cy.get(
        `[data-testid="attribute-document-tracking-generator-engine-name"] input`
      ).should('have.attr', 'disabled')
    }
  })

  it('correctly display errors when adding and deleting elements from arrays', function () {
    for (const user of getUsers()) {
      cy.intercept(
        '/.well-known/appspecific/de.bsi.secvisogram.json',
        getLoginEnabledConfig()
      ).as('wellKnownAppConfig')
      cy.intercept(getLoginEnabledConfig().userInfoUrl, getUserInfo(user)).as(
        'apiGetUserInfo'
      )

      cy.visit('?tab=EDITOR')
      cy.wait('@wellKnownAppConfig')
      cy.wait('@apiGetUserInfo')

      cy.get(
        '[data-testid="error_indicator-object/vulnerabilities"] svg'
      ).should('have.class', 'text-green-600')
      cy.get(
        '[data-testid="menu_entry-/vulnerabilities-add_item_button"]'
      ).click({ force: true })
      cy.get(
        '[data-testid="error_indicator-object/vulnerabilities"] svg'
      ).should('have.class', 'text-red-600')
      cy.get('[data-testid="vulnerabilities-0-deleteButton"]').click({
        force: true,
      })
      cy.get(
        '[data-testid="error_indicator-object/vulnerabilities"] svg'
      ).should('have.class', 'text-green-600')
    }
  })
})
