import { uniqueGroupId } from '../../../shared/fillFieldFunctions.js'

/**
 * @param {import('../../../shared/types').Property} property
 */
function getPrefilledObject(property) {
  const uiType = property.metaData?.uiType
  if (uiType === 'WITH_GENERATED_GROUP_ID') {
    return { group_id: uniqueGroupId() }
  }
  let obj = {}

  property.metaInfo.arrayType?.metaInfo.propertyList?.forEach((p) => {
    if (p.metaData?.uiType === 'WITH_GENERATED_GROUP_ID') {
      // @ts-ignore
      obj[p.key] = { group_id: uniqueGroupId() }
    }
  })

  return obj
}

/**
 * @param {import('../../../shared/types').Property} property
 * @param {string} childType
 */
export default function getChildItem(property, childType) {
  return childType === 'OBJECT'
    ? getPrefilledObject(property)
    : childType === 'ARRAY'
    ? []
    : childType === 'STRING'
    ? ''
    : null
}
