import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,

  properties: {
    document: {
      additionalProperties: true,
      properties: {
        tracking: {
          additionalProperties: true,
          properties: {
            current_release_date: { type: 'timestamp' },
            revision_history: {
              elements: {
                additionalProperties: true,
                properties: { date: { type: 'timestamp' } },
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
 * @param {any} doc
 */
export default function optionalTest_6_2_6(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const warnings = []
  const context = { warnings }

  if (!validate(doc)) {
    return context
  }

  const newestRevisionHistoryItem = doc.document.tracking.revision_history
    .slice()
    .sort((a, z) => new Date(z.date).getTime() - new Date(a.date).getTime())[0]
  if (
    newestRevisionHistoryItem &&
    new Date(doc.document.tracking.current_release_date).getTime() <
      new Date(newestRevisionHistoryItem.date).getTime()
  ) {
    warnings.push({
      message: 'older current release date than revision history',
      instancePath: `/document/tracking/current_release_date`,
    })
  }

  return context
}
