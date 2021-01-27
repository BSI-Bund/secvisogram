import '@reach/combobox/styles.css'
import React from 'react'
import DateAttribute from '../shared/DateAttribute'
import EnumAttribute from '../shared/EnumAttribute'
import Object from '../shared/Object'
import TextAttribute from '../shared/TextAttribute'
import RevisionHistory from './Tracking/RevisionHistory'

/**
 * @param {{
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
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
  objectName,
  onUpdate,
}) {
  return (
    <Object
      label="Tracking"
      description="Is a container designated to hold all management attributes necessary to track a CSAF document as a whole."
      validationErrors={validationErrors}
      dataPath={dataPath}
      objectName={objectName}
      object={tracking}
      doAdd={() => {
        onUpdate({
          $set: {
            id: '',
            version: '',
            status: '',
            initial_release_date: '',
            current_release_date: '',
          },
        })
      }}
      doDelete={() => {
        onUpdate({ $set: undefined })
      }}
    >
      {tracking ? (
        <>
          <TextAttribute
            label="Unique identifier for the document"
            description="The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority."
            placeholder="Example Company - 2019-YH3234"
            required
            validationErrors={validationErrors}
            dataPath={`${dataPath}/id`}
            attributeName="id"
            value={tracking.id}
            onUpdate={(data) => {
              onUpdate({ id: data })
            }}
          />
          <TextAttribute
            label="Version"
            description="Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version."
            placeholder="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
            pattern="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
            required
            validationErrors={validationErrors}
            dataPath={`${dataPath}/version`}
            attributeName="version"
            value={tracking.version}
            onUpdate={(data) => {
              onUpdate({ version: data })
            }}
          />
          <EnumAttribute
            label="Document status"
            description="Defines the draft status of the document."
            options={['draft', 'final', 'interim']}
            required
            validationErrors={validationErrors}
            dataPath={`${dataPath}/status`}
            attributeName="status"
            value={tracking.status}
            onUpdate={(data) => {
              onUpdate({ status: data })
            }}
          />
          <DateAttribute
            label="Initial release date"
            description="The date when this document was first published."
            required
            validationErrors={validationErrors}
            dataPath={`${dataPath}/initial_release_date`}
            attributeName="initial_release_date"
            value={tracking.initial_release_date}
            onUpdate={(data) => {
              onUpdate({ initial_release_date: data })
            }}
          />
          <DateAttribute
            label="Current release date"
            description="The date when the current revision of this document was released"
            required
            validationErrors={validationErrors}
            dataPath={`${dataPath}/current_release_date`}
            attributeName="current_release_date"
            value={tracking.current_release_date}
            onUpdate={(data) => {
              onUpdate({ current_release_date: data })
            }}
          />
          <RevisionHistory
            validationErrors={validationErrors}
            dataPath={`${dataPath}/revision_history`}
            objectName="revision_history"
            value={tracking.revision_history}
            onUpdate={(data) => {
              onUpdate({ revision_history: data })
            }}
          />
        </>
      ) : null}
    </Object>
  )
}
