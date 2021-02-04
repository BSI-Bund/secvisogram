import '@reach/combobox/styles.css'
import React from 'react'
import DateAttribute from '../shared/DateAttribute'
import DocObject from '../shared/DocObject'
import EnumAttribute from '../shared/EnumAttribute'
import TextAttribute from '../shared/TextAttribute'
import RevisionHistory from './Tracking/RevisionHistory'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value?: {
 *    current_release_date: string,
 *    id: string,
 *    initial_release_date: string,
 *    revision_history: Array<{
 *      number: string
 *      date: string
 *      summary: string
 *    }>,
 *    status: string,
 *    version: string
 *  }
 *  onUpdate({}): void
 * }} props
 */
export default function Tracking({
  validationErrors,
  dataPath,
  value: tracking,
  onUpdate,
}) {
  return (
    <DocObject
      label="Tracking"
      description="Is a container designated to hold all management attributes necessary to track a CSAF document as a whole."
      validationErrors={validationErrors}
      dataPath={dataPath}
      object={tracking}
      defaultValue={() => ({
        id: '',
        version: '',
        status: '',
        initial_release_date: '',
        current_release_date: '',
      })}
      onUpdate={onUpdate}
    >
      {tracking ? (
        <>
          <TextAttribute
            label="Unique identifier for the document"
            description="The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority."
            placeholder="Example Company - 2019-YH3234"
            validationErrors={validationErrors}
            dataPath={`${dataPath}/id`}
            value={tracking.id}
            onUpdate={onUpdate}
          />
          <TextAttribute
            label="Version"
            description="Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version."
            placeholder="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
            pattern="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
            validationErrors={validationErrors}
            dataPath={`${dataPath}/version`}
            value={tracking.version}
            onUpdate={onUpdate}
          />
          <EnumAttribute
            label="Document status"
            description="Defines the draft status of the document."
            options={['draft', 'final', 'interim']}
            validationErrors={validationErrors}
            dataPath={`${dataPath}/status`}
            value={tracking.status}
            onUpdate={onUpdate}
          />
          <DateAttribute
            label="Initial release date"
            description="The date when this document was first published."
            validationErrors={validationErrors}
            dataPath={`${dataPath}/initial_release_date`}
            value={tracking.initial_release_date}
            onUpdate={onUpdate}
          />
          <DateAttribute
            label="Current release date"
            description="The date when the current revision of this document was released"
            validationErrors={validationErrors}
            dataPath={`${dataPath}/current_release_date`}
            value={tracking.current_release_date}
            onUpdate={onUpdate}
          />
          <RevisionHistory
            validationErrors={validationErrors}
            dataPath={`${dataPath}/revision_history`}
            value={tracking.revision_history}
            onUpdate={onUpdate}
          />
        </>
      ) : null}
    </DocObject>
  )
}
