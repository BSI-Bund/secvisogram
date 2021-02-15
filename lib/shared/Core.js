import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import csaf_2_0 from './Core/csaf_2.0.json'
import csaf_2_0_strict from './Core/csaf_2.0_strict.json'
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
  const schemaValidatorLenient = ajv.compile(csaf_2_0)
  const schemaValidatorStrict = ajv.compile(csaf_2_0_strict)

  return {
    document: {
      /**
       * @param {{
       *  document: {}
       *  strict?: boolean
       * }} params
       */
      async validate({ document, strict = true }) {
        const schemaValidator = strict
          ? schemaValidatorStrict
          : schemaValidatorLenient
        const documentEntity = new DocumentEntity({ schemaValidator })
        return documentEntity.validate({ document })
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
       *  document: {}
       *  strict?: boolean
       * }} params
       */
      async strip({ document, strict = true }) {
        const schemaValidator = strict
          ? schemaValidatorStrict
          : schemaValidatorLenient
        const documentEntity = new DocumentEntity({ schemaValidator })
        return documentEntity.strip({ document })
      },
    },
  }
}
