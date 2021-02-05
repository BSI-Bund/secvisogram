import '@reach/combobox/styles.css'
import React from 'react'
import ObjectContainer from '../shared/ObjectContainer'
import TextAreaAttribute from '../shared/TextAreaAttribute'
import Tlp from './Distribution/Tlp'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate({}): void
 * }} props
 */
export default function Distribution({
  value: distribution,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <ObjectContainer
      label="Rules for sharing document"
      description="Describe any constraints on how this document might be shared."
      validationErrors={validationErrors}
      dataPath={dataPath}
      value={distribution}
      defaultValue={() => ({})}
      onUpdate={onUpdate}
    >
      {(distributionProps) => (
        <>
          <TextAreaAttribute
            {...distributionProps('text')}
            label="Textual description"
            description="Provides a textual description of additional constraints."
            placeholder="Share only on a need-to-know-basis only."
            deletable
          />
          <Tlp {...distributionProps('tlp')} />
        </>
      )}
    </ObjectContainer>
  )
}
