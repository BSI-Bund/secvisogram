import React from 'react'
import Acknowledgments from './Document/Acknowledgments'
import Publisher from './Document/Publisher'
import Tracking from './Document/Tracking'

/**
 * @param {{
    document: {
      csaf_version: string
      title: string
      publisher: {
        type: string,
      }
      type: string
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
      acknowledgments: Array<{
        names: string[],
        organizations: string[]
        summary: string
        urls: string[]
      }>
    }
    onUpdate({}): void
  }} props
 */
export default function Document({ document, onUpdate }) {
  return (
    <>
      <h2 className="font-bold pb-1">Document level meta-data</h2>

      <DocumentTitle
        title={document.title}
        onUpdate={(data) => {
          onUpdate({ title: data })
        }}
      />

      <CsafVersion
        csafVersion={document.csaf_version}
        onUpdate={(data) => {
          onUpdate({ csaf_version: data })
        }}
      />

      <DocumentType
        type={document.type}
        onUpdate={(data) => {
          onUpdate({ type: data })
        }}
      />

      <Tracking
        tracking={document.tracking}
        onUpdate={(data) => {
          onUpdate({ tracking: data })
        }}
      />

      <Publisher
        publisher={document.publisher}
        onUpdate={(data) => {
          onUpdate({ publisher: data })
        }}
      />

      <Acknowledgments
        acknowledgments={document.acknowledgments}
        onUpdate={(data) => {
          onUpdate({ acknowledgments: data })
        }}
      />
    </>
  )
}

/**
   * @param {{
      title: string
      onUpdate({}): void
    }} props
   */
function DocumentTitle({ title, onUpdate }) {
  return (
    <section className="p-2">
      <h1>Title of this document</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={title}
          type="text"
          placeholder="Example Company Cross-Site-Scripting Vulnerability in Example Generator"
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
      csafVersion: string
      onUpdate({}): void
    }} props
   */
function CsafVersion({ csafVersion, onUpdate }) {
  return (
    <section className="p-2">
      <h1>CSAF version</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <select
          className="border p-2 w-full"
          value={csafVersion}
          required
          onChange={(e) => {
            onUpdate({ $set: e.target.value })
          }}
        >
          <option value="2.0">2.0</option>
        </select>
      </div>
    </section>
  )
}

/**
   * @param {{
      type: string
      onUpdate({}): void
    }} props
   */
function DocumentType({ type, onUpdate }) {
  return (
    <section className="p-2">
      <h1>Document type</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={type}
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
