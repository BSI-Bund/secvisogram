import Ajv from 'ajv/dist/jtd.js'
import { cwecMap } from '../../lib/cwec.js'

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
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          cwes: {
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

const validateInput = ajv.compile(inputSchema)

const cweSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    id: { type: 'string' },
    version: { type: 'string' },
    name: { type: 'string' },
  },
})

const validateCWE = ajv.compile(cweSchema)

/**
 * This implements the recommended test 6.2.25 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export async function recommendedTest_6_2_25(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const warnings = []
  const context = { warnings }

  if (!validateInput(doc)) {
    return context
  }

  for (let i = 0; i < doc.vulnerabilities.length; ++i) {
    const vulnerability = doc.vulnerabilities[i]
    if (vulnerability.cwes) {
      for (let j = 0; j < vulnerability.cwes.length; ++j) {
        const cwe = vulnerability.cwes.at(j)
        if (validateCWE(cwe)) {
          const cwec = cwecMap.get(cwe.version)
          if (cwec) {
            const entry = (await cwec()).default.weaknesses.find(
              (w) => w.id === cwe.id
            )
            //NOTE: the usage property is not available in cwe version 4.11 and older
            if (
              entry?.usage !== 'Allowed' &&
              entry?.usage !== 'Allowed-with-Review'
            ) {
              context.warnings.push({
                instancePath: `/vulnerabilities/${i}/cwes/${j}/id`,
                message:
                  'the usage of the weakness with the given id is not allowed',
              })
            }
          }
        }
      }
    }
  }

  return context
}
