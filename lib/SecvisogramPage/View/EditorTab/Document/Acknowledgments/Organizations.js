import React from 'react'
import AttributeArray from '../../shared/AttributeArray'
import DeleteArrayAttribute from '../../shared/DeleteArrayAttribute'
import Object from '../../shared/Object'
import TextAttribute from '../../shared/TextAttribute'

/**
   * @param {{
      organizations?: string[]
      onUpdate({}): void
    }} props
   */
export default function Organizations({ organizations, onUpdate }) {
  return (
    <Object
      object={organizations}
      label="List of contributing organizations"
      description="Contains the names of contributing organizations being recognized."
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
          {({ value, index }) => (
            <TextAttribute
              label="Contributing organization"
              description="Contains the name of a single organization."
              placeholder="CISA"
              value={value}
              required
              onUpdate={onUpdate}
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
