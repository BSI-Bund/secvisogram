import '@reach/combobox/styles.css'
import React from 'react'
import DocObject from '../shared/DocObject'
import EnumAttribute from '../shared/EnumAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  value?: {
 *    type: string,
 *  }
 *  onUpdate({}): void
 * }} props
 */
export default function Publisher({
  value: publisher,
  validationErrors,
  dataPath,
  objectName,
  onUpdate,
}) {
  return (
    <DocObject
      label="Publisher"
      description="Provides information about the publisher of the document."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={publisher}
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
          attributeName="type"
          value={publisher.type}
          onUpdate={(data) => {
            onUpdate({ type: data })
          }}
        />
      ) : null}
    </DocObject>
  )
}
