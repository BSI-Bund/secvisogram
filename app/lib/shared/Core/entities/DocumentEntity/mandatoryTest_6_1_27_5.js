/**
 * @param {any} doc
 */
export default function (doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const checkedDocumentCategories = new Set([
    'csaf_security_advisory',
    'csaf_vex',
  ])

  if (!checkedDocumentCategories.has(doc.document?.category))
    return { errors, isValid }

  /** @type {unknown} */
  const vulnerabilities = doc.vulnerabilities
  if (Array.isArray(vulnerabilities)) {
    vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      if (!vulnerability.notes) {
        isValid = false
        errors.push({
          instancePath: `/vulnerabilities/${vulnerabilityIndex}`,
          message: 'needs a `notes` attribute',
        })
      }
    })
  }

  return { errors, isValid }
}
