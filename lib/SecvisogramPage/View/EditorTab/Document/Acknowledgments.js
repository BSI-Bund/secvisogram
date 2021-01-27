import React from 'react'
import Delete from '../shared/Delete'
import Object from '../shared/Object'
import ObjectArray from '../shared/ObjectArray'
import TextAttribute from '../shared/TextAttribute'
import Names from './Acknowledgments/Names'
import Organizations from './Acknowledgments/Organizations'
import Urls from './Acknowledgments/Urls'

/**
 * @param {{
 *   dataPath: string
 *   acknowledgments?: Array<{
 *     names: string[],
 *     organizations: string[]
 *     summary: string
 *     urls: string[]
 *   }>
 *   validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *   onUpdate({}): void
 * }} props
 */
export default function Acknowledgments({
  acknowledgments,
  dataPath,
  validationErrors,
  onUpdate,
}) {
  return (
    <Object
      object={acknowledgments}
      label="List of acknowledgments"
      description="Contains a list of acknowledgment elements."
      dataPath={dataPath}
      validationErrors={validationErrors}
      doAdd={() => {
        onUpdate({
          $set: [{}],
        })
      }}
      doDelete={() => {
        onUpdate({ $set: undefined })
      }}
    >
      {acknowledgments ? (
        <ObjectArray
          array={acknowledgments}
          itemLabel="Acknowledgment"
          itemDescription="Acknowledges contributions by describing those that contributed."
          dataPath={dataPath}
          validationErrors={validationErrors}
          onUpdate={onUpdate}
        >
          {({ value, index }) => (
            <>
              <Names
                names={value.names}
                dataPath={`${dataPath}/${index}/names`}
                validationErrors={validationErrors}
                onUpdate={(data) => {
                  onUpdate({ [index]: { names: data } })
                }}
              />

              <Organizations
                organizations={value.organizations}
                dataPath={`${dataPath}/${index}/organizations`}
                validationErrors={validationErrors}
                onUpdate={(data) => {
                  onUpdate({ [index]: { organizations: data } })
                }}
              />

              <Urls
                urls={value.urls}
                dataPath={`${dataPath}/${index}/urls`}
                validationErrors={validationErrors}
                onUpdate={(data) => {
                  onUpdate({ [index]: { urls: data } })
                }}
              />
              <TextAttribute
                label="Summary of the acknowledgment"
                description="SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties."
                placeholder="First analysis of Coordinated Multi-Stream Attack (CMSA)"
                required
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/summary`}
                value={value.summary}
                onUpdate={(data) => {
                  onUpdate({ [index]: { summary: data } })
                }}
              >
                <Delete
                  doDelete={() => {
                    onUpdate({ [index]: { summary: { $set: undefined } } })
                  }}
                />
              </TextAttribute>
            </>
          )}
        </ObjectArray>
      ) : null}
    </Object>
  )
}
