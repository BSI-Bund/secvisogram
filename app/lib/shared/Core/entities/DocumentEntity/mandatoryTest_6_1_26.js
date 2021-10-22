/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_25(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (typeof doc.document?.category === 'string') {
    /** @type {string} */
    const category = doc.document.category
    if (category.replace(/[- ]+/g, '_').toLowerCase() !== 'generic_csaf') {
      isValid = false
      errors.push({
        instancePath: `/document/category`,
        message: `invalid category`,
      })
    }
  }

  return { errors, isValid }
}
