import assert from 'node:assert/strict'
import { recommendedTest_6_2_48 } from '../../csaf_2_1/recommendedTests/recommendedTest_6_2_48.js'

describe('recommendedTest_6_2_48', function () {
  it('only runs on relevant documents', function () {
    assert.equal(recommendedTest_6_2_48({}).warnings.length, 0)
  })

  it('does not warn when product_tree has no branches', function () {
    assert.equal(
      recommendedTest_6_2_48({ product_tree: {} }).warnings.length,
      0
    )
  })

  it('skips invalid child branches that do not pass schema validation', function () {
    const result = recommendedTest_6_2_48({
      product_tree: {
        branches: [
          {
            category: 'vendor',
            name: 'Open Source Company',
            branches: [42, null],
          },
        ],
      },
    })
    assert.equal(result.warnings.length, 0)
  })
})
