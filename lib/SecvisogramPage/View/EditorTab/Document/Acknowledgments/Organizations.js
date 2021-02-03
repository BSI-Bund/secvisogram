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
export default function Organizations({
  validationErrors,
  dataPath,
  objectName,
  value: organizations,
  onUpdate,
}) {
  return (
    <DocObject
      label="List of contributing organizations"
      description="Contains the names of contributing organizations being recognized."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={organizations}
      defaultValue={() => ['']}
      onUpdate={onUpdate}
    >
      {organizations ? (
        <AttributeArray
          array={organizations}
          dataPath={dataPath}
          onUpdate={onUpdate}
        >
          {({ value, index }) => (
            <TextAttribute
              label="Contributing organization"
              description="Contains the name of a single organization."
              placeholder="CISA"
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
