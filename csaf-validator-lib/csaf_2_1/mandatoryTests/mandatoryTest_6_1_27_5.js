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
        category: {
          type: 'string',
        },
      },
    },
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          notes: {
            elements: {
              additionalProperties: true,
              properties: {},
            },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)
/**
 * @param {any} doc
 */
export function mandatoryTest_6_1_27_5(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (!validate(doc)) return { errors, isValid }

  const checkedDocumentCategories = new Set([
    'csaf_security_advisory',
    'csaf_vex',
    'csaf_deprecated_security_advisory',
  ])

  if (!checkedDocumentCategories.has(doc.document?.category)) {
    return { errors, isValid }
  }

  const vulnerabilities = doc.vulnerabilities
  if (Array.isArray(vulnerabilities)) {
    vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      if (!vulnerability.notes || vulnerability.notes.length === 0) {
        isValid = false
        errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}`,
          message: 'needs a `notes` attribute',
        })
      }
    })
  }

  return { errors, isValid }
}
