import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import React from 'react'

/**
 * @param {{
    publisher: {
      type: string,
    }
    onUpdate({}): void
  }} props
 */
export default function Publisher({ publisher, onUpdate }) {
  return (
    <section className="p-2">
      <h1 title="Provides information about the publisher of the document.">
        Publisher
      </h1>
      <div className="border p-2 mb-1">
        <PublisherType
          type={publisher.type}
          onUpdate={(data) => {
            onUpdate({ type: data })
          }}
        />
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
function PublisherType({ type, onUpdate }) {
  return (
    <section className="p-2">
      <h1 title="Provides information about the type of publisher releasing the document.">
        Type of publisher
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
            value={type}
            onChange={(e) => {
              onUpdate({ $set: e.target.value })
            }}
          />
          <ComboboxPopover>
            <ComboboxList persistSelection>
              <ComboboxOption value="coordinator" />
              <ComboboxOption value="discoverer" />
              <ComboboxOption value="other" />
              <ComboboxOption value="user" />
              <ComboboxOption value="vendor" />
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      </div>
    </section>
  )
}
