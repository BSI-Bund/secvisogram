import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match it normally means that the input
  document does not validate against the csaf json schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      properties: {
        distribution: {
          additionalProperties: true,
          properties: {
            tlp: {
              additionalProperties: true,
              properties: {
                label: { type: 'string' },
              },
            },
          },
          optionalProperties: {
            sharing_group: {
              additionalProperties: true,
              properties: {},
            },
          },
        },
      },
    },
  },
})
const validateInput = ajv.compile(inputSchema)

/**
 * This implements the optional test 6.2.30 of the CSAF 2.1 standard.
 * @param {any} doc
 */
export function recommendedTest_6_2_30(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  // Check for sharing_group usage when TLP is CLEAR
  if (
    doc.document.distribution.tlp.label === 'CLEAR' &&
    doc.document.distribution.sharing_group
  ) {
    ctx.warnings.push({
      instancePath: '/document/distribution/sharing_group',
      message: 'TLP:CLEAR documents should not use a "sharing_group"',
    })
  }

  return ctx
}
