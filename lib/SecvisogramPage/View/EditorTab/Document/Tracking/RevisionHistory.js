import React from 'react'
import DateAttribute from '../../shared/DateAttribute'
import DocObject from '../../shared/DocObject'
import DocObjectArray from '../../shared/DocObjectArray'
import TextAreaAttribute from '../../shared/TextAreaAttribute'
import TextAttribute from '../../shared/TextAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value?: Array<{
 *    number: string
 *    date: string
 *    summary: string
 *  }>
 *  onUpdate({}): void
 * }} props
 */
export default function RevisionHistory({
  validationErrors,
  dataPath,
  value: revisionHistory,
  onUpdate,
}) {
  return (
    <DocObject
      label="Revision history"
      description="Contains all the information elements required to track the evolution of a CSAF document."
      validationErrors={validationErrors}
      dataPath={dataPath}
      object={revisionHistory}
      defaultValue={() => [{}]}
      onUpdate={onUpdate}
    >
      {revisionHistory ? (
        <DocObjectArray
          array={revisionHistory}
          dataPath={dataPath}
          validationErrors={validationErrors}
          defaultValue={() => [{}]}
          onDocUpdate={onUpdate}
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
                onUpdate={onUpdate}
              />
              <DateAttribute
                label="Date of the revision"
                description="The date of the revision entry"
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/date`}
                value={value.date}
                required
                onUpdate={onUpdate}
              />
              <TextAreaAttribute
                label="Summary of the revision"
                description="Holds a single non-empty string representing a short description of the changes."
                required
                minLength={1}
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/summary`}
                value={value.summary}
                onUpdate={onUpdate}
              />
            </>
          )}
        </DocObjectArray>
      ) : null}
    </DocObject>
  )
}
