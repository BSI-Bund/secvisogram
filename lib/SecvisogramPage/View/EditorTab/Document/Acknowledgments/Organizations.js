import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
import DeleteArrayAttribute from '../../shared/DeleteArrayAttribute'
import Object from '../../shared/Object'
import TextAttribute from '../../shared/TextAttribute'

/**
   * @param {{
      organizations?: string[]
      dataPath: string
      validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
      onUpdate({}): void
    }} props
   */
export default function Organizations({
  organizations,
  dataPath,
  validationErrors,
  onUpdate,
}) {
  return (
    <Object
      object={organizations}
      label="List of contributing organizations"
      description="Contains the names of contributing organizations being recognized."
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
      {organizations ? (
        <AttributeArray array={organizations} onUpdate={onUpdate}>
          {({ value, index, onUpdate: onItemUpdate }) => (
            <TextAttribute
              label="Contributing organization"
              description="Contains the name of a single organization."
              placeholder="CISA"
              value={value}
              required
              onUpdate={onItemUpdate}
            >
              <DeleteArrayAttribute
                array={organizations}
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
