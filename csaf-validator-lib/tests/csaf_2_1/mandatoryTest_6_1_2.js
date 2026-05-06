import assert from 'node:assert'
import { mandatoryTest_6_1_2 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_2.js'

describe('mandatory test 6.1.2', function () {
  describe('valid examples', function () {
    it('only runs on relevant documents', function () {
      assert.equal(mandatoryTest_6_1_2({ product_tree: 'mydoc' }).isValid, true)
    })
  })
  it('skips invalid full product names', function () {
    assert.equal(
      mandatoryTest_6_1_2({
        product_tree: {
          full_product_names: [
            {
              product_id: { invalid: true },
            },
          ],
        },
      }).isValid,
      true
    )
  })

  it('validates branches and skips invalid ones', function () {
    assert.equal(
      mandatoryTest_6_1_2({
        product_tree: {
          branches: [
            {
              product: {
                product_id: 'CSAFPID-9080700',
              },
              branches: [
                {
                  product: 'CSAFPID-9080701',
                },
                {
                  branches: [{}],
                },
              ],
            },
          ],
        },
      }).isValid,
      true
    )
  })

  it('validates product_paths and skips invalid ones', function () {
    assert.equal(
      mandatoryTest_6_1_2({
        product_tree: {
          product_paths: [
            {
              full_product_name: {},
            },
            {},
          ],
        },
      }).isValid,
      true
    )
  })
})
