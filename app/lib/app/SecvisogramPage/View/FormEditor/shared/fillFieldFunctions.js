const PRODUCT_PREFIX = 'CSAFPID-'
const GROUP_PREFIX = 'CSAFGID-'

const uniqueProductId = (function () {
  let num = 0
  return function (/** @type {boolean} */ reset) {
    if (reset) num = 0
    else num += 1
    return PRODUCT_PREFIX + num.toString().padStart(4, '0')
  }
})()

const uniqueGroupId = (function () {
  let num = 0
  return function (/** @type {boolean} */ reset) {
    if (reset) num = 0
    else num += 1
    return GROUP_PREFIX + num.toString().padStart(4, '0')
  }
})()

/**
 * function to generate a name for a branch item based on the parent branch items
 *
 * @param {Record<string, any>} doc
 * @param {string[]} instancePath
 * @return {string}
 */
const getBranchName = function (doc, instancePath) {
  /** @type {string[]} */
  let acc = []

  instancePath.slice().reduce((value, pathSegment) => {
    if (value) {
      if ('name' in value) {
        acc.push(value['name'])
      }
      return value[pathSegment]
    }
  }, doc)

  return acc.join(' ')
}

/**
 * function to generate a name for a relationship based on the products it is composed of and the category
 *
 * @param {Record<string, any>} doc
 * @param {string[]} instancePath
 * @param {() => Promise<void | { id: string; name: string; }[]>} collectProductIds
 * @return {Promise<string | undefined>}
 */
const getRelationshipName = async function (
  doc,
  instancePath,
  collectProductIds
) {
  const relationship = instancePath.slice(0, 3).reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, doc)
  if (relationship) {
    const productReference = relationship['product_reference']
    const category = relationship['category']
    const relatesToProductReference =
      relationship['relates_to_product_reference']
    if (productReference && category && relatesToProductReference) {
      return collectProductIds().then((entries) => {
        if (entries) {
          const productReferenceName =
            entries.find((e) => e.id === productReference)?.name ?? ''
          const relatesToProductReferenceName =
            entries.find((e) => e.id === relatesToProductReference)?.name ?? ''

          return `${productReferenceName} ${category.replaceAll(
            '_',
            ' '
          )} ${relatesToProductReferenceName}`
        }
      })
    } else {
      throw Error(
        'Could not find values in relationship to generate name from.'
      )
    }
  }
  throw Error('Could not find relationship to generate name from.')
}

export { uniqueProductId, uniqueGroupId, getBranchName, getRelationshipName }
