import React from 'react'
import ArrayContainer from '../../shared/ArrayContainer'
import DateAttribute from '../../shared/DateAttribute'
import ObjectContainer from '../../shared/ObjectContainer'
import TextAreaAttribute from '../../shared/TextAreaAttribute'
import TextAttribute from '../../shared/TextAttribute'

/**
 * @param {{
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value?: unknown
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
    <ArrayContainer
      label="Revision history"
      description="Contains all the information elements required to track the evolution of a CSAF document."
      validationErrors={validationErrors}
      dataPath={dataPath}
      value={revisionHistory}
      defaultItemValue={() => ({})}
      onUpdate={onUpdate}
    >
      {({ value, dataPath: itemDataPath }) => (
        <ObjectContainer
          dataPath={itemDataPath}
          validationErrors={validationErrors}
          value={value}
          defaultValue={() => ({})}
          label=""
          description=""
          onUpdate={onUpdate}
        >
          {({ value: revisionHistoryItem }) => (
            <>
              <TextAttribute
                label="Version"
                description="Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version."
                placeholder="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
                pattern="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
                validationErrors={validationErrors}
                dataPath={`${itemDataPath}/number`}
                value={revisionHistoryItem.number}
                onUpdate={onUpdate}
              />
              <DateAttribute
                label="Date of the revision"
                description="The date of the revision entry"
                validationErrors={validationErrors}
                dataPath={`${itemDataPath}/date`}
                value={revisionHistoryItem.date}
                onUpdate={onUpdate}
              />
              <TextAreaAttribute
                label="Summary of the revision"
                description="Holds a single non-empty string representing a short description of the changes."
                validationErrors={validationErrors}
                dataPath={`${itemDataPath}/summary`}
                value={revisionHistoryItem.summary}
                onUpdate={onUpdate}
              />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
