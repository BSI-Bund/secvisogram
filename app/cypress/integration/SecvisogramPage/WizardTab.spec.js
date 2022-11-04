import { getObjectMenuStructure } from '../../../lib/app/SecvisogramPage/View/WizardTab/editors/GenericEditor/ObjectEditor.js'
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

  describe('getObjectMenuStructure()', function () {
    it('can calculate the menu structure for the top level sidebar', function () {
      expect(
        getObjectMenuStructure(
          /** @type {import('../../../lib/app/SecvisogramPage/View/WizardTab/schema.js').Property} */ (
            schema
          )
        )
      ).to.deep.equal([
        {
          instancePath: ['document'],
          title: 'Document level meta-data',
        },
        {
          instancePath: ['document', 'acknowledgments'],
          title: 'List of acknowledgments',
        },
        {
          instancePath: ['document', 'aggregate_severity'],
          title: 'Aggregate severity',
        },
        {
          instancePath: ['document', 'distribution'],
          title: 'Rules for sharing document',
        },
        {
          instancePath: ['document', 'notes'],
          title: 'List of notes',
        },
        {
          instancePath: ['document', 'publisher'],
          title: 'Publisher',
        },
        {
          instancePath: ['document', 'references'],
          title: 'List of references',
        },
        {
          instancePath: ['document', 'tracking'],
          title: 'Tracking',
        },
        {
          instancePath: ['product_tree'],
          title: 'Product tree',
        },
        {
          instancePath: ['product_tree', 'branches'],
          title: 'List of branches',
        },
        {
          instancePath: ['product_tree', 'full_product_names'],
          title: 'List of full product names',
        },
        {
          instancePath: ['product_tree', 'product_groups'],
          title: 'List of product groups',
        },
        {
          instancePath: ['product_tree', 'relationships'],
          title: 'List of relationships',
        },
        {
          instancePath: ['vulnerabilities'],
          title: 'Vulnerabilities',
        },
      ])
    })
  })
})
