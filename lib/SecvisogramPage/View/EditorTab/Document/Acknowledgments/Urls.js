import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
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
      defaultValue={() => ['']}
      onUpdate={onUpdate}
    >
      {urls ? (
        <AttributeArray array={urls} dataPath={dataPath} onUpdate={onUpdate}>
          {({ value, index }) => (
            <TextAttribute
              type="url"
              label="URL of acknowledgment"
              description="Contains the URL or location of the reference to be acknowledged."
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
