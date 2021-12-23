/**
 * @param {any} doc
 */
export default function (doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const checkedDocumentCategories = new Set(['security_advisory', 'vex'])

  if (!checkedDocumentCategories.has(doc.document?.category))
    return { errors, isValid }

  isValid = Boolean(doc.product_tree)

  if (!isValid) {
    errors.push({
      instancePath: '/',
      message: 'needs a product_tree',
    })
  }
  return { errors, isValid }
}
