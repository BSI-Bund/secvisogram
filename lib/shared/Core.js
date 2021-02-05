import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import csaf_2_0 from './Core/csaf_2.0.json'
import cvss_v2_0 from './Core/cvss-v2.0.json'
import cvss_v3_0 from './Core/cvss-v3.0.json'
import cvss_v3_1 from './Core/cvss-v3.1.json'
import doc_max from './Core/doc-max.json'
import doc_min from './Core/doc-min.json'
import DocumentEntity from './Core/DocumentEntity'

export default async function createCore() {
  const ajv = new Ajv({ strict: false, allErrors: true })
  addFormats(ajv)
  ajv.addSchema(cvss_v2_0, 'https://www.first.org/cvss/cvss-v2.0.json')
  ajv.addSchema(cvss_v3_0, 'https://www.first.org/cvss/cvss-v3.0.json')
  ajv.addSchema(cvss_v3_1, 'https://www.first.org/cvss/cvss-v3.1.json')
  const schemaValidator = ajv.compile(csaf_2_0)

  return {
    document: {
      /**
       * @param {{
          document: {}
        }} params
       */
      async validate({ document }) {
        const isValid = schemaValidator(document)
        const errors = schemaValidator.errors
        console.log(
          'Validationresults',
          errors?.map((e) => [e.dataPath, e.message])
        )
        return {
          isValid,
          errors: errors ?? [],
        }
      },

      async newDocMin() {
        return {
          ...doc_min,
        }
      },

      async newDocMax() {
        return {
          ...doc_max,
        }
      },

      /**
       * @param {{
       *   document: {}
       * }} params
       */
      async strip({ document }) {
        const documentEntity = new DocumentEntity({ schemaValidator })
        return documentEntity.strip({ document })
      },
    },
  }
}
