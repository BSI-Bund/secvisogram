import React from 'react'
import RevisionHistory from './Tracking/RevisionHistory'

/**
 * @param {{
    tracking: {
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
  return (
    <section className="p-2">
      <h3>Tracking</h3>
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
      <h1>Unique identifier for the document</h1>
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
      <h1>Version</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={version}
          type="text"
          placeholder="0.9"
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
      <h1>Document status</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <select
          className="border p-2 w-full"
          value={status}
          required
          onChange={(e) => {
            onUpdate({ $set: e.target.value })
          }}
        >
          <option value="draft">draft</option>
          <option value="final">final</option>
          <option value="interim">interim</option>
        </select>
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
      <h1>Initial release date</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={initialRelease}
          type="datetime-local"
          step="1"
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
      currentRelease: string
      onUpdate({}): void
    }} props
   */
function TrackingCurrentRelease({ currentRelease, onUpdate }) {
  return (
    <section className="p-2">
      <h1>Current release date</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={currentRelease}
          type="datetime-local"
          step="1"
          required
          onChange={(e) => {
            onUpdate({ $set: e.target.value })
          }}
        />
      </div>
    </section>
  )
}
