import Ajv from 'ajv/dist/jtd.js'
import { request } from 'undici'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    document: {
      additionalProperties: true,
      properties: {
        references: {
          elements: {
            additionalProperties: true,
            properties: {
              url: { type: 'string' },
            },
            optionalProperties: {
              category: { type: 'string' },
            },
          },
        },
      },
    },
  },
})

const validateInput = ajv.compile(inputSchema)

/**
 * @param {unknown} doc
 * @returns
 */
export default async function informativeTest_6_3_7(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  for (let i = 0; i < doc.document.references.length; ++i) {
    const reference = doc.document.references[i]
    if (reference.category !== 'self') continue
    const res = await request(reference.url, { method: 'HEAD' })
    if (res.statusCode !== 200) {
      ctx.infos.push({
        instancePath: `/document/references/${i}/url`,
        message: 'use of self referencing urls failing to resolve',
      })
    }
  }

  return ctx
}
