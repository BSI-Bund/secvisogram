import React from 'react'
import AttributeArray from '../../AttributeArray'
import DocObject from '../../DocObject'
import TextAttribute from '../../TextAttribute'

/**
 * @param {{
 *  value?: string[]
 *  validationErrors: import('../../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Organizations({
  validationErrors,
  dataPath,
  value: organizations,
  onUpdate,
}) {
  return (
    <DocObject
      label="List of contributing organizations"
      description="Contains the names of contributing organizations being recognized."
      validationErrors={validationErrors}
      dataPath={dataPath}
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
