import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import React from 'react'
import DateTimePicker from 'react-datetime-picker'
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
    onUpdate({}): void
  }} props
 */
export default function Tracking({ tracking, onUpdate }) {
  return tracking ? (
    <section className="p-2">
      <h1 title="Is a container designated to hold all management attributes necessary to track a CSAF document as a whole.">
        Tracking
      </h1>
      <div className="border p-2 mb-1">
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
          onUpdate={(data) => {
            onUpdate({ revision_history: data })
          }}
        />
      </div>
    </section>
  ) : (
    <div className="mt-2">
      <button
        className="border py-2 px-3 hover:bg-gray-200"
        onClick={() => {
          onUpdate({
            $set: {},
          })
        }}
      >
        Create Tracking
      </button>
    </div>
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
    <section className="p-2">
      <h1 title="The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority.">
        Unique identifier for the document
      </h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={id}
          type="text"
          placeholder="Example Company - 2019-YH3234"
          required
          onChange={(e) => {
            onUpdate({ $set: e.target.value })
          }}
        />
      </div>
    </section>
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
    <section className="p-2">
      <h1 title="Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version.">
        Version
      </h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={version}
          type="text"
          placeholder="^(0|[1-9][0-9]*)(\\.(0|[1-9][0-9]*)){0,3}$"
          pattern="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
          required
          onChange={(e) => {
            onUpdate({ $set: e.target.value })
          }}
        />
      </div>
    </section>
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
    <section className="p-2">
      <h1 title="Defines the draft status of the document.">Document status</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <Combobox
          className="w-full"
          aria-labelledby="demo"
          openOnFocus
          onSelect={(item) => {
            onUpdate({ $set: item })
          }}
        >
          <ComboboxInput
            className="border p-2 w-full"
            selectOnClick
            required
            value={status}
            onChange={(e) => {
              onUpdate({ $set: e.target.value })
            }}
          />
          <ComboboxPopover>
            <ComboboxList persistSelection>
              <ComboboxOption value="draft" />
              <ComboboxOption value="final" />
              <ComboboxOption value="interim" />
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    </section>
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
    <section className="p-2">
      <h1 title="The date when this document was first published.">
        Initial release date
      </h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <DateTimePicker
          className="w-full"
          value={initialRelease}
          required
          onChange={(/** @type {string} */ value) => {
            onUpdate({ $set: value })
          }}
        />
      </div>
    </section>
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
    <section className="p-2">
      <h1 title="The date when the current revision of this document was released">
        Current release date
      </h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <DateTimePicker
          className="w-full"
          value={currentRelease}
          required
          onChange={(/** @type {string} */ value) => {
            onUpdate({ $set: value })
          }}
        />
      </div>
    </section>
  )
}
