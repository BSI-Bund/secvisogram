import { expect } from 'chai'
import CVSSMetrics from '../lib/SecvisogramPage/View/EditorTab/Vulnerabilities/Scores/CVSS3Editor/CVSSMetrics'
import ViewReducer from '../lib/SecvisogramPage/View/Reducer'

suite('SecvisogramPage', () => {
  suite('View', () => {
    suite('Reducer', () => {
      test('The document can be updated', () => {
        let { state } = Fixture()

        state = ViewReducer(state, {
          type: 'CHANGE_FORM_DOC',
          update: { $set: 42 },
        })

        expect(state.formValues.doc).to.equal(42)
      })

      test('The document can be updated using a data-path', () => {
        let { state } = Fixture()
        state.formValues.doc = { foobar: {} }

        state = ViewReducer(state, {
          type: 'CHANGE_FORM_DOC',
          dataPath: '/foobar/test',
          update: { $set: 42 },
        })

        expect(state.formValues.doc.foobar.test).to.equal(42)
      })

      test('The form can be reset', () => {
        let { state } = Fixture()
        const values = /** @type {ReturnType<typeof ViewReducer>['formValues']} */ ({
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

    suite('CVSSMetrics', () => {
      test('A vector-string can be generated', () => {
        const vector = new CVSSMetrics({
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

        expect(vector.vectorString).to.equal(
          'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:N'
        )
      })

      test('Metrics can be updated from a vector-string', () => {
        const vector = new CVSSMetrics({
          availabilityImpact: 'NONE',
        }).updateFromVectorString('CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:H/I:H')

        expect(vector.data).to.deep.equal({
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
    })
  })
})
