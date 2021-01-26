import '@reach/combobox/styles.css'
import React from 'react'
import EnumAttribute from '../shared/EnumAttribute'
import Object from '../shared/Object'

/**
 * @param {{
    publisher?: {
      type: string,
    }
    dataPath: string
    validationErrors: import('../../../../shared/validationTypes').ValidationError[]
    onUpdate({}): void
  }} props
 */
export default function Publisher({
  publisher,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <Object
      object={publisher}
      label="Publisher"
      description="Provides information about the publisher of the document."
      validationErrors={validationErrors.filter((e) => e.dataPath === dataPath)}
      doAdd={() => {
        onUpdate({
          $set: {
            type: '',
          },
        })
      }}
      doDelete={() => {
        onUpdate({ $set: undefined })
      }}
    >
      {publisher ? (
        <>
          <PublisherType
            type={publisher.type}
            onUpdate={(data) => {
              onUpdate({ type: data })
            }}
          />
        </>
      ) : null}
    </Object>
  )
}

/**
   * @param {{
      type: string
      onUpdate({}): void
    }} props
   */
function PublisherType({ type, onUpdate }) {
  return (
    <EnumAttribute
      label="Type of publisher"
      description="Provides information about the type of publisher releasing the document."
      value={type}
      options={['coordinator', 'discoverer', 'other', 'user', 'vendor']}
      required
      onUpdate={onUpdate}
    />
  )
}
