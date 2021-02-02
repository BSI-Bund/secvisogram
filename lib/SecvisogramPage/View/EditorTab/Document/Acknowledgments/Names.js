import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
import DeleteArray from '../../shared/DeleteArray'
import DocObject from '../../shared/DocObject'
import TextAttribute from '../../shared/TextAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  value?: string[]
 *  dataPath: string
 *  objectName: string
 *  onUpdate({}): void
 * }} props
 */
export default function Names({
  value: names,
  validationErrors,
  dataPath,
  objectName,
  onUpdate,
}) {
  return (
    <DocObject
      label="List of acknowledged names"
      description="Contains the names of entities being recognized."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={names}
      doAdd={() => {
        onUpdate({
          $set: [''],
        })
      }}
      doDelete={() => {
        onUpdate({ $set: undefined })
      }}
    >
      {names ? (
        <AttributeArray array={names} onUpdate={onUpdate}>
          {({ value, index, onUpdate: onItemUpdate, onDelete }) => (
            <TextAttribute
              label="Name of entity being recognized"
              description="Contains the name of a single person."
              placeholder="Johann Sebastian Bach"
              required
              validationErrors={validationErrors}
              dataPath={`${dataPath}/${index}`}
              attributeName="entry"
              value={value}
              onUpdate={onItemUpdate}
            >
              <DeleteArray doDelete={onDelete} />
            </TextAttribute>
          )}
        </AttributeArray>
      ) : null}
    </DocObject>
  )
}
