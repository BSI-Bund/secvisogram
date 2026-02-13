import assert from 'node:assert/strict'

import { mandatoryTest_6_1_44 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_44.js'

describe('mandatoryTest_6_1_44', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_44({ product_tree: 'mydoc' }).isValid, true)
  })
})
