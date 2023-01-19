/**
 * @param {object} params
 * @param {string[]} params.relevanceLevels
 * @param {import("../../shared/types").DocumentCategory} params.category
 * @param {import('./isPropertyRelevant/types').Property} params.property
 * @param {string} params.selectedRelevanceLevel
 */
export default function ({
  relevanceLevels,
  category,
  property,
  selectedRelevanceLevel,
}) {
  const relevanceLevelForCategory = category
    ? (property.metaData?.relevanceLevels || {})[category] || ''
    : ''

  const notRelevant =
    category &&
    relevanceLevels.indexOf(relevanceLevelForCategory) >
      relevanceLevels.indexOf(selectedRelevanceLevel)

  return !notRelevant
}
