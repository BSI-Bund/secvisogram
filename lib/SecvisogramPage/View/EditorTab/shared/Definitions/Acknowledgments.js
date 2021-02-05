import React from 'react'
import ArrayContainer from '../ArrayContainer'
import ObjectContainer from '../ObjectContainer'
import TextAttribute from '../TextAttribute'
import Names from './Acknowledgments/Names'
import Organizations from './Acknowledgments/Organizations'
import Urls from './Acknowledgments/Urls'

/**
 * @param {{
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value?: unknown
 *  onUpdate({}): void
 * }} props
 */
export default function Acknowledgments({
  validationErrors,
  dataPath,
  value: acknowledgments,
  onUpdate,
}) {
  return (
    <ArrayContainer
      label="List of acknowledgments"
      value={acknowledgments}
      description="Contains a list of acknowledgment elements."
      validationErrors={validationErrors}
      dataPath={dataPath}
      defaultItemValue={() => ({})}
      onUpdate={onUpdate}
    >
      {({ value, dataPath: itemDataPath }) => (
        <ObjectContainer
          dataPath={`${itemDataPath}`}
          validationErrors={validationErrors}
          value={value}
          defaultValue={() => ({})}
          label="Acknowledgment"
          description="Acknowledges contributions by describing those that contributed."
          onUpdate={onUpdate}
        >
          {(acknowledgmentProps) => (
            <>
              <Names {...acknowledgmentProps('names')} />
              <Organizations {...acknowledgmentProps('organizations')} />
              <Urls {...acknowledgmentProps('urls')} />
              <TextAttribute
                {...acknowledgmentProps('summary')}
                label="Summary of the acknowledgment"
                description="SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties."
                deletable
                placeholder="First analysis of Coordinated Multi-Stream Attack (CMSA)"
                minLength={1}
              />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
