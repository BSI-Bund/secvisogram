import ajv from './shared/ajv.js'
import schema from './csaf_2_0_strict/schema.js'

const validate = ajv.compile(schema)

/**
 * @param {any} doc
 */
export default function csaf_2_0_strict(doc) {
  let isValid = validate(doc)
  /**
   *
   * @type {Array<{
   *    message?: string
   *    instancePath: string
   *  }>}
   */
  const errors = validate.errors ?? []
  return { isValid, errors }
}
