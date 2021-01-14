import React from 'react'

/**
 * @param {{
    acknowledgments: Array<{
      names: string[],
      organizations: string[]
      summary: string
      urls: string []
    }>
    onUpdate({}): void
  }} props
 */
export default function Acknowledgments({ acknowledgments, onUpdate }) {
  return (
    <section>
      <h1>Acknowledgments</h1>
      {acknowledgments.map((acknowledgment, acknowledgmentIndex) => (
        <section key={acknowledgmentIndex} className="border p-2 mb-1">
          <div className="flex items-center mb-2">
            <button
              className={
                'ml-2 text-white py-2 px-3 ' +
                (acknowledgments.length === 1
                  ? 'bg-red-200'
                  : 'bg-red-500 hover:bg-red-200')
              }
              disabled={acknowledgments.length === 1}
              onClick={() => {
                onUpdate({ $splice: [[acknowledgmentIndex, 1]] })
              }}
            >
              -
            </button>
            <h1 className="ml-2">Acknowledgment </h1>
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
  )
}

/**
   * @param {{
      names: string[]
      onUpdate({}): void
    }} props
   */
function Names({ names, onUpdate }) {
  return (
    <section className="border p-2">
      <h1>Names</h1>
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
    <section className="border p-2">
      <h1>Organizations</h1>
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
    <section className="border p-2">
      <h1>Summary</h1>
      <div className="max-w-md flex items-center justify-center mt-2 first:mt-0">
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
    <section className="border p-2">
      <h1>URLs</h1>
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
