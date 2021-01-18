import React from 'react'

/**
 * @param {{
    acknowledgments: Array<{
      names: string[],
      organizations: string[]
      summary: string
      urls: string[]
    }>
    onUpdate({}): void
  }} props
 */
export default function Acknowledgments({ acknowledgments, onUpdate }) {
  return acknowledgments ? (
    <section className="p-2">
      <h3>List of acknowledgments</h3>
      {acknowledgments.map((acknowledgment, acknowledgmentIndex) => (
        <section key={acknowledgmentIndex} className="border p-2 mb-1">
          <div className="flex items-center mb-2">
            <button
              className={
                'ml-2 text-white py-2 px-3 bg-red-500 hover:bg-red-200'
              }
              onClick={() => {
                onUpdate({ $splice: [[acknowledgmentIndex, 1]] })
              }}
            >
              -
            </button>
          </div>

          <Names
            names={acknowledgment.names}
            onUpdate={(data) => {
              onUpdate({ [acknowledgmentIndex]: { names: data } })
            }}
          />

          <Organizations
            organizations={acknowledgment.organizations}
            onUpdate={(data) => {
              onUpdate({ [acknowledgmentIndex]: { organizations: data } })
            }}
          />

          <Summary
            summary={acknowledgment.summary}
            onUpdate={(data) => {
              onUpdate({ [acknowledgmentIndex]: { summary: data } })
            }}
          />

          <Urls
            urls={acknowledgment.urls}
            onUpdate={(data) => {
              onUpdate({ [acknowledgmentIndex]: { urls: data } })
            }}
          />
        </section>
      ))}
      <div className="mt-2">
        <button
          className="border py-2 px-3 hover:bg-gray-200"
          onClick={() => {
            onUpdate({
              $push: [
                { names: [''], organizations: [''], summary: '', urls: [''] },
              ],
            })
          }}
        >
          +
        </button>
      </div>
    </section>
  ) : null
}

/**
   * @param {{
      names: string[]
      onUpdate({}): void
    }} props
   */
function Names({ names, onUpdate }) {
  return (
    <section className="p-2">
      <h5>Names</h5>
      <div key={names.length}>
        {names.map((value, index) => (
          <div
            key={index}
            className="max-w-md flex items-center justify-center mt-2 first:mt-0"
          >
            <input
              className="border p-2 w-full"
              type="text"
              value={value}
              required
              onChange={(e) => {
                onUpdate({
                  [index]: { $set: e.target.value },
                })
              }}
            />
            <button
              className={
                'ml-2 text-white py-2 px-3 ' +
                (names.length === 1
                  ? 'bg-red-200'
                  : 'bg-red-500 hover:bg-red-200')
              }
              disabled={names.length === 1}
              onClick={() => {
                onUpdate({
                  $splice: [[index, 1]],
                })
              }}
            >
              -
            </button>
          </div>
        ))}
        <div className="mt-2">
          <button
            className="border py-2 px-3 hover:bg-gray-200"
            onClick={() => {
              onUpdate({ $push: [''] })
            }}
          >
            +
          </button>
        </div>
      </div>
    </section>
  )
}

/**
   * @param {{
      organizations: string[]
      onUpdate({}): void
    }} props
   */
function Organizations({ organizations, onUpdate }) {
  return (
    <section className="p-2">
      <h5>Organizations</h5>
      <div key={organizations.length}>
        {organizations.map((value, index) => (
          <div
            key={index}
            className="max-w-md flex items-center justify-center mt-2 first:mt-0"
          >
            <input
              className="border p-2 w-full"
              type="text"
              value={value}
              required
              onChange={(e) => {
                onUpdate({
                  [index]: { $set: e.target.value },
                })
              }}
            />
            <button
              className={
                'ml-2 text-white py-2 px-3 ' +
                (organizations.length === 1
                  ? 'bg-red-200'
                  : 'bg-red-500 hover:bg-red-200')
              }
              disabled={organizations.length === 1}
              onClick={() => {
                onUpdate({
                  $splice: [[index, 1]],
                })
              }}
            >
              -
            </button>
          </div>
        ))}
        <div className="mt-2">
          <button
            className="border py-2 px-3 hover:bg-gray-200"
            onClick={() => {
              onUpdate({ $push: [''] })
            }}
          >
            +
          </button>
        </div>
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
function Summary({ summary, onUpdate }) {
  return (
    <section className="p-2">
      <h5>Summary</h5>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          type="text"
          value={summary}
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
      urls: string[]
      onUpdate({}): void
    }} props
   */
function Urls({ urls, onUpdate }) {
  return (
    <section className="p-2">
      <h5>URLs</h5>
      <div key={urls.length}>
        {urls.map((value, index) => (
          <div
            key={index}
            className="max-w-md flex items-center justify-center mt-2 first:mt-0"
          >
            <input
              className="border p-2 w-full"
              type="url"
              value={value}
              required
              onChange={(e) => {
                onUpdate({
                  [index]: { $set: e.target.value },
                })
              }}
            />
            <button
              className={
                'ml-2 text-white py-2 px-3 ' +
                (urls.length === 1
                  ? 'bg-red-200'
                  : 'bg-red-500 hover:bg-red-200')
              }
              disabled={urls.length === 1}
              onClick={() => {
                onUpdate({
                  $splice: [[index, 1]],
                })
              }}
            >
              -
            </button>
          </div>
        ))}
        <div className="mt-2">
          <button
            className="border py-2 px-3 hover:bg-gray-200"
            onClick={() => {
              onUpdate({ $push: [''] })
            }}
          >
            +
          </button>
        </div>
      </div>
    </section>
  )
}
