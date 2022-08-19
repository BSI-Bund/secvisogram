/**
 * TODO
 *
 * @param {import('./types.js').MetaProperty} schema
 * @return {{
 *   fields: import('./types.js').MetaProperty[],
 *   lists: import('./types').MetaProperty[],
 *   objects: import('./types').MetaProperty[]
 * }}
 */
export function getObjectInfo(schema) {
  let fields = []
  let lists = []
  let objects = []

  const metaInfo = /** @type {import('./types.js').MetaInfoObject} */ (
    schema.metaInfo
  )

  for (const entry of metaInfo.propertyList) {
    if (entry.type === 'OBJECT') {
      objects.push(entry)
    } else if (entry.type === 'ARRAY') {
      lists.push(entry)
    } else {
      console.log(entry.type)
      fields.push(entry)
    }
  }

  return { fields, lists, objects }
}
