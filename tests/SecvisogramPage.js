import { expect } from 'chai'
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
              doc: /** @type {{} | null} */ ({}),
            },
          },
        }
      }
    })
  })
})
