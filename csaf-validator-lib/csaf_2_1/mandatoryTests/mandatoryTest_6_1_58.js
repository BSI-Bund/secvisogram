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
  properties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        branches: {
          elements: branchSchema,
        },
      },
    },
  },
})

const validateInput = ajv.compile(inputSchema)
const validateBranch = ajv.compile(branchSchema)

/**
 * @typedef {import('ajv/dist/core.js').JTDDataType<typeof branchSchema>} Branch
 */

/**
 * This implements the mandatory test 6.1.58 of the CSAF 2.1 standard.
 *
 * For each full_product_name_t element under /product_tree/branches, it MUST be
 * tested that only one of the branch categories product_version and
 * product_version_range is used along the path leading to the full_product_name_t
 * element.
 *
 * @param {any} doc
 */
export function mandatoryTest_6_1_58(doc) {
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validateInput(doc)) {
    return ctx
  }

  const branches = doc.product_tree?.branches ?? []
  branches.forEach((branch, index) => {
    checkBranch(
      branch,
      `/product_tree/branches/${index}`,
      false,
      false,
      ctx.errors
    )
  })

  if (ctx.errors.length > 0) {
    ctx.isValid = false
  }

  return ctx
}

/**
 * Checks that product_version and product_version_range are not both used along the same path
 *
 * @param {Branch} branch current branch
 * @param {string} basePath base instance path for error reporting
 * @param {boolean} hasProductVersion - whether product_version appeared in the path so far
 * @param {boolean} hasProductVersionRange - whether product_version_range appeared in the path so far
 * @param {Array<{ instancePath: string; message: string }>} errors
 */
function checkBranch(
  branch,
  basePath,
  hasProductVersion,
  hasProductVersionRange,
  errors
) {
  const category = branch.category

  const nowHasProductVersion =
    hasProductVersion || category === 'product_version'
  const nowHasProductVersionRange =
    hasProductVersionRange || category === 'product_version_range'

  if (nowHasProductVersion && nowHasProductVersionRange) {
    reportLeaves(branch, basePath, errors)
    return
  }

  // Recursively check nested branches
  if (Array.isArray(branch.branches)) {
    branch.branches.forEach(
      (/** @type {any} */ childBranch, /** @type {number} */ index) => {
        if (!validateBranch(childBranch)) return
        checkBranch(
          childBranch,
          `${basePath}/branches/${index}`,
          nowHasProductVersion,
          nowHasProductVersionRange,
          errors
        )
      }
    )
  }
}

/**
 * Recursively reports all `product` leaves reachable from a branch that lies on a conflicting path.
 *
 * @param {any} branch
 * @param {string} basePath
 * @param {Array<{ instancePath: string; message: string }>} errors
 */
function reportLeaves(branch, basePath, errors) {
  if (branch.product !== undefined) {
    errors.push({
      instancePath: `${basePath}/product`,
      message:
        'both categories "product_version" and "product_version_range" are used along the same path.',
    })
  }

  if (Array.isArray(branch.branches)) {
    branch.branches.forEach(
      (/** @type {any} */ child, /** @type {number} */ index) => {
        reportLeaves(child, `${basePath}/branches/${index}`, errors)
      }
    )
  }
}
