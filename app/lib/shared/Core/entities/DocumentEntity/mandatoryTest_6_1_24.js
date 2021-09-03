/**
 * @param {unknown} doc
 */
export default function mandatoryTest_6_1_24(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  // 6.1.24 Definition in Involvements
  if (preconditionFor_6_1_24_Matches(doc)) {
    /** @type {Map<string, Set<string>>} */
    const involvementMap = new Map()

    doc.vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      vulnerability.involvements.forEach((involvement, involvementIndex) => {
        if (
          typeof involvement.date === 'string' &&
          typeof involvement.party === 'string' &&
          typeof involvement.status === 'string'
        ) {
          const set = involvementMap.get(involvement.date) ?? new Set()
          if (set.has(`${involvement.party}:${involvement.status}`)) {
            isValid = false
            errors.push({
              message: `party, status tuple was already used for the same date`,
              instancePath: `/vulnerabilities/${vulnerabilityIndex}/involvements/${involvementIndex}`,
            })
          }
          set.add(`${involvement.party}:${involvement.status}`)
          involvementMap.set(involvement.date, set)
        }
      })
    })
  }

  return { errors, isValid }
}

/**
 * @param {unknown} rawDoc
 * @returns {rawDoc is {
 *    vulnerabilities: Array<{
 *      involvements: Array<{
 *        date?: string
 *        party?: string
 *        status?: string
 *      }>
 *    }>
 *  }}
 */
const preconditionFor_6_1_24_Matches = (rawDoc) => {
  if (typeof rawDoc !== 'object' || !rawDoc) return false
  /** @type {{ vulnerabilities?: unknown }} */
  const doc = rawDoc
  return (
    Array.isArray(doc.vulnerabilities) &&
    doc.vulnerabilities.every(
      (vulnerability) =>
        Array.isArray(vulnerability.involvements) &&
        vulnerability.involvements.every(
          (/** @type {any} */ involvement) =>
            (typeof involvement.date === 'string' ||
              involvement.date === undefined) &&
            (typeof involvement.party === 'string' ||
              involvement.party === undefined) &&
            (typeof involvement.status === 'string' ||
              involvement.status === undefined)
        )
    )
  )
}
