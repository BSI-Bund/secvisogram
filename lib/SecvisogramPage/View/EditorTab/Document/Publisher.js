import '@reach/combobox/styles.css'
import React from 'react'
import DocObject from '../shared/DocObject'
import EnumAttribute from '../shared/EnumAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
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
  onUpdate,
}) {
  return (
    <DocObject
      label="Publisher"
      description="Provides information about the publisher of the document."
      validationErrors={validationErrors}
      dataPath={dataPath}
      object={publisher}
      defaultValue={() => ({
        type: '',
      })}
      onUpdate={onUpdate}
    >
      {publisher ? (
        <EnumAttribute
          label="Type of publisher"
          description="Provides information about the type of publisher releasing the document."
          options={['coordinator', 'discoverer', 'other', 'user', 'vendor']}
          validationErrors={validationErrors}
          dataPath={`${dataPath}/type`}
          value={publisher.type}
          onUpdate={onUpdate}
        />
      ) : null}
    </DocObject>
  )
}
