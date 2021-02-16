import update from 'immutability-helper'
import { parse } from 'json-pointer'
import { compose, set } from 'lodash/fp'

/** @typedef {unknown} Doc */

/**
 * @typedef {Object} FormValues
 * @property {Doc | null} doc
 */

/**
 * @typedef {Object} State
 * @property {FormValues} formValues
 */

/**
 * @param {State} state
 * @param {
    | { type: 'CHANGE_FORM_DOC'; dataPath?: string; update: any; timestamp: Date }
    | { type: 'RESET_FORM_DOC'; doc: Doc }
    | { type: 'RESET_FORM'; values: FormValues }
  } action
 * @returns {State}
 */
export default function Reducer(state, action) {
  switch (action.type) {
    case 'RESET_FORM_DOC':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          doc: action.doc,
        },
      }
    case 'CHANGE_FORM_DOC': {
      const setGeneratorFields = compose(
        set('document.tracking.generator.date', action.timestamp.toISOString()),
        set('document.tracking.generator.engine', 'Secvisogram')
      )
      return {
        ...state,
        formValues: {
          ...state.formValues,
          doc: setGeneratorFields(
            action.dataPath
              ? /** @type {{}} */ (update(
                  state.formValues.doc,
                  /** @type {any} */ (set(
                    parse(action.dataPath),
                    action.update,
                    {}
                  ))
                ))
              : update(state.formValues.doc, action.update)
          ),
        },
      }
    }
    case 'RESET_FORM':
      return { ...state, formValues: action.values }
    default:
      return state
  }
}
