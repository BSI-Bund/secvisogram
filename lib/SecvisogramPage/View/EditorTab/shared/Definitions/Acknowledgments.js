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
  ...props
}) {
  return (
    <ArrayContainer
      label="List of acknowledgments"
      value={acknowledgments}
      description="Contains a list of acknowledgment elements."
      validationErrors={validationErrors}
      dataPath={dataPath}
      defaultItemValue={() => ({})}
      onUpdate={props.onUpdate}
    >
      {({ value, dataPath: itemDataPath }) => (
        <ObjectContainer
          dataPath={`${itemDataPath}`}
          validationErrors={validationErrors}
          value={value}
          defaultValue={() => ({})}
          label="Acknowledgment"
          description="Acknowledges contributions by describing those that contributed."
          onUpdate={props.onUpdate}
        >
          {({ value: acknowledgment }) => (
            <>
              <Names
                value={/** @type {any} */ (acknowledgment.names)}
                validationErrors={validationErrors}
                dataPath={`${itemDataPath}/names`}
                onUpdate={props.onUpdate}
              />

              <Organizations
                value={/** @type {any} */ (acknowledgment.organizations)}
                dataPath={`${itemDataPath}/organizations`}
                validationErrors={validationErrors}
                onUpdate={props.onUpdate}
              />

              <Urls
                value={/** @type {any} */ (acknowledgment.urls)}
                dataPath={`${itemDataPath}/urls`}
                validationErrors={validationErrors}
                onUpdate={props.onUpdate}
              />
              <TextAttribute
                label="Summary of the acknowledgment"
                description="SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties."
                deletable
                placeholder="First analysis of Coordinated Multi-Stream Attack (CMSA)"
                validationErrors={validationErrors}
                minLength={1}
                dataPath={`${itemDataPath}/summary`}
                value={acknowledgment.summary}
                onUpdate={props.onUpdate}
              />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
