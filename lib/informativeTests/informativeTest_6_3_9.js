import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        branches: { elements: { additionalProperties: true, properties: {} } },
      },
    },
  },
})
const validateInput = ajv.compile(inputSchema)

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    category: { type: 'string' },
    branches: { elements: { additionalProperties: true, properties: {} } },
    product: {
      additionalProperties: true,
      optionalProperties: {
        product_id: { type: 'string' },
      },
    },
  },
})
const validateBranch = ajv.compile(branchSchema)

/**
 * @param {unknown} doc
 * @returns
 */
export default function informativeTest_6_3_9(doc) {
  const ctx = {
    infos: /** @type {Array<{ message: string; instancePath: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  /** @type {string[]} */
  let productPath = []

  /**
   * @param {string} prefix
   * @param {unknown[]} branches
   */
  const checkBranches = (prefix, branches) => {
    for (const [branchIndex, branch] of branches.entries()) {
      if (!validateBranch(branch)) {
        continue
      }

      if (typeof branch.category === 'string') {
        productPath.push(branch.category)
      }
      if (branch.branches) {
        checkBranches(`${prefix}${branchIndex}/branches/`, branch.branches)
      } else {
        if (typeof branch.product?.product_id === 'string') {
          const mandatoryCategoryIndexes = [
            'vendor',
            'product_name',
            'product_version',
          ].map((category) => ({
            category,
            index: productPath.indexOf(category),
          }))
          productPath = []

          for (const index of mandatoryCategoryIndexes) {
            if (index.index === -1) {
              ctx.infos.push({
                instancePath: `${prefix}${branchIndex}`,
                message: `missing ancestor with category ${index.category}`,
              })
              return
            }
          }
          const sortedIndexes = mandatoryCategoryIndexes
            .slice()
            .sort((a, z) => a.index - z.index)
          for (const [i, sortedIndex] of sortedIndexes.entries()) {
            if (sortedIndex.category !== mandatoryCategoryIndexes[i].category) {
              ctx.infos.push({
                instancePath: `${prefix}${branchIndex}`,
                message:
                  'order of ancestors with categories vendor, product_name, product_version is not correct',
              })
              return
            }
          }
        }
      }
    }
  }

  checkBranches('/product_tree/branches/', doc.product_tree?.branches ?? [])

  return ctx
}
