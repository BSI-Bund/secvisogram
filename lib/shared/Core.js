import Ajv from 'ajv'
import addFormats from 'ajv-formats'
import csaf_2_0 from './Core/csaf_2.0.json'
import cvss_v2_0 from './Core/cvss-v2.0.json'
import cvss_v3_0 from './Core/cvss-v3.0.json'
import cvss_v3_1 from './Core/cvss-v3.1.json'
import DocumentEntity from './Core/DocumentEntity'

const FORM_DOC = {
  document: {
    csaf_version: '2.0',
    title: '',
    publisher: {
      type: '',
    },
    type: '',
    tracking: {
      current_release_date: '',
      id: '',
      initial_release_date: '',
      revision_history: [
        {
          number: '',
          date: '',
          summary: '',
        },
      ],
      status: '',
      version: '',
    },
  },
}

const SOURCE_DOC = {
  document: {
    csaf_version: '2.0',
    title: '',
    publisher: {
      type: '',
    },
    type: '',
    tracking: {
      current_release_date: '',
      id: '',
      initial_release_date: '',
      revision_history: [
        {
          number: '',
          date: '',
          summary: '',
        },
      ],
      status: '',
      version: '',
    },
    acknowledgments: [
      {
        names: [''],
        organizations: [''],
        urls: [''],
        summary: '',
      },
    ],
    notes: [
      {
        title: '',
        type: '',
        text: '',
      },
    ],
  },
  vulnerabilities: [
    {
      notes: [
        {
          title: '',
          text: '',
          type: '',
        },
      ],
    },
  ],
  product_tree: {},
}

/**
 * @typedef {Object} Doc
 * @property {{
 *  csaf_version: string
 *  title: string
 *  publisher: {
 *    type: string,
 *  }
 *  type: string
 *  tracking: {
 *    current_release_date: string,
 *    id: string,
 *    initial_release_date: string,
 *    revision_history: Array<{
 *      number: string
 *      date: string
 *      summary: string
 *    }>,
 *    status: string,
 *    version: string
 *  }
 *  acknowledgments: Array<{
 *    names: string[],
 *    organizations: string[]
 *    summary: string
 *    urls: string[]
 *  }>
 *  aggregate_severity: {
 *    namespace: string
 *    text: string
 *  }
 *  notes: Array<{
 *  }>
 * }} document
 * @property {{
 * }} [product_tree]
 * @property {Array<{
 *   notes: Array<{
 *     type: string
 *     text: string
 *   }>
 * }>} [vulnerabilities]
 */

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

      async newFormDoc() {
        return {
          ...FORM_DOC,
        }
      },

      async newSourceDoc() {
        return {
          ...SOURCE_DOC,
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
