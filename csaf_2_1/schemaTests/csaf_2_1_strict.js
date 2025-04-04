import csafAjv from '../../lib/shared/csafAjv.js'
import schema from './csaf_2_1_strict/schema.js'

const validate = csafAjv.compile(schema)

/**
 * @param {any} doc
 */
export default function csaf_2_1_strict(doc) {
  let isValid = validate(doc)
  /**
   *
   * @type {Array<{
   *    message?: string
   *    instancePath: string
   *  }>}
   */
  const errors = validate.errors ?? []
  return {
    isValid,
    errors: errors.map((e) => ({
      ...e,
      message: e.message ?? 'unexpected empty error message',
    })),
  }
}
