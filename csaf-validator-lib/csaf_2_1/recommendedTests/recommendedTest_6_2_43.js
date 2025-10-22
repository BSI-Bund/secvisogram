import Ajv from 'ajv/dist/jtd.js'
const ajv = new Ajv()

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match, it normally means that the input
  document does not validate against the csaf JSON schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      properties: {
        license_expression: {
          type: 'string',
        },
      },
    },
  },
})

const validateSchema = ajv.compile(inputSchema)

/**
 * It MUST be tested that the license expression is present and set
 *
 * @param {unknown} doc
 */
export function recommendedTest_6_2_43(doc) {
  /*
      The `ctx` variable holds the state that is accumulated during the test run and is
      finally returned by the function.
     */
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (!validateSchema(doc)) {
    ctx.warnings.push({
      message: 'License expression is not set',
      instancePath: '/document/license_expression',
    })
  }

  return ctx
}
