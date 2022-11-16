import prettier from 'prettier'

/** @typedef {import('./importUiMetaData/csaf_json_schema.json')} CSAFJSONSchema */

import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import metaData from './importUiMetaData/metaData.js'

/** @type {CSAFJSONSchema} */
const schema = JSON.parse(
  await readFile(
    new URL('importUiMetadata/csaf_json_schema.json', import.meta.url),
    'utf-8'
  )
)

const defs = /** @type {import('./importUiMetaData/types').Defs} */ (
  schema.$defs
)

const metaDataRecord =
  /** @type {Record<String, { addMenuItemsForChildObjects?: boolean; propertyOrder?: string[] } | undefined>} */ (
    metaData
  )

/**
 * @param {import('./importUiMetaData/types').Schema} subschema
 * @param {string[]} path
 * @returns {import('./importUiMetaData/types').UiSchema}
 */
function convertSchema(subschema, path) {
  const strPath = path.join('.')

  let key = path.at(-1) ?? ''
  key = key === 'items' ? '' : key

  const fullName = path.filter((s) => s !== 'properties' && s !== 'items')
  const metaDataPath = strPath
    .replace(/^$/, '$')
    .replace(/^properties\./, '$.')
    .replaceAll('.properties.', '.')
    .replace(/\.items$/, '[]')
    .replaceAll('.items.', '[].')
  const metaData = metaDataRecord[metaDataPath]

  const commonUiSchemaFields = {
    key,
    fullName,
    title: subschema.title,
    description: subschema.description,
    addMenuItemsForChildObjects:
      metaDataRecord[metaDataPath]?.addMenuItemsForChildObjects,
    metaData:
      metaData &&
      Object.fromEntries(
        Object.entries(metaData).filter(([key]) => key !== 'propertyOrder')
      ),
  }

  if (
    strPath ===
    'properties.vulnerabilities.items.properties.scores.items.properties.cvss_v3'
  ) {
    return {
      ...commonUiSchemaFields,
      type: 'OBJECT',
      metaInfo: {
        propertyList: [],
      },
    }
  }

  if (
    strPath ===
    'properties.vulnerabilities.items.properties.scores.items.properties.cvss_v2'
  ) {
    return {
      ...commonUiSchemaFields,
      type: 'OBJECT',
      metaInfo: {
        propertyList: [],
      },
    }
  }

  if (
    'type' in subschema &&
    subschema.type === 'array' &&
    'type' in subschema.items &&
    subschema.items.type === 'object' &&
    strPath === 'properties.product_tree.properties.branches'
  ) {
    const properties = Object.fromEntries(
      Object.entries(subschema.items.properties).filter(
        ([key]) => key !== 'branches'
      )
    )
    const arrayType =
      /** @type {import('./importUiMetaData/types').ObjectUiSchema} */ (
        convertSchema({ ...subschema.items, properties }, [...path, 'items'])
      )
    arrayType.metaInfo.propertyList.unshift({
      ...commonUiSchemaFields,
      key: 'branches',
      metaInfo: {},
      type: 'RECURSION',
    })
    return {
      ...commonUiSchemaFields,
      type: 'ARRAY',
      metaInfo: {
        arrayType,
      },
    }
  }

  if ('$ref' in subschema) {
    const refName = subschema.$ref.replace(new RegExp('\\#/\\$defs/'), '')
    const ref = defs[refName]
    if (!ref) {
      throw new Error(
        'Ref with name `' + refName + '` not found (`' + strPath + '`)'
      )
    }
    return convertSchema(ref, path)
  }

  if (subschema.type === 'object') {
    let propertyList = Object.entries(subschema.properties)
    const propertyOrder = metaData?.propertyOrder
    if (propertyOrder) {
      propertyList = propertyList
        .filter((p) => propertyOrder.includes(p[0]))
        .sort(([a], [b]) => {
          return propertyOrder.indexOf(a) - propertyOrder.indexOf(b)
        })
        .concat(propertyList.filter((p) => !propertyOrder.includes(p[0])))
    }
    return {
      ...commonUiSchemaFields,
      type: 'OBJECT',
      metaInfo: {
        propertyList: propertyList.map(([key, value]) => {
          return convertSchema(value, [...path, 'properties', key])
        }),
      },
    }
  }

  if (subschema.type === 'array') {
    return {
      ...commonUiSchemaFields,
      type: 'ARRAY',
      metaInfo: {
        arrayType: convertSchema(subschema.items, [...path, 'items']),
      },
    }
  }

  if (subschema.type === 'string') {
    return {
      ...commonUiSchemaFields,
      ...{
        minLength: subschema.minLength,
        examples: subschema.examples,
        pattern: subschema.pattern,
        uniqueItems: subschema.uniqueItems,
      },
      metaInfo: {},
      type:
        subschema.format === 'date-time'
          ? 'DATETIME'
          : subschema.format === 'uri'
          ? 'URI'
          : 'STRING',
    }
  }

  return { type: 'UNKNOWN' }
}

const outputFile = fileURLToPath(
  new URL(
    '../lib/app/SecvisogramPage/View/WizardTab/schema.js',
    import.meta.url
  )
)
const prettierString = prettier.format(
  "/** @typedef {import('./shared/types').Property} Property */\n" +
    `export default (${JSON.stringify(
      convertSchema(
        /** @type {import('./importUiMetaData/types').Schema} */ (schema),
        []
      )
    )})`,
  {
    ...(await prettier.resolveConfig(outputFile)),
    filepath: outputFile,
  }
)
await writeFile(outputFile, prettierString, 'utf8')

console.log()
