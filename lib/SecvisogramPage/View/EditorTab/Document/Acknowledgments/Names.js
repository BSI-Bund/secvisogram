import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
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
      defaultValue={() => ['']}
      onUpdate={onUpdate}
    >
      {names ? (
        <AttributeArray array={names} dataPath={dataPath} onUpdate={onUpdate}>
          {({ value, index }) => (
            <TextAttribute
              label="Name of entity being recognized"
              description="Contains the name of a single person."
              placeholder="Johann Sebastian Bach"
              deletable
              required
              minLength={1}
              validationErrors={validationErrors}
              dataPath={`${dataPath}/${index}`}
              value={value}
              onUpdate={onUpdate}
            />
          )}
        </AttributeArray>
      ) : null}
    </DocObject>
  )
}
