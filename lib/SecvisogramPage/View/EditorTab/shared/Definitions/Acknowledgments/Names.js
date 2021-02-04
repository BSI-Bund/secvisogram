import React from 'react'
import AttributeArray from '../../AttributeArray'
import DocObject from '../../DocObject'
import TextAttribute from '../../TextAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../../../shared/validationTypes').ValidationError[]
 *  value?: string[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Names({
  value: names,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <DocObject
      label="List of acknowledged names"
      description="Contains the names of entities being recognized."
      validationErrors={validationErrors}
      dataPath={dataPath}
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
