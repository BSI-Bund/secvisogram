/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_26(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (typeof doc.document?.category === 'string') {
    /** @type {string} */
    const category = doc.document.category
    const otherProfileValues = [
      'security_incident_response',
      'informational_advisory',
      'security_advisory',
      'vex',
    ]

    // Skip test if profile is not "Generic CSAF" but one of the other profiles
    if (otherProfileValues.includes(category)) return { errors, isValid }

    if (
      otherProfileValues.includes(
        category.replace(/[_-\s]+/g, '_').toLowerCase()
      )
    ) {
      isValid = false
      errors.push({
        instancePath: `/document/category`,
        message: `value prohibited`,
      })
    }
  }

  return { errors, isValid }
}
