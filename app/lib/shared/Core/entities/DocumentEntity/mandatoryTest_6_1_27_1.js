/**
 * @typedef {object} Note
 * @property {unknown} category
 */

/**
 * @param {any} doc
 */
export default function (doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  const checkedDocumentCategories = new Set([
    'security_incident_response',
    'informational_advisory',
  ])

  if (!checkedDocumentCategories.has(doc.document?.category))
    return { errors, isValid }

  const mandatoryNoteCategories = new Set([
    'description',
    'details',
    'general',
    'summary',
  ])

  isValid =
    Array.isArray(doc.document?.notes) &&
    /** @type {Note[]} */ (doc.document.notes).some((n) =>
      mandatoryNoteCategories.has(/** @type {string} */ (n.category))
    )

  if (!isValid) {
    errors.push({
      instancePath: '/document/notes',
      message:
        'need at least one document note with a category of description, details, general or summary',
    })
  }
  return { errors, isValid }
}
