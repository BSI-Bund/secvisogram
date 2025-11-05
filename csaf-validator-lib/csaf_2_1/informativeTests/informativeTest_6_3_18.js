import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

/**
 * @typedef {object} MetricContent
 * @property {string} [qualitative_severity_rating]
 */

/**
 * @typedef {object} Metric
 * @property {MetricContent} [content]
 * @property {Array<string>} [products]
 */

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
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
                    qualitative_severity_rating: {
                      type: 'string',
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

const validateInput = ajv.compile(inputSchema)

/**
 * For each item in metrics it MUST be tested that it does not use the qualitative severity rating.
 * @param {any} doc
 * @returns
 */
export function informativeTest_6_3_18(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  const vulnerabilities = doc.vulnerabilities

  vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
    /** @type {Array<Metric> | undefined} */
    const metrics = vulnerability.metrics
    metrics?.forEach((metric, metricIndex) => {
      if (metric?.content?.qualitative_severity_rating) {
        ctx.infos.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}/metrics/${metricIndex}/content/qualitative_severity_rating`,
          message: 'qualitative_severity_rating object is present',
        })
      }
    })
  })

  return ctx
}
