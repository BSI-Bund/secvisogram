/**
 * @param {object} params
 * @param {string[]} params.relevanceLevels
 * @param {import('../../shared/types').DocumentCategory | undefined} params.category
 * @param {import('./isPropertyRelevant/types').Property} params.property
 * @param {string} params.selectedRelevanceLevel
 */
export default function ({
  relevanceLevels,
  category,
  property,
  selectedRelevanceLevel,
}) {
  if (!category) {
    return true
  }

  const relevanceLevelForCategory = category
    ? (property.metaData?.relevanceLevels || {})[category] || ''
    : ''

  return (
    relevanceLevels.indexOf(relevanceLevelForCategory) <=
    relevanceLevels.indexOf(selectedRelevanceLevel)
  )
}
