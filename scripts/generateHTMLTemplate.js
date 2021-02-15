const jsonPtr = require('json-pointer')
const rootSchema = require('../lib/shared/Core/csaf_2.0.json')
const cvss3Schema = require('../lib/shared/Core/cvss-v3.1.json')
Object.assign(rootSchema.definitions, cvss3Schema.definitions)

/** @typedef {{ path: string; schema: any; items?: Array<Entry>; headingLevel: number }} Entry */

/**
 * @param {any} schema
 * @param {string[]} dataPath
 * @param {number} headingLevel
 * @returns {Array<Entry>}
 */
function generateSchemaPaths(schema, dataPath = [], headingLevel = 1) {
  const path = dataPath.length ? dataPath.join('.') : '.'
  if (headingLevel > 8) return [{ path, schema, headingLevel }]
  switch (schema.type) {
    case 'object':
      return [
        { path, schema, headingLevel },
        ...Object.entries(schema.properties || {}).flatMap(([key, value]) =>
          generateSchemaPaths(value, dataPath.concat([key]), headingLevel + 1)
        ),
      ]
    case 'array':
      return [
        {
          path,
          schema,
          items: generateSchemaPaths(schema.items, [], headingLevel + 1),
          headingLevel,
        },
      ]
    default:
      if (schema.$ref && schema.$ref.startsWith('#')) {
        return generateSchemaPaths(
          jsonPtr.get(rootSchema, schema.$ref.slice(1)),
          dataPath,
          headingLevel
        )
      }
      if (
        schema.oneOf?.find(
          (/** @type {any} */ s) =>
            s.$ref === 'https://www.first.org/cvss/cvss-v3.1.json'
        )
      ) {
        return generateSchemaPaths(cvss3Schema, dataPath, headingLevel)
      }
      return [{ schema, path, headingLevel }]
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
          `{{#${entry.path}}}<h${headingLevel}>${
            entry.schema.title || entry.path.split('.').pop()
          }</h${headingLevel}>\n<p>{{${entry.path}}}</p>{{/${entry.path}}}\n`
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

console.log(
  `\
<!DOCTYPE html>
<html lang="en">
  <head>
		<link rel="stylesheet" href="//unpkg.com/gutenberg-css" media="print" charset="utf-8">
		<link rel="stylesheet" href="//unpkg.com/gutenberg-css/dist/themes/modern.min.css" media="print" charset="utf-8">
  </head>
  <body>
    ${generateSchemaHTML(generateSchemaPaths(rootSchema, ['data', 'json']))}
  </body>
</html>`
)
