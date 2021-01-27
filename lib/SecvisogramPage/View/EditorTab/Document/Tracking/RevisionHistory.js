import React from 'react'
import DateAttribute from '../../shared/DateAttribute'
import Object from '../../shared/Object'
import ObjectArray from '../../shared/ObjectArray'
import TextAreaAttribute from '../../shared/TextAreaAttribute'
import TextAttribute from '../../shared/TextAttribute'

/**
   * @param {{
      value?: Array<{
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
  value,
  dataPath,
  validationErrors,
  onUpdate,
}) {
  return (
    <Object
      object={value}
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
      {value ? (
        <ObjectArray
          array={value}
          dataPath={dataPath}
          validationErrors={validationErrors}
          onUpdate={onUpdate}
        >
          {({ value, index }) => (
            <>
              <TextAttribute
                label="Version"
                description="Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version."
                placeholder="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
                pattern="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
                required
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/number`}
                value={value.number}
                onUpdate={(data) => {
                  onUpdate({ [index]: { number: data } })
                }}
              />
              <DateAttribute
                label="Date of the revision"
                description="The date of the revision entry"
                required
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/date`}
                value={value.date}
                onUpdate={(data) => {
                  onUpdate({ [index]: { date: data } })
                }}
              />
              <TextAreaAttribute
                label="Summary of the revision"
                description="Holds a single non-empty string representing a short description of the changes."
                required
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/summary`}
                value={value.summary}
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
