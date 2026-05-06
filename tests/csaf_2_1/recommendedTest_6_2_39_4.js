import { recommendedTest_6_2_39_4 } from '../../csaf_2_1/recommendedTests/recommendedTest_6_2_39_4.js'
import { expect } from 'chai'
import assert from 'node:assert'
import { getTranslationInDocumentLang } from '../../lib/shared/languageSpecificTranslation.js'

describe('recommendedTest_6_2_39_4', function () {
  it('only runs on relevant documents', function () {
    assert.equal(recommendedTest_6_2_39_4({}).warnings.length, 0)
  })

  it('only runs on valid category', function () {
    const result = recommendedTest_6_2_39_4({
      document: { category: '123', license_expression: 'MIT' },
    })

    assert.equal(result.warnings.length, 0)
    assert.equal(result.infos.length, 0)
  })

  it('only runs on valid language', function () {
    const result = recommendedTest_6_2_39_4({
      document: {
        category: 'csaf_superseded',
        lang: '123',
        license_expression: 'MIT',
      },
    })
    assert.equal(result.warnings.length, 0)
    assert.equal(result.infos.length, 1)
  })

  it('check get superseding_document in document lang', function () {
    expect(
      getTranslationInDocumentLang(
        { document: { lang: 'de' } },
        'superseding_document'
      )
    ).to.eq('Ersetzendes Dokument')
    expect(
      getTranslationInDocumentLang({ document: { lang: 'es' } }, 'v')
    ).to.eq(undefined)
    expect(
      getTranslationInDocumentLang({ document: {} }, 'superseding_document')
    ).to.eq(undefined)
  })
})
