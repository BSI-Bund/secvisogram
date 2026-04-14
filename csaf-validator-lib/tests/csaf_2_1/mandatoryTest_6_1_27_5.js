import assert from 'node:assert/strict'
import { mandatoryTest_6_1_27_5 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_27_5.js'

describe('mandatoryTest_6_1_27_5', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_27_5({ document: 'mydoc' }).isValid, true)
  })

  it('returns valid for documents with irrelevant category', function () {
    assert.equal(
      mandatoryTest_6_1_27_5({
        document: { category: 'csaf_base' },
        vulnerabilities: [{}],
      }).isValid,
      true
    )
  })

  it('returns invalid when vulnerability has no notes', function () {
    const result = mandatoryTest_6_1_27_5({
      document: { category: 'csaf_security_advisory' },
      vulnerabilities: [{}],
    })
    assert.equal(result.isValid, false)
    assert.equal(result.errors.length, 1)
  })

  it('returns invalid when vulnerability has empty notes array', function () {
    const result = mandatoryTest_6_1_27_5({
      document: { category: 'csaf_security_advisory' },
      vulnerabilities: [{ notes: [] }],
    })
    assert.equal(result.isValid, false)
    assert.equal(result.errors.length, 1)
  })
})
