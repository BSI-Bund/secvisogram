import { Ajv } from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const hashSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    file_hashes: {
      elements: { additionalProperties: true, properties: {} },
    },
  },
})

const fullProductNameSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product_identification_helper: {
      additionalProperties: true,
      optionalProperties: {
        hashes: { elements: hashSchema },
      },
    },
  },
})

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    branches: {
      elements: {
        additionalProperties: true,
        properties: {},
      },
    },
    product: fullProductNameSchema,
  },
})

const productPathSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    full_product_name: fullProductNameSchema,
  },
})

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        branches: {
          elements: branchSchema,
        },
        full_product_names: {
          elements: fullProductNameSchema,
        },
        product_paths: {
          elements: productPathSchema,
        },
      },
    },
  },
})

const validateInput = ajv.compile(inputSchema)
const validateFullProductName = ajv.compile(fullProductNameSchema)
const validateBranch = ajv.compile(branchSchema)
const validateProductPath = ajv.compile(productPathSchema)

/**
 * @param {any} doc
 * @param {(params: { path: string; hash: {} }) => void} onHashFound
 */
export function walkHashes(doc, onHashFound) {
  if (!validateInput(doc)) {
    return
  }

  doc.product_tree?.full_product_names?.forEach(
    (fullProductName, fullProductNameIndex) => {
      if (!validateFullProductName(fullProductName)) {
        return
      }

      fullProductName.product_identification_helper?.hashes?.forEach(
        (hash, hashIndex) => {
          onHashFound({
            path: `/product_tree/full_product_names/${fullProductNameIndex}/product_identification_helper/hashes/${hashIndex}/file_hashes`,
            hash,
          })
        }
      )
    }
  )

  /**
   * @param {string} prefix
   * @param {unknown[]} branches
   */
  const checkBranches = (prefix, branches) => {
    branches.forEach((branch, branchIndex) => {
      if (!validateBranch(branch)) {
        return
      }

      branch.product?.product_identification_helper?.hashes?.forEach(
        (hash, hashIndex) => {
          onHashFound({
            path: `${prefix}${branchIndex}/product/product_identification_helper/hashes/${hashIndex}/file_hashes`,
            hash,
          })
        }
      )
      checkBranches(
        `${prefix}${branchIndex}/branches/`,
        Array.isArray(branch.branches) ? branch.branches : []
      )
    })
  }

  checkBranches('/product_tree/branches/', doc.product_tree?.branches ?? [])

  doc.product_tree?.product_paths?.forEach((productPath, productPathIndex) => {
    if (!validateProductPath(productPath)) {
      return
    }

    productPath.full_product_name?.product_identification_helper?.hashes?.forEach(
      (hash, hashIndex) => {
        onHashFound({
          path: `/product_tree/product_paths/${productPathIndex}/full_product_name/product_identification_helper/hashes/${hashIndex}/file_hashes`,
          hash,
        })
      }
    )
  })
}
