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

  describe('recursion fields work', function () {
    it('branches tree', function () {
      cy.intercept('/.well-known/appspecific/de.bsi.secvisogram.json', {
        statusCode: 404,
        body: {},
      }).as('wellKnownAppConfig')

      cy.visit('?tab=WIZZARD')
      cy.wait('@wellKnownAppConfig')

      cy.get(`[data-testid="menu_entry-/product_tree/branches"]`).click()
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches-add_item_button"]`
      ).click()
      cy.get(
        `[data-testid="menu_entry-/product_tree/branches/0/branches-add_item_button"]`
      ).click()
    })
  })
})
