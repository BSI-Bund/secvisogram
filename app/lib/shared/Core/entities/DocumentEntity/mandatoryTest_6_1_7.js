/**
 *
 * @param {unknown} doc
 */
export default function mandatoryTest_6_1_7(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  // 6.1.7 Multiple Scores with same Version per Product
  if (preconditionFor_6_1_7_Matches(doc)) {
    /** @type {Map<string, Set<string>>} */
    const cvssVersionsByProductName = new Map()

    doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      vulnerability.scores?.forEach((score, scoreIndex) => {
        score.products?.forEach((product, productIndex) => {
          const versionMap = cvssVersionsByProductName.get(product) ?? new Set()
          cvssVersionsByProductName.set(product, versionMap)

          if (
            (score.cvss_v2?.version !== undefined &&
              versionMap.has(score.cvss_v2.version)) ||
            (score.cvss_v3?.version !== undefined &&
              versionMap.has(score.cvss_v3.version))
          ) {
            isValid = false
            errors.push({
              message: `product is already included in these cvss-versions: ${Array.from(
                versionMap.keys()
              ).join(', ')}`,
              instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/products/${productIndex}`,
            })
          }
          if (score.cvss_v2?.version !== undefined) {
            versionMap.add(score.cvss_v2.version)
          }
          if (score.cvss_v3?.version !== undefined) {
            versionMap.add(score.cvss_v3.version)
          }
        })
      })
    })
  }

  return { errors, isValid }
}

/**
 * @param {unknown} rawDoc
 * @returns {rawDoc is {
 *    vulnerabilities: Array<{
 *      scores?: Array<{
 *        products?: string[]
 *        cvss_v3?: { version?: string }
 *        cvss_v2?: { version?: string }
 *      }>
 *    }>
 *  }}
 */
const preconditionFor_6_1_7_Matches = (rawDoc) => {
  if (typeof rawDoc !== 'object' || !rawDoc) return false
  /** @type {{ vulnerabilities?: unknown }} */
  const doc = rawDoc
  return (
    Array.isArray(doc.vulnerabilities) &&
    doc.vulnerabilities.every(
      (vulnerability) =>
        (Array.isArray(vulnerability.scores) &&
          vulnerability.scores.every(
            (
              /** @type {{ products?: unknown; cvss_v2?: unknown; cvss_v3?: unknown }} */ score
            ) =>
              Array.isArray(score.products) &&
              score.products.every((product) => typeof product === 'string') &&
              ((score.cvss_v2 &&
                (typeof score.cvss_v2 === 'string' ||
                  score.cvss_v2 === undefined)) ||
                score.cvss_v2 === undefined) &&
              ((score.cvss_v3 &&
                (typeof score.cvss_v3 === 'string' ||
                  score.cvss_v3 === undefined)) ||
                score.cvss_v2 === undefined)
          )) ||
        vulnerability.scores === undefined
    )
  )
}
