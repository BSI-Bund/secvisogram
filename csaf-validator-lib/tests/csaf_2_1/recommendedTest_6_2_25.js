import assert from 'node:assert'
import { recommendedTest_6_2_25 } from '../../csaf_2_1/recommendedTests.js'

describe('recommendedTest_6_2_25', function () {
  it('only runs on relevant documents', async function () {
    assert.equal(
      (await recommendedTest_6_2_25({ vulnerabilities: 'mydoc' })).warnings
        .length,
      0
    )
  })
  it('skips empty objects', async function () {
    assert.equal(
      (
        await recommendedTest_6_2_25({
          vulnerabilities: [
            {
              cwes: [
                {
                  id: 'CWE-20',
                  name: 'Improper Input Validation',
                  version: '4.13',
                },
              ],
            },
            {}, // should be ignored
          ],
        })
      ).warnings.length,
      1
    )
  })
})
