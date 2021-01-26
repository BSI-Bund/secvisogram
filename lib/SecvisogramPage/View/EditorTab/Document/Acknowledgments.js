import React from 'react'
import DeleteAttribute from '../shared/DeleteAttribute'
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
      validationErrors={validationErrors.filter((e) => e.dataPath === dataPath)}
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
          onUpdate={onUpdate}
        >
          {({ value, index }) => (
            <div
              className={
                validationErrors.find(
                  (e) => e.dataPath === `${dataPath}/${index}`
                )
                  ? 'border border-red-500'
                  : ''
              }
            >
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

              <Summary
                summary={value.summary}
                onUpdate={(data) => {
                  onUpdate({ [index]: { summary: data } })
                }}
              />
            </div>
          )}
        </ObjectArray>
      ) : null}
    </Object>
  )
}

/**
   * @param {{
      summary: string
      onUpdate({}): void
    }} props
   */
function Summary({ summary, onUpdate }) {
  return summary != null ? (
    <TextAttribute
      label="Summary of the acknowledgment"
      description="SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties."
      value={summary}
      placeholder="First analysis of Coordinated Multi-Stream Attack (CMSA)"
      onUpdate={onUpdate}
    >
      <DeleteAttribute
        doDelete={() => {
          onUpdate({ $set: undefined })
        }}
      />
    </TextAttribute>
  ) : (
    <div className="mt-2">
      <button
        type="button"
        className="border py-2 px-3 hover:bg-gray-200"
        onClick={() => {
          onUpdate({
            $set: '',
          })
        }}
      >
        Create Summary of the acknowledgment
      </button>
    </div>
  )
}
