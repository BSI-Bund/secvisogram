const jsonPtr = require('json-pointer')
const schema = require('../lib/shared/Core/csaf_2.0.json')
const rootSchema = schema

/** @typedef {{ path: string; schema: any; items?: Array<Entry>; headingLevel: number }} Entry */

/**
 * @param {any} schema
 * @param {string[]} dataPath
 * @param {number} headingLevel
 * @returns {Array<Entry>}
 */
function generateSchemaPaths(schema, dataPath = [], headingLevel = 1) {
  if (headingLevel > 8)
    return [{ path: dataPath.join('.'), schema, headingLevel }]
  switch (schema.type) {
    case 'object':
      return [
        { path: dataPath.join('.'), schema, headingLevel },
        ...Object.entries(schema.properties || {}).flatMap(([key, value]) =>
          generateSchemaPaths(value, dataPath.concat([key]), headingLevel + 1)
        ),
      ]
    case 'array':
      return [
        {
          path: dataPath.join('.'),
          schema,
          items: generateSchemaPaths(schema.items, [], headingLevel + 1),
          headingLevel,
        },
      ]
    default:
      if (schema.$ref && schema.$ref.startsWith('#')) {
        if (schema.$ref === '#/definitions/products_t') return []
        return generateSchemaPaths(
          jsonPtr.get(rootSchema, schema.$ref.slice(1)),
          dataPath,
          headingLevel
        )
      }
      return [{ schema, path: dataPath.join('.'), headingLevel }]
  }
}

/**
 * @param {Array<Entry>} entries
 * @returns {string}
 */
function generateSchemaHTML(entries) {
  return entries.reduce((html, entry) => {
    const headingLevel = entry.headingLevel

    switch (entry.schema.type) {
      case 'string':
        return (
          html +
          `<h${headingLevel}>${entry.schema.title}</h${headingLevel}>\n<p>{{${entry.path}}}</p>\n`
        )

      case 'object':
        return (
          html + `<h${headingLevel}>${entry.schema.title}</h${headingLevel}>\n`
        )

      case 'array':
        return (
          html +
          `<h${headingLevel}>${entry.schema.title}</h${headingLevel}>\n` +
          (entry.items
            ? `{{#${entry.path}}}${generateSchemaHTML(entry.items)}{{/${
                entry.path
              }}}\n`
            : '')
        )

      default:
        return html
    }
  }, '')
}

console.log(generateSchemaHTML(generateSchemaPaths(schema, ['data', 'json'])))
