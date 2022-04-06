import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        branches: { elements: { additionalProperties: true, properties: {} } },
        full_product_names: {
          elements: { additionalProperties: true, properties: {} },
        },
        relationships: {
          elements: { additionalProperties: true, properties: {} },
        },
      },
    },
  },
})

const fullProductNameSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    product_identification_helper: {
      additionalProperties: true,
      properties: {
        hashes: {
          elements: {
            additionalProperties: true,
            properties: {},
          },
        },
      },
    },
  },
})

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product: {
      additionalProperties: true,
      properties: {
        product_identification_helper: {
          additionalProperties: true,
          properties: {
            hashes: {
              elements: {
                additionalProperties: true,
                properties: {},
              },
            },
          },
        },
      },
    },
  },
})

const relationshipSchema = /** @type {const} */ ({
  additionalProperties: true,
  properties: {
    full_product_name: {
      additionalProperties: true,
      properties: {
        product_identification_helper: {
          additionalProperties: true,
          properties: {
            hashes: {
              elements: {
                additionalProperties: true,
                properties: {},
              },
            },
          },
        },
      },
    },
  },
})

const validateInput = ajv.compile(inputSchema)
const validateFullProductName = ajv.compile(fullProductNameSchema)
const validateRelationship = ajv.compile(relationshipSchema)
const validateBranch = ajv.compile(branchSchema)

/**
 * @param {any} doc
 * @param {(params: { path: string; hash: {} }) => void} onHashFound
 */
export default function walkHashes(doc, onHashFound) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  doc.product_tree.full_product_names?.forEach(
    (fullProductName, fullProductNameIndex) => {
      if (!validateFullProductName(fullProductName)) {
        return
      }

      fullProductName.product_identification_helper.hashes.forEach(
        (hash, hashIndex) => {
          onHashFound({
            path: `/product_tree/full_product_names/${fullProductNameIndex}/product_identification_helper/hashes/${hashIndex}`,
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

      branch.product?.product_identification_helper.hashes.forEach(
        (hash, hashIndex) => {
          onHashFound({
            path: `${prefix}${branchIndex}/product_identification_helper/hashes/${hashIndex}`,
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

  checkBranches('/product_tree/branches/', doc.product_tree.branches ?? [])

  doc.product_tree.relationships?.forEach((relationship, relationshipIndex) => {
    if (!validateRelationship(relationship)) {
      return
    }

    relationship.full_product_name.product_identification_helper.hashes.forEach(
      (hash, hashIndex) => {
        onHashFound({
          path: `/product_tree/relationships/${relationshipIndex}/product_identification_helper/hashes/${hashIndex}`,
          hash,
        })
      }
    )
  })

  return ctx
}
