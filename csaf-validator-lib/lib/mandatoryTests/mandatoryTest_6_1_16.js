import * as docUtils from './shared/docUtils.js'

const {
  hasTrackingRevisionHistory,
  hasTrackingVersionField,
  hasTrackingStatusField,
} = docUtils

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_16(doc) {
  let isValid = true
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []

  if (
    hasTrackingRevisionHistory(doc) &&
    hasTrackingVersionField(doc) &&
    hasTrackingStatusField(doc) &&
    doc.document.tracking.revision_history.length > 0
  ) {
    const version =
      doc.document.tracking.status == 'draft'
        ? doc.document.tracking.version.split(/[+-]/)[0]
        : doc.document.tracking.version.split('+')[0]
    if (
      doc.document.tracking.revision_history
        .slice()
        .sort(
          (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
        )[0]
        .number.split('+')[0] !== version
    ) {
      isValid = false
      errors.push({
        message: 'version does not match latest revision',
        instancePath: '/document/tracking/version',
      })
    }
  }

  return { errors, isValid }
}
