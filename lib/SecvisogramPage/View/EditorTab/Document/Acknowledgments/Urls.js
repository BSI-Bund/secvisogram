import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
import DeleteArray from '../../shared/DeleteArray'
import DocObject from '../../shared/DocObject'
import TextAttribute from '../../shared/TextAttribute'

/**
 * @param {{
 *  value?: string[]
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  onUpdate({}): void
 * }} props
 */
export default function Urls({
  validationErrors,
  dataPath,
  objectName,
  value: urls,
  onUpdate,
}) {
  return (
    <DocObject
      label="List of URLs"
      description="Specifies a list of URLs or location of the reference to be acknowledged."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={urls}
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
              attributeName="entry"
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
    </DocObject>
  )
}
