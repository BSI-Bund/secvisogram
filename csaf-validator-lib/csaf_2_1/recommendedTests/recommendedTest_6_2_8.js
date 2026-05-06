import checkForUnsafeHashAlgorithms from './shared/checkForUnsafeHashAlgorithms.js'

/**
 * This implements the recommended test 6.2.8 of the CSAF 2.1 standard.
 * @param {unknown} doc
 */
export function recommendedTest_6_2_8(doc) {
  return checkForUnsafeHashAlgorithms(doc, 'md5')
}
