import { parse } from 'json-pointer'
import unset from 'lodash/fp/unset'
import isEmpty from 'lodash/isEmpty'
import icann from './DocumentEntity/subtags.json'

export default class DocumentEntity {
  /**
   * @param {{ schemaValidator: import('ajv').ValidateFunction<unknown>}} params
   */
  constructor({ schemaValidator }) {
    /** @private */
    this.schemaValidator = schemaValidator
  }

  /**
   * @param {{ document: {} }} params
   */
  validate({ document }) {
    return this.validateDoc(document)
  }

  /**
   * @param {{ document: {} }} params
   */
  strip({ document }) {
    /** @type {Array<{ dataPath: string; message: string; error: boolean }>} */
    const strippedPaths = []

    /**
     * @param {{}} doc
     * @param {string} dataPath
     * @returns {{}}
     */
    const deleteEmptyNodes = (doc, dataPath) => {
      if (typeof doc === 'string' || typeof doc === 'number') return doc
      if (Array.isArray(doc))
        return doc.map((item, i) => deleteEmptyNodes(item, `${dataPath}/${i}`))
      return {
        ...Object.fromEntries(
          Object.entries(doc)
            .filter(([key, value]) => {
              const valueIsEmpty =
                value === '' ||
                value === null ||
                (typeof value === 'object' && isEmpty(value))

              if (valueIsEmpty) {
                strippedPaths.push({
                  dataPath: `${dataPath}/${key}`,
                  message: 'value was empty',
                  error: false,
                })
              }
              return !valueIsEmpty
            })
            .map(([key, value]) => [
              key,
              deleteEmptyNodes(value, `${dataPath}/${key}`),
            ])
        ),
      }
    }

    const documentWithoutEmptyNodes = deleteEmptyNodes(document, '')
    let errorStrippedDocument = documentWithoutEmptyNodes
    do {
      const { errors } = this.validateDoc(errorStrippedDocument)
      errorStrippedDocument = JSON.parse(
        JSON.stringify(
          errors.reduce((updatedDoc, error) => {
            strippedPaths.push({
              dataPath: error.dataPath,
              error: true,
              message: /** @type {string} */ (error.message),
            })
            const parsedDataPath = parse(error.dataPath).join('.')
            if (parsedDataPath === '') return {}
            return unset(parsedDataPath, updatedDoc)
          }, errorStrippedDocument),
          (_, value) => {
            if (Array.isArray(value)) {
              return value.filter((e) => e !== undefined)
            }
            return value
          }
        )
      )
    } while (
      this.schemaValidator.errors &&
      this.schemaValidator.errors.length &&
      Object.keys(errorStrippedDocument).length > 0
    )
    return { document: errorStrippedDocument, strippedPaths }
  }

  /**
   * @param {unknown} doc
   * @private
   */
  validateDoc(doc) {
    let isValid = this.schemaValidator(doc)
    /**
     * @type {Array<{
     *    message?: string
     *    dataPath: string
     *  }>}
     */
    const errors = this.schemaValidator.errors ?? []
    if (hasLangField(doc)) {
      if (!icann.subtags.find((s) => s.subtag === doc.document.lang)) {
        isValid = false
        errors.push({
          message: 'is not a valid language-tag',
          dataPath: '/document/lang',
        })
      }
    }
    if (hasSourceLangField(doc)) {
      if (!icann.subtags.find((s) => s.subtag === doc.document.source_lang)) {
        isValid = false
        errors.push({
          message: 'is not a valid language-tag',
          dataPath: '/document/source_lang',
        })
      }
    }
    return {
      isValid,
      errors: errors,
    }
  }
}

/**
 * @param {any} doc
 * @returns {doc is { document: { lang: string } }}
 */
const hasLangField = (doc) =>
  doc && doc.document && typeof doc.document.lang === 'string' ? true : false

/**
 * @param {any} doc
 * @returns {doc is { document: { source_lang: string } }}
 */
const hasSourceLangField = (doc) =>
  doc && doc.document && typeof doc.document.source_lang === 'string'
    ? true
    : false
