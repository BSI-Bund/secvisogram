import Ajv from 'ajv/dist/jtd.js'
import { compareZonedDateTimes } from '../dateHelper.js'

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
        tracking: {
          additionalProperties: true,
          properties: {
            revision_history: {
              elements: {
                additionalProperties: true,
                optionalProperties: {
                  date: { type: 'string' },
                },
              },
            },
            status: { type: 'string' },
          },
        },
      },
    },
    vulnerabilities: {
      elements: {
        additionalProperties: true,
        optionalProperties: {
          metrics: {
            elements: {
              additionalProperties: true,
              optionalProperties: {
                content: {
                  additionalProperties: true,
                  optionalProperties: {
                    epss: {
                      additionalProperties: true,
                      optionalProperties: {
                        timestamp: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * This implements the mandatory test 6.1.51 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_51(doc) {
  /*
    The `ctx` variable holds the state that is accumulated during the test ran and is
    finally returned by the function.
   */
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) return ctx

  const status = doc.document.tracking.status
  if (status !== 'final' && status !== 'interim') {
    return ctx
  }

  const newestRevisionHistoryItem = doc.document.tracking.revision_history
    .filter((item) => item.date != null)
    .sort((a, z) =>
      compareZonedDateTimes(
        /** @type {string} */ (z.date),
        /** @type {string} */ (a.date)
      )
    )[0]

  doc.vulnerabilities?.forEach((vulnerability, vulnerabilityIndex) => {
    const metrics = vulnerability.metrics || []
    metrics.forEach((metric, metricIdx) => {
      const epss = metric.content?.epss || {}
      if (
        epss.timestamp &&
        newestRevisionHistoryItem &&
        compareZonedDateTimes(
          /** @type {string} */ (newestRevisionHistoryItem.date),
          /** @type {string} */ epss.timestamp
        ) < 0
      ) {
        ctx.isValid = false
        ctx.errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIdx}/content/epss/timestamp`,
          message: `the status is ${status}, but the EPSS "timestamp" is newer than the newest revision history date`,
        })
      }
    })
  })

  return ctx
}
