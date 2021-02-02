import '@reach/combobox/styles.css'
import React from 'react'
import DocObject from './shared/DocObject'
import ObjectArray from './shared/ObjectArray'
import Notes from './Vulnerabilities/Notes'

/**
 * @param {{
 *  value?: Array<{}>
 *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  onUpdate({}): void
 * }} props
 */
export default function Vulnerabilities({
  value: vulnerabilities,
  validationErrors,
  dataPath,
  objectName,
  onUpdate,
}) {
  return (
    <DocObject
      label="Vulnerabilities"
      description="Represents a list of all relevant vulnerability information items."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={vulnerabilities}
      doAdd={() => {
        onUpdate({
          $set: [{}],
        })
      }}
      doDelete={() => {
        onUpdate({ $set: undefined })
      }}
    >
      {vulnerabilities ? (
        <ObjectArray
          array={vulnerabilities}
          itemLabel="Vulnerability"
          itemDescription="Is a container for the aggregation of all fields that are related to a single vulnerability in the document."
          dataPath={dataPath}
          validationErrors={validationErrors}
          onUpdate={onUpdate}
        >
          {({ value, index }) => (
            <>
              <Notes
                value={value.notes}
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/notes`}
                objectName="notes"
                onUpdate={(data) => {
                  onUpdate({ [index]: { notes: data } })
                }}
              />
            </>
          )}
        </ObjectArray>
      ) : null}
    </DocObject>
  )
}
