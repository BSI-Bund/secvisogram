import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
import DeleteArrayAttribute from '../../shared/DeleteArrayAttribute'
import Object from '../../shared/Object'
import TextAttribute from '../../shared/TextAttribute'

/**
   * @param {{
      names?: string[]
      onUpdate({}): void
    }} props
   */
export default function Names({ names, onUpdate }) {
  return (
    <Object
      object={names}
      label="List of acknowledged names"
      description="Contains the names of entities being recognized."
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
          {({ value, index }) => (
            <TextAttribute
              label="Name of entity being recognized"
              description="Contains the name of a single person."
              placeholder="Johann Sebastian Bach"
              value={value}
              required
              onUpdate={onUpdate}
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
