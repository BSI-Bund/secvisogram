import { Ajv } from 'ajv/dist/jtd.js'
import {
  existsReferenceWithSummaryAndCategory,
  getTranslationInDocumentLang,
  isLangSpecifiedAndNotEnglish,
} from '../../lib/shared/languageSpecificTranslation.js'

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
        category: { type: 'string' },
      },
      optionalProperties: {
        lang: {
          type: 'string',
        },
        references: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              category: {
                type: 'string',
              },
              summary: {
                type: 'string',
              },
            },
          },
        },
      },
    },
  },
})

const validateSchema = ajv.compile(inputSchema)

/**
 * If the document language is specified but not English, it MUST be tested that at least one item in document
 * references exists that starts with the language-specific translation of the term Superseding Document as summary.
 * The category of this item MUST be external. If no language-specific translation has been recorded,
 * the test MUST be skipped and output an information to the user that no such translation is known.
 *
 * @param {unknown} doc
 */
export function recommendedTest_6_2_39_4(doc) {
  /*
      The `ctx` variable holds the state that is accumulated during the test run and is
      finally returned by the function.
     */
  /** @type { {warnings: Array<{ message: string; instancePath: string }>;
   * infos: Array<{ message: string; instancePath: string }>}} */
  const ctx = {
    warnings: [],
    infos: [],
  }

  const referenceCategory = 'external'
  const docCategoryCsafSuperseded = `csaf_superseded`

  if (
    !validateSchema(doc) ||
    doc.document.category !== docCategoryCsafSuperseded
  ) {
    return ctx
  }

  if (isLangSpecifiedAndNotEnglish(doc.document.lang)) {
    const supersedingInDocLang = getTranslationInDocumentLang(
      doc,
      'superseding_document'
    )
    if (!supersedingInDocLang) {
      ctx.infos.push({
        instancePath: '/document/references',
        message:
          'no language specific translation for "Superseding Document" has been recorded',
      })
      return ctx
    }

    const references = doc.document.references
    if (
      !references ||
      !existsReferenceWithSummaryAndCategory(
        references,
        supersedingInDocLang,
        referenceCategory
      )
    ) {
      ctx.warnings.push({
        instancePath: '/document/references',
        message:
          `for document category "${docCategoryCsafSuperseded}" at least one references must exist ` +
          `with reference category "${referenceCategory}" and whose summary begins with ${supersedingInDocLang}`,
      })
    }
  }

  return ctx
}
