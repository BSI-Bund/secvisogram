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

export { uniqueProductId, uniqueGroupId }
