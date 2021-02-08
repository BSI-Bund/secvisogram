import { expect } from 'chai'
import CVSSVector from '../lib/SecvisogramPage/View/EditorTab/Vulnerabilities/Scores/CVSS3Editor/CVSSVector'
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

    suite('CVSSVector', () => {
      test('A vector-string can be generated', () => {
        const vector = new CVSSVector({ attackVector: 'NETWORK' })
          .set('attackComplexity', 'LOW')
          .set('privilegesRequired', 'NONE')
          .remove('privilegesRequired')
          .set('reportConfidence', 'NOT_DEFINED')

        expect(vector.toString()).to.equal('CVSS:3.1/AV:N/AC:L/RC:X')
      })
    })
  })
})
