import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
import DeleteArray from '../../shared/DeleteArray'
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
      dataPath={dataPath}
      validationErrors={validationErrors}
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
              required
              validationErrors={validationErrors}
              dataPath={`${dataPath}/${index}`}
              value={value}
              onUpdate={onItemUpdate}
            >
              <DeleteArray
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
