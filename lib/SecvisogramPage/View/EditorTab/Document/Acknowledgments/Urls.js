import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
import DeleteArray from '../../shared/DeleteArray'
import Object from '../../shared/Object'
import TextAttribute from '../../shared/TextAttribute'

/**
   * @param {{
      urls?: string[]
      dataPath: string
      validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
      onUpdate({}): void
    }} props
   */
export default function Urls({ urls, validationErrors, dataPath, onUpdate }) {
  return (
    <Object
      object={urls}
      label="List of URLs"
      description="Specifies a list of URLs or location of the reference to be acknowledged."
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
      {urls ? (
        <AttributeArray array={urls} onUpdate={onUpdate}>
          {({ value, index, onUpdate: onItemUpdate }) => (
            <TextAttribute
              type="url"
              label="URL of acknowledgment"
              description="Contains the URL or location of the reference to be acknowledged."
              required
              validationErrors={validationErrors}
              dataPath={`${dataPath}/${index}`}
              value={value}
              onUpdate={onItemUpdate}
            >
              <DeleteArray
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
