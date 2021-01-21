import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import React from 'react'
import Acknowledgments from './Document/Acknowledgments'
import Publisher from './Document/Publisher'
import Tracking from './Document/Tracking'

/**
 * @param {{
    document?: {
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
  return document ? (
    <>
      <h1
        title="Captures the meta-data about this document describing a particular set of security advisories."
        className="font-bold pb-1"
      >
        <button
          type="button"
          className={'mr-2 text-white py-2 px-3 bg-red-500 hover:bg-red-200'}
          onClick={() => {
            onUpdate({ $set: undefined })
          }}
        >
          -
        </button>
        Document level meta-data
      </h1>

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
  ) : (
    <div className="mt-2">
      <button
        className="border py-2 px-3 hover:bg-gray-200"
        onClick={() => {
          onUpdate({
            $set: {
              title: '',
              csaf_version: '',
              type: '',
            },
          })
        }}
      >
        Create Document level meta-data
      </button>
    </div>
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
      <h1 title="This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents.">
        Title of this document
      </h1>
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
      <h1 title="Gives the version of the CSAF specification which the document was generated for.">
        CSAF version
      </h1>
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
            value={csafVersion}
            onChange={(e) => {
              onUpdate({ $set: e.target.value })
            }}
          />
          <ComboboxPopover>
            <ComboboxList persistSelection>
              <ComboboxOption value="2.0" />
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
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
      <h1 title="Defines a short canonical name, chosen by the document producer, which will inform the end user as to the type of document.">
        Document type
      </h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          value={type}
          type="text"
          placeholder="Security Advisory"
          required
          onChange={(e) => {
            onUpdate({ $set: e.target.value })
          }}
        />
      </div>
    </section>
  )
}
