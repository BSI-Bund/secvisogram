import React from 'react'
import { render } from 'react-dom'
import DocumentsTabView from '../../../../lib/app/SecvisogramPage/DocumentsTab/View.js'
import SecvisogramPageView from '../../../../lib/app/SecvisogramPage/View.js'
import {
  documentsTabViewSample,
  secvisogramPageViewSample,
} from '../../../../viewSamples.js'

describe('SecvisogramPage / DocumentsTab / View', function () {
  it('can show the documents', function () {
    cy.stub().as('onGetData')

    cy.visit('/cypress')

    cy.document().then((doc) => {
      const root = doc.createElement('div')
      doc.body.appendChild(root)
      render(
        <SecvisogramPageView
          {...secvisogramPageViewSample.documentsTab.props}
          DocumentsTab={(props) => (
            <DocumentsTabView
              {...documentsTabViewSample.basic.props}
              {...props}
              defaultData={null}
              onGetData={this.onGetData}
            />
          )}
        />,
        root
      )
    })
    cy.get('[data-testid="loading_indicator"]').should('exist')
    cy.get('@onGetData').invoke(
      'yield',
      documentsTabViewSample.basic.props.defaultData
    )

    for (const advisory of documentsTabViewSample.basic.props.defaultData
      .advisories) {
      cy.get(
        `[data-testid="advisory-${advisory.advisoryId}-list_entry"]`
      ).should('exist')
      cy.get(
        `[data-testid="advisory-${advisory.advisoryId}-list_entry-workflow_state"]`
      ).should('have.text', advisory.workflowState)
    }
  })

  it('can delete documents', function () {
    cy.stub().as('onGetData')
    cy.stub().as('onDeleteAdvisory')

    cy.visit('/cypress')

    cy.document().then((doc) => {
      const root = doc.createElement('div')
      doc.body.appendChild(root)
      render(
        <SecvisogramPageView
          {...secvisogramPageViewSample.documentsTab.props}
          DocumentsTab={(props) => (
            <DocumentsTabView
              {...documentsTabViewSample.basic.props}
              {...props}
              defaultData={null}
              onGetData={this.onGetData}
              onDeleteAdvisory={this.onDeleteAdvisory}
            />
          )}
        />,
        root
      )
    })

    cy.get('@onGetData').invoke(
      'yield',
      documentsTabViewSample.basic.props.defaultData
    )

    for (const advisory of documentsTabViewSample.basic.props.defaultData
      .advisories) {
      cy.get(
        `[data-testid="advisory-${advisory.advisoryId}-list_entry-delete_button"]`
      ).click()
      cy.get('[data-testid="alert-confirm_button"]').click()
      cy.get('@onDeleteAdvisory').should('have.been.calledWith', {
        advisoryId: advisory.advisoryId,
      })
      cy.get('[data-testid="alert"]').should('not.exist')
      cy.get('[data-testid="loading_indicator"]').should('exist')
      cy.get('@onDeleteAdvisory').invoke('yield')
      cy.get('@onGetData').should('have.been.calledTwice')
      cy.get('@onGetData')
        .invoke('getCall', 1)
        .invoke('yield', {
          ...documentsTabViewSample.basic.props,
          advisories:
            documentsTabViewSample.basic.props.defaultData.advisories.filter(
              (a) => a.advisoryId !== advisory.advisoryId
            ),
        })
      cy.get('[data-testid="loading_indicator"]').should('not.exist')
      cy.get(
        `[data-testid="advisory-${advisory.advisoryId}-list_entry"]`
      ).should('not.exist')
    }
  })
})
