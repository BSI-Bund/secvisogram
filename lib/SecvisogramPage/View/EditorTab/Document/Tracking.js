import '@reach/combobox/styles.css'
import React from 'react'
import DateAttribute from '../shared/DateAttribute'
import EnumAttribute from '../shared/EnumAttribute'
import Object from '../shared/Object'
import TextAttribute from '../shared/TextAttribute'
import RevisionHistory from './Tracking/RevisionHistory'

/**
 * @param {{
    tracking?: {
      current_release_date: string,
      id: string,
      initial_release_date: string,
      revision_history: Array<{
        number: string
        date: string
        summary: string
      }>,
      status: string,
      version: string
    }
    dataPath: string
    validationErrors: import('../../../../shared/validationTypes').ValidationError[]
    onUpdate({}): void
  }} props
 */
export default function Tracking({
  tracking,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <Object
      object={tracking}
      label="Tracking"
      description="Is a container designated to hold all management attributes necessary to track a CSAF document as a whole."
      validationErrors={validationErrors.filter((e) => e.dataPath === dataPath)}
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
          <TrackingId
            id={tracking.id}
            onUpdate={(data) => {
              onUpdate({ id: data })
            }}
          />

          <TrackingVersion
            version={tracking.version}
            onUpdate={(data) => {
              onUpdate({ version: data })
            }}
          />

          <TrackingStatus
            status={tracking.status}
            onUpdate={(data) => {
              onUpdate({ status: data })
            }}
          />

          <TrackingInitialRelease
            initialRelease={tracking.initial_release_date}
            onUpdate={(data) => {
              onUpdate({ initial_release_date: data })
            }}
          />

          <TrackingCurrentRelease
            currentRelease={tracking.current_release_date}
            onUpdate={(data) => {
              onUpdate({ current_release_date: data })
            }}
          />

          <RevisionHistory
            revisionHistory={tracking.revision_history}
            dataPath={`${dataPath}/revision_history`}
            validationErrors={validationErrors}
            onUpdate={(data) => {
              onUpdate({ revision_history: data })
            }}
          />
        </>
      ) : null}
    </Object>
  )
}

/**
   * @param {{
      id: string
      onUpdate({}): void
    }} props
   */
function TrackingId({ id, onUpdate }) {
  return (
    <TextAttribute
      label="Unique identifier for the document"
      description="The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority."
      value={id}
      placeholder="Example Company - 2019-YH3234"
      required
      onUpdate={onUpdate}
    />
  )
}

/**
   * @param {{
      version: string
      onUpdate({}): void
    }} props
   */
function TrackingVersion({ version, onUpdate }) {
  return (
    <TextAttribute
      label="Version"
      description="Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version."
      value={version}
      placeholder="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
      pattern="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
      required
      onUpdate={onUpdate}
    />
  )
}

/**
   * @param {{
      status: string
      onUpdate({}): void
    }} props
   */
function TrackingStatus({ status, onUpdate }) {
  return (
    <EnumAttribute
      label="Document status"
      description="Defines the draft status of the document."
      value={status}
      options={['draft', 'final', 'interim']}
      required
      onUpdate={onUpdate}
    />
  )
}

/**
   * @param {{
      initialRelease: string
      onUpdate({}): void
    }} props
   */
function TrackingInitialRelease({ initialRelease, onUpdate }) {
  return (
    <DateAttribute
      label="Initial release date"
      description="The date when this document was first published."
      value={initialRelease}
      required
      onUpdate={onUpdate}
    />
  )
}

/**
   * @param {{
      currentRelease: string
      onUpdate({}): void
    }} props
   */
function TrackingCurrentRelease({ currentRelease, onUpdate }) {
  return (
    <DateAttribute
      label="Current release date"
      description="The date when the current revision of this document was released"
      value={currentRelease}
      required
      onUpdate={onUpdate}
    />
  )
}
