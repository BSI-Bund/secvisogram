import pkgURL from 'packageurl-js'

const { PackageURL } = pkgURL

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_13(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (Array.isArray(doc.product_tree?.full_product_names)) {
    doc.product_tree?.full_product_names.forEach(
      (
        /** @type {any} */ fullProductName,
        /** @type {number} */ fullProductNameIndex
      ) => {
        checkProductIdentificationHelperPURL(fullProductName, () => {
          isValid = false
          errors.push({
            instancePath: `/product_tree/full_product_names/${fullProductNameIndex}/product_identification_helper/purl`,
            message: `invalid purl`,
          })
        })
      }
    )
  }

  if (Array.isArray(doc.product_tree?.relationships)) {
    doc.product_tree.relationships.forEach(
      (
        /** @type {any} */ relationship,
        /** @type {number} */ relationshipIndex
      ) => {
        checkProductIdentificationHelperPURL(
          relationship.full_product_name,
          () => {
            isValid = false
            errors.push({
              instancePath: `/product_tree/relationships/${relationshipIndex}/full_product_name/product_identification_helper/purl`,
              message: `invalid purl`,
            })
          }
        )
      }
    )
  }

  if (doc.product_tree) {
    checkBranchesForInvalidPURLs(doc.product_tree, ({ branchIndexes }) => {
      isValid = false
      const branchPathPart = branchIndexes.reduce(
        (str, index) => `${str}/branches/${index}`,
        '/product_tree'
      )
      errors.push({
        instancePath: `${branchPathPart}/product/product_identification_helper/purl`,
        message: `invalid purl`,
      })
    })
  }

  return { errors, isValid }
}

/**
 *
 * @param {any} parent
 * @param {(error: { branchIndexes: number[] }) => void} onError
 * @param {number[]} [branchIndexes]
 */
const checkBranchesForInvalidPURLs = (parent, onError, branchIndexes = []) => {
  if (Array.isArray(parent.branches)) {
    parent.branches.forEach(
      (/** @type {any} */ branch, /** @type {number} */ branchIndex) => {
        const currentBranchIndexes = branchIndexes.concat([branchIndex])

        checkProductIdentificationHelperPURL(branch.product, () => {
          onError({
            branchIndexes: currentBranchIndexes,
          })
        })
        checkBranchesForInvalidPURLs(branch, onError, currentBranchIndexes)
      }
    )
  }
}

/**
 * @param {any} productALike
 * @param {() => void} onError
 * @returns
 */
const checkProductIdentificationHelperPURL = (productALike, onError) => {
  if (typeof productALike?.product_identification_helper?.purl !== 'string')
    return
  try {
    PackageURL.fromString(productALike?.product_identification_helper?.purl)
  } catch (e) {
    onError()
  }
}
