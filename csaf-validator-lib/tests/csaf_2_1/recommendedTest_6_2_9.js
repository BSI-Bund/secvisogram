import assert from 'node:assert'
import { recommendedTest_6_2_9 } from '../../csaf_2_1/recommendedTests.js'

/** Helper: build a hash entry with the given algorithms */
function makeHash(/** @type {string[]} */ algorithms) {
  return {
    file_hashes: algorithms.map((alg) => ({ algorithm: alg, value: 'aabbcc' })),
    filename: 'product.so',
  }
}

describe('recommendedTest_6_2_9', function () {
  it('only runs on relevant documents', function () {
    assert.equal(
      recommendedTest_6_2_9({ vulnerabilities: 'mydoc' }).warnings.length,
      0
    )
  })

  it('warns when sha1 is the only algorithm in branches', function () {
    const doc = {
      product_tree: {
        branches: [
          {
            category: 'vendor',
            name: 'Vendor A',
            branches: [
              {
                category: 'product_name',
                name: 'Product A',
                product: {
                  product_id: 'CSAFPID-0001',
                  name: 'Vendor A Product A',
                  product_identification_helper: {
                    hashes: [makeHash(['sha1', 'sha256'])],
                  },
                },
              },
              {
                category: 'product_name',
                name: 'Product B',
                product: {
                  product_id: 'CSAFPID-0002',
                  name: 'Vendor A Product B',
                  product_identification_helper: {
                    hashes: [makeHash(['sha1'])],
                  },
                },
              },
            ],
          },
        ],
      },
    }
    const result = recommendedTest_6_2_9(doc)
    assert.equal(result.warnings.length, 1)
    assert.equal(
      result.warnings[0].instancePath,
      '/product_tree/branches/0/branches/1/product/product_identification_helper/hashes/0/file_hashes'
    )
  })

  it('warns when sha1 is the only algorithm in product_paths', function () {
    const doc = {
      product_tree: {
        product_paths: [
          {
            full_product_name: {
              name: 'Product A',
              product_id: 'CSAFPID-0001',
              product_identification_helper: {
                hashes: [makeHash(['sha1', 'sha256'])],
              },
            },
          },
          {
            full_product_name: {
              name: 'Product B',
              product_id: 'CSAFPID-0002',
              product_identification_helper: {
                hashes: [makeHash(['sha1'])],
              },
            },
          },
        ],
      },
    }
    const result = recommendedTest_6_2_9(doc)
    assert.equal(result.warnings.length, 1)
    assert.equal(
      result.warnings[0].instancePath,
      '/product_tree/product_paths/1/full_product_name/product_identification_helper/hashes/0/file_hashes'
    )
  })
})
