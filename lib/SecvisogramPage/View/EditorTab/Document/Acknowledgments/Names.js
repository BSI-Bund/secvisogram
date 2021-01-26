import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
import DeleteArrayAttribute from '../../shared/DeleteArrayAttribute'
import Object from '../../shared/Object'
import TextAttribute from '../../shared/TextAttribute'

/**
   * @param {{
      names?: string[]
      dataPath: string
      validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
      onUpdate({}): void
    }} props
   */
export default function Names({ names, validationErrors, dataPath, onUpdate }) {
  return (
    <Object
      object={names}
      label="List of acknowledged names"
      description="Contains the names of entities being recognized."
      validationErrors={validationErrors.filter((e) => e.dataPath === dataPath)}
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
          {({ value, index, onUpdate: onItemUpdate }) => (
            <TextAttribute
              label="Name of entity being recognized"
              description="Contains the name of a single person."
              placeholder="Johann Sebastian Bach"
              value={value}
              required
              onUpdate={onItemUpdate}
            >
              <DeleteArrayAttribute
                array={names}
                doDelete={() => {
                  onUpdate({
                    $splice: [[index, 1]],
                  })
                }}
              />
            </TextAttribute>
          )}
        </AttributeArray>
      ) : null}
    </Object>
  )
}
