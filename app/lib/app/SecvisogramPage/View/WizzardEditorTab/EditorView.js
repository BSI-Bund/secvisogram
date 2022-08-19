import { get } from 'lodash'
import React from 'react'

/**
 * Displays inputs for all json paths provided in jsonPaths
 *
 * @param {{
 *  formValues: import('../../shared/types').FormValues
 *  validationErrors: import('../../shared/types').TypedValidationError[]
 *  onUpdate(instancePath: string, update: {}): void
 *  traversedJsonPath: string[]
 *  schema: import('./shared/types').MetaProperty
 * }} props
 */
export default function EditorView({
  formValues,
  validationErrors,
  onUpdate,
  traversedJsonPath,
  schema,
}) {
  const { doc } = formValues

  /** @type {import('./shared/types.js').MetaProperty[]} */
  let objectFields = []
  if (schema.type === 'OBJECT') {
    const metaInfo = /** @type {import('./shared/types.js').MetaInfoObject} */ (
      schema.metaInfo
    )
    objectFields = metaInfo.propertyList.filter((element) => {
      return !(element.type === 'OBJECT' || element.type === 'ARRAY')
    })
  } else if (!(schema.type === 'OBJECT' || schema.type === 'ARRAY')) {
    // items of string lists
    objectFields.push(schema)
  }

  return (
    <div className="w-full bg-white">
      <ul>
        {/*<li className="py-1 px-4">*/}
        {/*  <b>Editor View: {traversedJsonPath.join('.')}</b>*/}
        {/*</li>*/}

        {objectFields.map(
          (
            /** @type {import('./shared/types.js').MetaProperty} */ field,
            /** @type {number} */ index
          ) => {
            let fieldContent
            try {
              let path = traversedJsonPath.join('.')
              path = field.key ? path + '.' + field.key : path
              fieldContent = get(doc, path)
            } catch (e) {
              console.log('error accessing content')
              console.log(e)
            }

            let pathForField = [...traversedJsonPath]
            pathForField.push(field.key)

            return (
              // add a decider view like ColumnTypeSelectorView here that inserts the correct type of input field

              <li key={index} className="py-1 px-4">
                Key: ({field.key}) Type: ({field.type}) Content if available: (
                {JSON.stringify(fieldContent)})
              </li>
            )
          }
        )}
      </ul>
    </div>
  )
}
