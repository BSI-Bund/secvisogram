import '@reach/combobox/styles.css'
import React from 'react'
import EnumAttribute from '../shared/EnumAttribute'
import ObjectContainer from '../shared/ObjectContainer'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
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
    <ObjectContainer
      label="Publisher"
      description="Provides information about the publisher of the document."
      validationErrors={validationErrors}
      dataPath={dataPath}
      value={publisher}
      defaultValue={() => ({
        type: '',
      })}
      onUpdate={onUpdate}
    >
      {(publisherProps) => (
        <EnumAttribute
          {...publisherProps('type')}
          label="Type of publisher"
          description="Provides information about the type of publisher releasing the document."
          options={['coordinator', 'discoverer', 'other', 'user', 'vendor']}
        />
      )}
    </ObjectContainer>
  )
}
