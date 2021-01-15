import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import csaf_2_0 from './Core/csaf_2.0.json'
import cvss_v2_0 from './Core/cvss-v2.0.json'
import cvss_v3_0 from './Core/cvss-v3.0.json'
import cvss_v3_1 from './Core/cvss-v3.1.json'

/**
 * @typedef {Object} Doc
 * @property {Array<{
    names: string[]
    organizations: string[]
    summary: string
    urls: string []
  }>} acknowledgments
 */

/**
 * @param {{}} params
 */
export default async function createCore({}) {
  const ajv = new Ajv({ strict: false })
  addFormats(ajv)
  ajv.addSchema(cvss_v2_0, 'https://www.first.org/cvss/cvss-v2.0.json')
  ajv.addSchema(cvss_v3_0, 'https://www.first.org/cvss/cvss-v3.0.json')
  ajv.addSchema(cvss_v3_1, 'https://www.first.org/cvss/cvss-v3.1.json')
  const schemaValidator = ajv.compile(csaf_2_0)

  return {
    document: {
      /**
       * This method loads the data for editing the document.
       *
       * @todo Replace dummy with actual implementation
       */
      async edit() {
        return {
          doc: {
            acknowledgments: [
              { names: [''], organizations: [''], summary: '', urls: [''] },
            ],
          },
        }
      },

      /**
       * @param {{}} doc
       */
      async save({}) {},

      /**
       * @param {{
          document: {}
        }} params
       */
      async validate({ document }) {
        const isValid = schemaValidator(document)
        const errors = schemaValidator.errors
        return {
          isValid,
          errors: errors ?? [],
        }
      },
    },
  }
}
