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
      dataPath={dataPath}
      validationErrors={validationErrors}
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
        <EnumAttribute
          label="Type of publisher"
          description="Provides information about the type of publisher releasing the document."
          options={['coordinator', 'discoverer', 'other', 'user', 'vendor']}
          required
          validationErrors={validationErrors}
          dataPath={`${dataPath}/type`}
          value={publisher.type}
          onUpdate={(data) => {
            onUpdate({ type: data })
          }}
        />
      ) : null}
    </Object>
  )
}
