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
      <h3>Publisher</h3>
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
      <h1>Type of publisher</h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <select
          className="border p-2 w-full"
          value={type}
          required
          onChange={(e) => {
            onUpdate({ $set: e.target.value })
          }}
        >
          <option value="coordinator">coordinator</option>
          <option value="discoverer">discoverer</option>
          <option value="other">other</option>
          <option value="user">user</option>
          <option value="vendor">vendor</option>
        </select>
      </div>
    </section>
  )
}
