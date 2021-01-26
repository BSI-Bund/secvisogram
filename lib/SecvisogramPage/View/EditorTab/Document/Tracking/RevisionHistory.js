import React from 'react'
import DateAttribute from '../../shared/DateAttribute'
import Object from '../../shared/Object'
import ObjectArray from '../../shared/ObjectArray'
import TextAreaAttribute from '../../shared/TextAreaAttribute'
import TextAttribute from '../../shared/TextAttribute'

/**
   * @param {{
      revisionHistory?: Array<{
        number: string
        date: string
        summary: string
      }>
      dataPath: string
      validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
      onUpdate({}): void
    }} props
   */
export default function RevisionHistory({
  revisionHistory,
  dataPath,
  validationErrors,
  onUpdate,
}) {
  return (
    <Object
      object={revisionHistory}
      label="Revision history"
      description="Contains all the information elements required to track the evolution of a CSAF document."
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
      {revisionHistory ? (
        <ObjectArray
          array={revisionHistory}
          dataPath={dataPath}
          validationErrors={validationErrors}
          onUpdate={onUpdate}
        >
          {({ value, index }) => (
            <>
              <HistoryNumber
                number={value.number}
                onUpdate={(data) => {
                  onUpdate({ [index]: { number: data } })
                }}
              />

              <HistoryDate
                date={value.date}
                onUpdate={(data) => {
                  onUpdate({ [index]: { date: data } })
                }}
              />

              <HistorySummary
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
      number: string
      onUpdate({}): void
    }} props
   */
function HistoryNumber({ number, onUpdate }) {
  return (
    <TextAttribute
      label="Version"
      description="Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version."
      placeholder="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
      pattern="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
      required
      value={number}
      onUpdate={onUpdate}
    />
  )
}

/**
   * @param {{
      date: string
      onUpdate({}): void
    }} props
   */
function HistoryDate({ date, onUpdate }) {
  return (
    <DateAttribute
      label="Date of the revision"
      description="The date of the revision entry"
      value={date}
      required
      onUpdate={onUpdate}
    />
  )
}

/**
   * @param {{
      summary: string
      onUpdate({}): void
    }} props
   */
function HistorySummary({ summary, onUpdate }) {
  return (
    <TextAreaAttribute
      label="Summary of the revision"
      description="Holds a single non-empty string representing a short description of the changes."
      required
      value={summary}
      onUpdate={onUpdate}
    />
  )
}
