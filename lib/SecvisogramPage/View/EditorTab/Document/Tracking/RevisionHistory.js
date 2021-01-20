import React from 'react'
import DateTimePicker from 'react-datetime-picker'

/**
   * @param {{
      revisionHistory?: Array<{
        number: string
        date: string
        summary: string
      }>
      onUpdate({}): void
    }} props
   */
export default function RevisionHistory({ revisionHistory, onUpdate }) {
  return revisionHistory ? (
    <section className="p-2">
      <h1 title="Contains all the information elements required to track the evolution of a CSAF document.">
        <button
          type="button"
          className={'mr-2 text-white py-2 px-3 bg-red-500 hover:bg-red-200'}
          onClick={() => {
            onUpdate({ $set: undefined })
          }}
        >
          -
        </button>
        Revision history
      </h1>
      <div key={revisionHistory.length}>
        {revisionHistory.map((history, historyIndex) => (
          <section key={historyIndex} className="border p-2 mb-1">
            <div className="flex items-center mb-2">
              <button
                className={
                  'ml-2 text-white py-2 px-3 ' +
                  (revisionHistory.length === 1
                    ? 'bg-red-200'
                    : 'bg-red-500 hover:bg-red-200')
                }
                disabled={revisionHistory.length === 1}
                onClick={() => {
                  onUpdate({ $splice: [[historyIndex, 1]] })
                }}
              >
                -
              </button>
            </div>

            <HistoryNumber
              number={history.number}
              onUpdate={(data) => {
                onUpdate({ [historyIndex]: { number: data } })
              }}
            />

            <HistoryDate
              date={history.date}
              onUpdate={(data) => {
                onUpdate({ [historyIndex]: { date: data } })
              }}
            />

            <HistorySummary
              summary={history.summary}
              onUpdate={(data) => {
                onUpdate({ [historyIndex]: { summary: data } })
              }}
            />
          </section>
        ))}
        <div className="mt-2">
          <button
            className="border py-2 px-3 hover:bg-gray-200"
            onClick={() => {
              onUpdate({
                $push: [{ number: '', date: '', summary: '' }],
              })
            }}
          >
            +
          </button>
        </div>
      </div>
    </section>
  ) : (
    <div className="mt-2">
      <button
        className="border py-2 px-3 hover:bg-gray-200"
        onClick={() => {
          onUpdate({
            $set: [{}],
          })
        }}
      >
        Create Revision history
      </button>
    </div>
  )
}

/**
   * @param {{
      number: string
      onUpdate({}): void
    }} props
   */
function HistoryNumber({ number, onUpdate }) {
  return (
    <section className="p-2">
      <h1 title="Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version.">
        Version
      </h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={number}
          type="text"
          placeholder="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
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
      date: string
      onUpdate({}): void
    }} props
   */
function HistoryDate({ date, onUpdate }) {
  return (
    <section className="p-2">
      <h1 title="The date of the revision entry">Date of the revision</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <DateTimePicker
          className="w-full"
          value={date}
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
      summary: string
      onUpdate({}): void
    }} props
   */
function HistorySummary({ summary, onUpdate }) {
  return (
    <section className="p-2">
      <h1 title="Holds a single non-empty string representing a short description of the changes.">
        Summary of the revision
      </h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={summary}
          type="text"
          required
          onChange={(e) => {
            onUpdate({ $set: e.target.value })
          }}
        />
      </div>
    </section>
  )
}
