import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
import DeleteArrayAttribute from '../../shared/DeleteArrayAttribute'
import Object from '../../shared/Object'
import TextAttribute from '../../shared/TextAttribute'

/**
   * @param {{
      urls?: string[]
      onUpdate({}): void
    }} props
   */
export default function Urls({ urls, onUpdate }) {
  return (
    <Object
      object={urls}
      label="List of URLs"
      description="Specifies a list of URLs or location of the reference to be acknowledged."
      doAdd={() => {
        onUpdate({
          $set: [''],
        })
      }}
      doDelete={() => {
        onUpdate({ $set: undefined })
      }}
    >
      {urls ? (
        <AttributeArray array={urls} onUpdate={onUpdate}>
          {({ value, index }) => (
            <TextAttribute
              label="URL of acknowledgment"
              description="Contains the URL or location of the reference to be acknowledged."
              value={value}
              required
              onUpdate={onUpdate}
            >
              <DeleteArrayAttribute
                array={urls}
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
