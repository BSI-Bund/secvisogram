import { Ajv } from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    category: { type: 'string' },
    name: { type: 'string' },
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
 * This implements the recommended test 6.2.48 of the CSAF 2.1 standard.
 *
 * @param {any} doc
 */
export function recommendedTest_6_2_48(doc) {
  const ctx = {
    warnings:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
  }

  if (!validateInput(doc)) {
    return ctx
  }

  const branches = doc.product_tree?.branches ?? []
  branches.forEach((branch, index) => {
    checkBranch(branch, `/product_tree/branches/${index}`, ctx.warnings)
  })

  return ctx
}

/**
 * Recursively checks a branch and its nested branches.
 *
 * @param {Branch} branch
 * @param {string} basePath
 * @param {Array<{ instancePath: string; message: string }>} warnings
 */
function checkBranch(branch, basePath, warnings) {
  if (!validateBranch(branch)) return
  if (branch.category === 'vendor') {
    if (
      branch.name !== undefined &&
      normalizeBranchName(branch.name) === 'opensource'
    ) {
      warnings.push({
        instancePath: `${basePath}/name`,
        message:
          'Branch with category "vendor" should not have the name "Open Source"',
      })
    }
  }

  if (Array.isArray(branch.branches)) {
    branch.branches.forEach(
      (/** @type {Branch} */ childBranch, /** @type {number} */ index) => {
        checkBranch(childBranch, `${basePath}/branches/${index}`, warnings)
      }
    )
  }
}

/**
 * Normalizes a string to be case and white space insensitive.
 *
 * @param {string} str
 * @returns {string}
 */
function normalizeBranchName(str) {
  return str.replaceAll(/\s+/g, '').toLowerCase()
}
