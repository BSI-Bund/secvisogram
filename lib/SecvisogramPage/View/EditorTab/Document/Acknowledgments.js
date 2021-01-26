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
    acknowledgments?: Array<{
      names: string[],
      organizations: string[]
      summary: string
      urls: string[]
    }>
    onUpdate({}): void
  }} props
 */
export default function Acknowledgments({ acknowledgments, onUpdate }) {
  return (
    <Object
      object={acknowledgments}
      label="List of acknowledgments"
      description="Contains a list of acknowledgment elements."
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
            <>
              <Names
                names={value.names}
                onUpdate={(data) => {
                  onUpdate({ [index]: { names: data } })
                }}
              />

              <Organizations
                organizations={value.organizations}
                onUpdate={(data) => {
                  onUpdate({ [index]: { organizations: data } })
                }}
              />

              <Urls
                urls={value.urls}
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
            </>
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
