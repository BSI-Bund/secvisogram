import update from 'immutability-helper'

/**
 * @typedef {Object} FormValues
 * @property {D | null} doc
 * @template {unknown} D
 */

/**
 * @typedef {Object} State
 * @property {FormValues<D>} formValues
 * @template {unknown} D
 */

/**
 * @param {State<D>} state
 * @param {
    | { type: 'CHANGE_FORM_DOC'; update: import('immutability-helper').Spec<D | null, never> }
    | { type: 'RESET_FORM'; values: FormValues<D> }
  } action
 * @template {unknown} D
 * @returns {State<D>}
 */
export default function Reducer(state, action) {
  switch (action.type) {
    case 'CHANGE_FORM_DOC':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          doc: JSON.parse(
            JSON.stringify(update(state.formValues.doc, action.update))
          ),
        },
      }
    case 'RESET_FORM':
      return { ...state, formValues: action.values }
    default:
      return state
  }
}
