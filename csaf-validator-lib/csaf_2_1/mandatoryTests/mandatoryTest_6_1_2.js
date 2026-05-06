import { Ajv } from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    branches: {
      elements: {
        additionalProperties: true,
        properties: {},
      },
    },
    product: {
      additionalProperties: true,
      optionalProperties: {
        product_id: { type: 'string' },
      },
    },
  },
})

const validateBranch = ajv.compile(branchSchema)

const fullProductNameSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product_id: { type: 'string' },
  },
})

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match it normally means that the input
  document does not validate against the csaf json schema or optional fields that
  the test checks are not present.
 */
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
          elements: {
            additionalProperties: true,
            optionalProperties: {
              full_product_name: fullProductNameSchema,
            },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * @typedef {import('ajv/dist/core.js').JTDDataType<typeof branchSchema>} Branch
 * @typedef {import('ajv/dist/core.js').JTDDataType<typeof fullProductNameSchema>} FullProductName
 */

/**
 * This implements the mandatory test 6.1.2 of the CSAF 2.1 standard.
 *
 * @param {unknown} doc
 */
export function mandatoryTest_6_1_2(doc) {
  /*
    The `ctx` variable holds the state that is accumulated during the test ran and is
    finally returned by the function.
   */
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }

  /** @type {Map<string, string | null>} */
  const seenProductIds = new Map()

  doc.product_tree?.branches?.forEach((branch, index) => {
    checkBranch(`/product_tree/branches/${index}`, branch)
  })

  doc.product_tree?.full_product_names?.forEach((fullProductName, index) => {
    checkFullProductName(
      `/product_tree/full_product_names/${index}`,
      fullProductName
    )
  })

  doc.product_tree?.product_paths?.forEach((productPath, index) => {
    const fullProductName = productPath.full_product_name
    if (!fullProductName) return
    checkFullProductName(
      `/product_tree/product_paths/${index}/full_product_name`,
      fullProductName
    )
  })

  return ctx

  /**
   * Checks whether the given product_id was already defined and registers an error if so.
   *
   * @param {string} instancePath The instance path of the product_id to check.
   * @param {string} productId The product_id value to check.
   */
  function checkProductId(instancePath, productId) {
    if (seenProductIds.has(productId)) {
      ctx.isValid = false
      const firstInstancePath = seenProductIds.get(productId)
      if (firstInstancePath !== null) {
        ctx.errors.push({
          instancePath: /** @type {string} */ (firstInstancePath),
          message: 'duplicate definition product id',
        })
        seenProductIds.set(productId, null)
      }
      ctx.errors.push({
        instancePath,
        message: 'duplicate definition product id',
      })
    } else {
      seenProductIds.set(productId, instancePath)
    }
  }

  /**
   * Checks the product_id in the given "full product name".
   *
   * @param {string} prefix The instance path prefix of the "full product name".
   * @param {FullProductName} fullProductName The "full product name" object.
   */
  function checkFullProductName(prefix, fullProductName) {
    if (fullProductName.product_id) {
      checkProductId(`${prefix}/product_id`, fullProductName.product_id)
    }
  }

  /**
   * Checks the product_id in the given branch object and its branch children.
   *
   * @param {string} prefix The instance path prefix of the "branch".
   * @param {Branch} branch The "branch" object.
   */
  function checkBranch(prefix, branch) {
    if (branch.product?.product_id) {
      checkProductId(`${prefix}/product/product_id`, branch.product.product_id)
    }
    branch.branches?.forEach((child, index) => {
      if (!validateBranch(child)) return
      checkBranch(`${prefix}/branches/${index}`, child)
    })
  }
}
