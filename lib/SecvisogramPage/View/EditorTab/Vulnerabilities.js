import '@reach/combobox/styles.css'
import React from 'react'
import Notes from './shared/Definitions/Notes'
import DocObject from './shared/DocObject'
import DocObjectArray from './shared/DocObjectArray'

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
      defaultValue={() => [{}]}
      onUpdate={onUpdate}
    >
      {vulnerabilities ? (
        <DocObjectArray
          array={vulnerabilities}
          itemLabel="Vulnerability"
          itemDescription="Is a container for the aggregation of all fields that are related to a single vulnerability in the document."
          dataPath={dataPath}
          validationErrors={validationErrors}
          defaultValue={() => [{}]}
          onDocUpdate={onUpdate}
        >
          {({ value, index }) => (
            <>
              <Notes
                label="List of notes"
                description="Contains notes which are specific to the current context."
                validationErrors={validationErrors}
                dataPath={`${dataPath}/${index}/notes`}
                objectName="notes"
                value={value.notes}
                onUpdate={onUpdate}
              />
            </>
          )}
        </DocObjectArray>
      ) : null}
    </DocObject>
  )
}
