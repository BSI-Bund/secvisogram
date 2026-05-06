import assert from 'node:assert'
import { mandatoryTest_6_1_58 } from '../../csaf_2_1/mandatoryTests.js'

describe('mandatoryTest_6_1_58', function () {
  it('only runs on relevant documents', function () {
    assert.equal(
      mandatoryTest_6_1_58({ vulnerabilities: 'mydoc' }).errors.length,
      0
    )
  })

  it('passes when product_tree has no branches', function () {
    assert.equal(
      mandatoryTest_6_1_58({
        product_tree: {
          full_product_names: [
            {
              name: 'Example Company Controller A 1.0',
              product_id: 'CSAFPID-908070601',
            },
          ],
        },
      }).errors.length,
      0
    )
  })

  it('skips recursion when a child branch has invalid branches property', function () {
    const result = mandatoryTest_6_1_58({
      product_tree: {
        branches: [
          {
            category: 'product_version',
            name: '1.0',
            branches: [
              {
                category: 'product_version_range',
                name: 'vers:intdot/<1.1',
                branches: 'not-an-array',
              },
            ],
          },
        ],
      },
    })
    assert.equal(result.errors.length, 0)
    assert.equal(result.isValid, true)
  })

  it('reports all leaves under a conflicting branch', function () {
    const result = mandatoryTest_6_1_58({
      product_tree: {
        branches: [
          {
            category: 'product_version',
            name: '1.0',
            branches: [
              {
                category: 'product_version_range',
                name: 'vers:intdot/<1.1',
                branches: [
                  {
                    category: 'architecture',
                    name: 'x86',
                    product: {
                      name: 'Product x86',
                      product_id: 'CSAFPID-2',
                    },
                  },
                  {
                    category: 'architecture',
                    name: 'arm',
                    product: {
                      name: 'Product arm',
                      product_id: 'CSAFPID-3',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    })
    assert.equal(result.isValid, false)
    assert.equal(result.errors.length, 2)
    const paths = result.errors.map((e) => e.instancePath)
    assert.ok(
      paths.includes('/product_tree/branches/0/branches/0/branches/0/product')
    )
    assert.ok(
      paths.includes('/product_tree/branches/0/branches/0/branches/1/product')
    )
  })
})
