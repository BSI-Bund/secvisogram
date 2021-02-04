import React from 'react'
import DocObject from '../DocObject'
import DocObjectArray from '../DocObjectArray'
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
    <DocObject
      label="List of acknowledgments"
      description="Contains a list of acknowledgment elements."
      validationErrors={validationErrors}
      dataPath={dataPath}
      object={acknowledgments}
      defaultValue={() => [{}]}
      onUpdate={props.onUpdate}
    >
      {acknowledgments ? (
        <DocObjectArray
          array={acknowledgments}
          itemLabel="Acknowledgment"
          itemDescription="Acknowledges contributions by describing those that contributed."
          dataPath={dataPath}
          validationErrors={validationErrors}
          defaultValue={() => [{}]}
          onDocUpdate={props.onUpdate}
        >
          {({ value, index }) => (
            <>
              <Names
                value={value.names}
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/names`}
                onUpdate={props.onUpdate}
              />

              <Organizations
                value={value.organizations}
                dataPath={`${dataPath}/${index}/organizations`}
                validationErrors={validationErrors}
                onUpdate={props.onUpdate}
              />

              <Urls
                value={value.urls}
                dataPath={`${dataPath}/${index}/urls`}
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
                dataPath={`${dataPath}/${index}/summary`}
                value={value.summary}
                onUpdate={props.onUpdate}
              />
            </>
          )}
        </DocObjectArray>
      ) : null}
    </DocObject>
  )
}
