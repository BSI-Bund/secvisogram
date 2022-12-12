import { getObjectMenuPaths } from '../../../lib/app/SecvisogramPage/View/WizardTab/editors/GenericEditor/ObjectEditor.js'
import schema from '../../../lib/app/SecvisogramPage/View/WizardTab/schema.js'
import { getLoginEnabledConfig } from '../../fixtures/appConfigData.js'

describe('SecvisogramPage / WizardTab', function () {
  it('can display usage help', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=WIZZARD')
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

      cy.visit('?tab=WIZZARD')
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
          /** @type {import('../../../lib/app/SecvisogramPage/View/WizardTab/schema.js').Property} */ (
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

    cy.visit('?tab=WIZZARD')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="menu_entry-/document"]`).click()

    // without a selected document category all menu items should be displayed
    cy.get(`[data-testid="layer-button-best_practice"]`).click()
    cy.get(`[data-testid="menu_entry-/document/aggregate_severity"]`).should(
      'exist'
    )

    const documentCategory = 'csaf_base'
    cy.get('[data-testid="attribute-document-category"] input')
      .clear()
      .type(documentCategory)

    // aggregate severity menu item should not be displayed for level best_practice
    cy.get(`[data-testid="layer-button-best_practice"]`).click()
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

  it('shows errors in sidebar according to selected path', function () {
    cy.intercept(
      '/.well-known/appspecific/de.bsi.secvisogram.json',
      getLoginEnabledConfig()
    ).as('wellKnownAppConfig')

    cy.visit('?tab=WIZZARD')
    cy.wait('@wellKnownAppConfig')

    cy.get(`[data-testid="document-publisher-infoButton"]`).click()

    // there should be 3 error cards under /document/publisher for a default minimal document
    cy.get(`[data-testid="error-cards"] div`).should('have.length', 3)

    cy.get(`[data-testid="menu_entry-/document/publisher"]`).click()
    cy.get(`[data-testid="document-publisher-name-infoButton"]`).click()

    // there should be one error card for /document/publisher/name and none for the sibling namespace
    cy.get(`[data-testid="error-cards"] div`).should('have.length', 1)
    cy.get(`[data-testid="error_card-/document/publisher/name-0"]`).should(
      'exist'
    )
    cy.get(`[data-testid="error_card-/document/publisher/namespace-1"]`).should(
      'not.exist'
    )
  })
})
