import update from 'immutability-helper'
import { parse } from 'json-pointer'
import { compose, set } from 'lodash/fp'

/* eslint-disable */
const secvisogramVersion =
  typeof SECVISOGRAM_VERSION !== 'undefined'
    ? SECVISOGRAM_VERSION.startsWith('v')
      ? SECVISOGRAM_VERSION.substr(1)
      : SECVISOGRAM_VERSION
    : 'unidentified version'
/* eslint-enable */

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
 * Manages updates of the editor state.
 * @see https://github.com/kolodny/immutability-helper#readme
 *
 * @param {State} state
 * @param {
 *   | { type: 'CHANGE_FORM_DOC'; dataPath?: string; update: any; timestamp: Date }
 *   | { type: 'RESET_FORM_DOC'; doc: Doc }
 *   | { type: 'RESET_FORM'; values: FormValues }
 * } action
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
        set('document.tracking.generator.engine.name', 'Secvisogram'),
        set('document.tracking.generator.engine.version', secvisogramVersion),
        set('document.tracking.generator.date', action.timestamp.toISOString())
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
