/// <reference types="cypress" />

import { expect } from 'chai'
import CVSSVector from '../../lib/app/SecvisogramPage/View/FormEditorTab/Vulnerabilities/Scores/CVSS3Editor/CVSSVector.js'
import ViewReducer from '../../lib/app/SecvisogramPage/View/Reducer.js'
import { canCreateDocuments } from '../../lib/app/shared/permissions.js'
import { getLoginEnabledConfig } from '../fixtures/appConfigData.js'
import {
  getAdvisory,
  getCreateAdvisoryResponse,
  getGetAdvisoriesResponse,
  getGetAdvisoryDetailResponse,
  getGetTemplateContentResponse,
  getGetTemplatesResponse,
  getTemplates,
  getUserInfo,
  getUsers,
} from '../fixtures/cmsBackendData.js'
import { getValidationResponse } from '../fixtures/csafValidatorServiceData.js'

describe('SecvisogramPage', () => {
  describe('can validate the document against the rest service', function () {
    for (const user of getUsers()) {
      for (const advisory of getGetAdvisoriesResponse()) {
        const { advisoryId } = advisory

        it(`user: ${user.preferredUsername}, advisoryId: ${advisoryId}`, function () {
          cy.intercept(
            '/.well-known/appspecific/de.bsi.secvisogram.json',
            getLoginEnabledConfig()
          ).as('wellKnownAppConfig')
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user)
          ).as('apiGetUserInfo')
          cy.intercept('/api/2.0/advisories/', getGetAdvisoriesResponse()).as(
            'apiGetAdvisories'
          )
          const advisoryDetail = getGetAdvisoryDetailResponse({
            advisory: getAdvisory({ advisoryId }),
          })
          cy.intercept(
            `/api/2.0/advisories/${advisory.advisoryId}/`,
            advisoryDetail
          ).as('apiGetAdvisoryDetail')
          const validationResponse = getValidationResponse({
            document: advisoryDetail.csaf,
          })
          cy.intercept('POST', '/api/v1/validate', validationResponse).as(
            'apiValidate'
          )

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
          cy.wait(500)
          cy.get('[data-testid="validate_button"]').click()
          cy.wait('@apiValidate')
            .its('request.body')
            .should('deep.equal', {
              tests: [
                { type: 'test', name: 'csaf_2_0_strict' },
                { type: 'preset', name: 'mandatory' },
                { type: 'preset', name: 'optional' },
                { type: 'preset', name: 'informative' },
              ],
              document: advisoryDetail.csaf,
            })
          cy.get('[data-testid="number_of_validation_errors"]').should(
            'have.text',
            String(validationResponse.tests.flatMap((t) => t.errors).length)
          )
          for (const error of validationResponse.tests.flatMap(
            (t) => t.errors
          )) {
            cy.get(`[data-testid="attribute_error-${error.instancePath}"]`)
          }
        })
      }
    }
  })

  describe('can open a minimal new document in standalone mode', function () {
    for (const template of [
      { templateId: 'MINIMAL' },
      { templateId: 'ALL_FIELDS' },
    ]) {
      it(`templateId: ${template.templateId}`, function () {
        cy.intercept('/.well-known/appspecific/de.bsi.secvisogram.json', {
          statusCode: 404,
          body: {},
        }).as('wellKnownAppConfig')

        cy.visit('?tab=EDITOR')
        cy.wait('@wellKnownAppConfig')

        cy.get('[data-testid="new_document_button"]').click()

        cy.get(`select[data-testid="new_document-templates-select"]`).select(
          template.templateId
        )

        cy.get(`[data-testid="new_document-create_document_button"]`).click()
        cy.get('[data-testid="new_document_dialog"]').then((el) => {
          expect(/** @type {any} */ (el[0]).open).to.be.false
        })
      })
    }
  })

  describe('can open a new document based on a template', function () {
    for (const user of getUsers()) {
      for (const template of getTemplates()) {
        it(`user: ${user.preferredUsername}, templateId: ${template.templateId}`, function () {
          cy.intercept(
            '/.well-known/appspecific/de.bsi.secvisogram.json',
            getLoginEnabledConfig()
          ).as('wellKnownAppConfig')
          cy.intercept(
            getLoginEnabledConfig().userInfoUrl,
            getUserInfo(user)
          ).as('apiGetUserInfo')
          cy.intercept(
            '/api/2.0/advisories/templates',
            getGetTemplatesResponse()
          ).as('apiGetTemplates')

          cy.visit('?tab=EDITOR')
          cy.wait('@wellKnownAppConfig')
          cy.wait('@apiGetUserInfo')

          cy.get('[data-testid="user_info"]').should('exist')
          if (!canCreateDocuments(user.groups)) {
            cy.get('[data-testid="new_document_button"]').should('not.exist')
          } else {
            cy.get('[data-testid="new_document_button"]').click()
            cy.wait('@apiGetTemplates')

            for (const template of getTemplates()) {
              cy.get(
                `select[data-testid="new_document-templates-select"] option[value="${template.templateId}"]`
              ).should('exist')
            }
            cy.get(
              `select[data-testid="new_document-templates-select"]`
            ).select(template.templateId)

            cy.intercept(
              `/api/2.0/advisories/templates/${template.templateId}`,
              getGetTemplateContentResponse({ template })
            ).as('apiGetTemplateContent')
            const createAdvisoryResponse = getCreateAdvisoryResponse()
            cy.intercept(
              'POST',
              '/api/2.0/advisories',
              createAdvisoryResponse
            ).as('apiCreateAdvisory')
            cy.intercept(
              'GET',
              `/api/2.0/advisories/${createAdvisoryResponse.id}/`,
              getGetAdvisoryDetailResponse({
                advisory: getAdvisory({
                  advisoryId: createAdvisoryResponse.id,
                }),
              })
            ).as('apiGetAdvisoryDetail')
            cy.get(
              `[data-testid="new_document-create_document_button"]`
            ).click()
            cy.wait('@apiCreateAdvisory').then((xhr) => {
              expect(xhr.request.body).deep.equal(template.templateContent)
            })
            cy.wait('@apiGetAdvisoryDetail')
            cy.get('[data-testid="advisory_id"]').should(
              'have.text',
              createAdvisoryResponse.id
            )
            cy.get('[data-testid="new_document_dialog"]').then((el) => {
              expect(/** @type {any} */ (el[0]).open).to.be.false
            })
          }
        })
      }
    }
  })

  describe('View', () => {
    describe('Reducer', () => {
      const generatorEngineData = {
        name: 'Secvisogram',
        version: 'some-version',
      }

      it('The document can be updated', () => {
        let { state } = Fixture()
        const timestamp = new Date('2020-01-01')

        state = ViewReducer(state, {
          type: 'CHANGE_FORM_DOC',
          update: { foo: { $set: 42 } },
          timestamp,
          generatorEngineData,
        })

        expect(state.formValues.doc.foo).to.equal(42)
        expect(state.formValues.doc.document.tracking.generator.date).to.equal(
          timestamp.toISOString()
        )
      })

      it('The document can be reset', () => {
        let { state } = Fixture()
        const doc = {}

        state = ViewReducer(state, {
          type: 'RESET_FORM_DOC',
          doc,
        })

        expect(state.formValues.doc).to.equal(doc)
      })

      it('The document can be updated using a data-path', () => {
        let { state } = Fixture()
        state.formValues.doc = { foobar: {} }
        const timestamp = new Date('2020-01-01')

        state = ViewReducer(state, {
          type: 'CHANGE_FORM_DOC',
          instancePath: '/foobar/test',
          timestamp,
          update: { $set: 42 },
          generatorEngineData,
        })

        expect(state.formValues.doc.foobar.test).to.equal(42)
        expect(state.formValues.doc.document.tracking.generator.date).to.equal(
          timestamp.toISOString()
        )
        expect(
          state.formValues.doc.document.tracking.generator.engine.name
        ).to.equal(generatorEngineData.name)
        expect(
          state.formValues.doc.document.tracking.generator.engine.version
        ).to.equal(generatorEngineData.version)
      })

      it('The form can be reset', () => {
        let { state } = Fixture()
        const values =
          /** @type {ReturnType<typeof ViewReducer>['formValues']} */ ({
            doc: { test: 'it' },
          })

        state = ViewReducer(state, {
          type: 'RESET_FORM',
          values,
        })

        expect(state.formValues).to.equal(values)
      })

      function Fixture() {
        return {
          state: {
            formValues: {
              doc: /** @type {any} */ ({}),
            },
          },
        }
      }
    })

    describe('CVSSMetrics', () => {
      it('3.1 metrics can be calculated', () => {
        const vector = new CVSSVector({
          version: '3.1',
          attackVector: 'NETWORK',
          attackComplexity: 'HIGH',
          privilegesRequired: 'LOW',
          userInteraction: 'REQUIRED',
          scope: 'UNCHANGED',
          confidentialityImpact: 'HIGH',
          integrityImpact: 'HIGH',
          availabilityImpact: 'NONE',
        })
          .set('attackComplexity', 'LOW')
          .set('exploitCodeMaturity', 'NONE')
          .remove('exploitCodeMaturity')
          .set('reportConfidence', 'NOT_DEFINED')

        const data = vector.data
        expect(data.version).to.equal('3.1')
        expect(data.vectorString).to.equal(
          'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )
        expect(data.baseScore).to.equal(7.3)
        expect(data.baseSeverity).to.equal('HIGH')
      })

      it('3.0 metrics can be calculated', () => {
        const vector = new CVSSVector({
          version: '3.0',
          attackVector: 'NETWORK',
          attackComplexity: 'HIGH',
          privilegesRequired: 'LOW',
          userInteraction: 'REQUIRED',
          scope: 'UNCHANGED',
          confidentialityImpact: 'HIGH',
          integrityImpact: 'HIGH',
          availabilityImpact: 'NONE',
        })
          .set('attackComplexity', 'LOW')
          .set('exploitCodeMaturity', 'NONE')
          .remove('exploitCodeMaturity')
          .set('reportConfidence', 'NOT_DEFINED')

        const data = vector.data
        expect(data.version).to.equal('3.0')
        expect(data.vectorString).to.equal(
          'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )
        expect(data.baseScore).to.equal(7.3)
        expect(data.baseSeverity).to.equal('HIGH')
      })

      it('Metrics can be updated from a 3.1 vector-string', () => {
        const vector = new CVSSVector({
          availabilityImpact: 'NONE',
        }).updateFromVectorString(
          'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )

        expect(vector.data).to.contain({
          version: '3.1',
          attackVector: 'NETWORK',
          attackComplexity: 'LOW',
          privilegesRequired: 'LOW',
          userInteraction: 'REQUIRED',
          scope: 'UNCHANGED',
          confidentialityImpact: 'HIGH',
          integrityImpact: 'HIGH',
          availabilityImpact: 'NONE',
        })
      })

      it('Metrics can be updated from a 3.0 vector-string', () => {
        const vector = new CVSSVector({
          availabilityImpact: 'NONE',
        }).updateFromVectorString(
          'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )

        expect(vector.data).to.contain({
          version: '3.0',
          attackVector: 'NETWORK',
          attackComplexity: 'LOW',
          privilegesRequired: 'LOW',
          userInteraction: 'REQUIRED',
          scope: 'UNCHANGED',
          confidentialityImpact: 'HIGH',
          integrityImpact: 'HIGH',
          availabilityImpact: 'NONE',
        })
      })

      it('Updating from an invalid vector-string clears all fields', () => {
        const vector = new CVSSVector({
          availabilityImpact: 'NONE',
          attackVector: '',
          attackComplexity: '',
          privilegesRequired: '',
          userInteraction: '',
          scope: '',
          confidentialityImpact: '',
          integrityImpact: '',
        }).updateFromVectorString('CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:x')

        expect(vector.data).to.contain({
          vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:x',
          version: '',
          attackVector: '',
          attackComplexity: '',
          privilegesRequired: '',
          userInteraction: '',
          scope: '',
          confidentialityImpact: '',
          integrityImpact: '',
          availabilityImpact: '',
        })
        expect(vector.data).to.not.contain({ exploitCodeMaturity: '' })
      })

      it('CVSS3.0 metrics can be calculated', () => {
        const vector = new CVSSVector({
          version: '3.0',
          attackVector: 'NETWORK',
          attackComplexity: 'HIGH',
          privilegesRequired: 'LOW',
          userInteraction: 'REQUIRED',
          scope: 'UNCHANGED',
          confidentialityImpact: 'HIGH',
          integrityImpact: 'HIGH',
          availabilityImpact: 'NONE',
          vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N',
        })
          .set('attackComplexity', 'LOW')
          .set('exploitCodeMaturity', 'NONE')
          .remove('exploitCodeMaturity')
          .set('reportConfidence', 'NOT_DEFINED')

        const data = vector.data
        expect(data.vectorString).to.equal(
          'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )
        expect(data.baseScore).to.equal(7.3)
        expect(data.baseSeverity).to.equal('HIGH')
        expect(data.version).to.equal('3.0')
      })

      it('A 3.0 valid vector-string can be upgraded', () => {
        const vector = new CVSSVector({
          vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N',
        }).updateFromVectorString(
          'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )

        expect(vector.canBeUpgraded).to.be.true
        const upgradedVector = vector.updateVectorStringTo31()
        expect(upgradedVector.data.vectorString).to.equal(
          'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )
        expect(upgradedVector.data.version).to.equal('3.1')
      })

      it('An invalid vector-string can not be upgraded', () => {
        const vector = new CVSSVector({})

        expect(vector.canBeUpgraded).to.be.false
      })

      it('A 3.1 valid vector-string can not be upgraded', () => {
        const vector = new CVSSVector({})
          .updateFromVectorString(
            'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
          )
          .updateVectorStringTo31()

        expect(vector.canBeUpgraded).to.be.false
      })
    })
  })
})
