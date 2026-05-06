import assert from 'node:assert/strict'

import { mandatoryTest_6_1_44 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_44.js'

describe('mandatoryTest_6_1_44', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_44({ product_tree: 'mydoc' }).isValid, true)
  })

  it('validates branches and skips invalid ones', function () {
    assert.equal(
      mandatoryTest_6_1_44({
        product_tree: {
          branches: [
            {
              product: {
                product_identification_helper: {
                  serial_numbers: ['*P\\*\\*?\\*'],
                },
              },
              branches: [
                {
                  product: 'invalid',
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
      mandatoryTest_6_1_44({
        product_tree: {
          product_paths: [
            {
              full_product_name: {
                serial_numbers: ['*P\\*\\*?\\*'],
              },
            },
            {},
          ],
        },
      }).isValid,
      true
    )
  })

  it('detects invalid serial numbers in branches', function () {
    assert.equal(
      mandatoryTest_6_1_44({
        product_tree: {
          branches: [
            {
              product: {
                product_identification_helper: {
                  serial_numbers: ['P*A*'],
                },
              },
            },
          ],
        },
      }).isValid,
      false
    )
  })

  it('detects invalid serial numbers in product_paths', function () {
    assert.equal(
      mandatoryTest_6_1_44({
        product_tree: {
          product_paths: [
            {
              full_product_name: {
                product_identification_helper: {
                  serial_numbers: ['P*A*'],
                },
              },
            },
          ],
        },
      }).isValid,
      false
    )
  })
})
