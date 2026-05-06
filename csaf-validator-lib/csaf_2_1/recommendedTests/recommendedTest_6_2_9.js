import checkForUnsafeHashAlgorithms from './shared/checkForUnsafeHashAlgorithms.js'

/**
 * This implements the recommended test 6.2.9 of the CSAF 2.1 standard.
 * @param {any} doc
 */
export function recommendedTest_6_2_9(doc) {
  return checkForUnsafeHashAlgorithms(doc, 'sha1')
}
