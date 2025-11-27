import assert from 'node:assert'
import { informativeTest_6_3_18 } from '../../csaf_2_1/informativeTests.js'

describe('informativeTest_6_3_18', function () {
  it('only runs on relevant documents', function () {
    assert.equal(informativeTest_6_3_18({ document: 'mydoc' }).infos.length, 0)
  })
})
