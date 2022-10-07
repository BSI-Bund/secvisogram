import React from 'react'
import EnumAttribute from '../../shared/EnumAttribute.js'
import ObjectContainer from '../../shared/ObjectContainer.js'
import TextAttribute from '../../shared/TextAttribute.js'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/types').ValidationError[]
 *  instancePath: string
 *  value: unknown
 *  onUpdate(instancePath: string, update: {}): void
 * }} props
 */
export default function Tlp({
  value: tlp,
  validationErrors,
  instancePath,
  onUpdate,
}) {
  return (
    <ObjectContainer
      label="Traffic Light Protocol (TLP)"
      description="Provides details about the TLP classification of the document."
      validationErrors={validationErrors}
      instancePath={instancePath}
      value={tlp}
      defaultValue={() => ({
        label: '',
      })}
      onUpdate={onUpdate}
    >
      {(tlpProps) => (
        <>
          <EnumAttribute
            {...tlpProps('label')}
            label="Label of TLP"
            description="Provides the TLP label of the document."
            options={['RED', 'AMBER', 'GREEN', 'WHITE']}
          />
          <TextAttribute
            {...tlpProps('url')}
            label="URL of TLP version"
            description="Provides a URL where to find the textual description of the TLP version which is used in this document. Default is the URL to the definition by FIRST."
            defaultValue={() => 'https://www.first.org/tlp/'}
            type="url"
            placeholder="https://www.first.org/tlp/"
            deletable
          />
        </>
      )}
    </ObjectContainer>
  )
}
