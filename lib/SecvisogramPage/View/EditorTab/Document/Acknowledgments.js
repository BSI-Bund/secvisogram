import React from 'react'

/**
 * @param {{
    acknowledgments?: Array<{
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
      <h1 title="Contains a list of acknowledgment elements.">
        <button
          type="button"
          className={'mr-2 text-white py-2 px-3 bg-red-500 hover:bg-red-200'}
          onClick={() => {
            onUpdate({ $set: undefined })
          }}
        >
          -
        </button>
        List of acknowledgments
      </h1>
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
            <h1
              title="Acknowledges contributions by describing those that contributed."
              className="ml-2"
            >
              Acknowledgment
            </h1>
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

          <Urls
            urls={acknowledgment.urls}
            onUpdate={(data) => {
              onUpdate({ [acknowledgmentIndex]: { urls: data } })
            }}
          />

          <Summary
            summary={acknowledgment.summary}
            onUpdate={(data) => {
              onUpdate({ [acknowledgmentIndex]: { summary: data } })
            }}
          />
        </section>
      ))}
      <div className="mt-2">
        <button
          className="border py-2 px-3 hover:bg-gray-200"
          onClick={() => {
            onUpdate({
              $push: [{}],
            })
          }}
        >
          +
        </button>
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
        Create List of acknowledgments
      </button>
    </div>
  )
}

/**
   * @param {{
      names?: string[]
      onUpdate({}): void
    }} props
   */
function Names({ names, onUpdate }) {
  return names ? (
    <section className="p-2">
      <h1 title="Contains the names of entities being recognized.">
        <button
          type="button"
          className={'mr-2 text-white py-2 px-3 bg-red-500 hover:bg-red-200'}
          onClick={() => {
            onUpdate({ $set: undefined })
          }}
        >
          -
        </button>
        List of acknowledged names
      </h1>
      <div key={names.length}>
        {names.map((value, index) => (
          <div key={index} className="p-2 mt-2 first:mt-0">
            <h2 title="Contains the name of a single person.">
              Name of entity being recognized
            </h2>
            <div className="max-w-md flex items-center justify-center">
              <input
                className="border p-2 w-full"
                type="text"
                value={value}
                required
                placeholder="Johann Sebastian Bach"
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
  ) : (
    <div className="mt-2">
      <button
        className="border py-2 px-3 hover:bg-gray-200"
        onClick={() => {
          onUpdate({
            $set: [''],
          })
        }}
      >
        List of acknowledged names
      </button>
    </div>
  )
}

/**
   * @param {{
      organizations?: string[]
      onUpdate({}): void
    }} props
   */
function Organizations({ organizations, onUpdate }) {
  return organizations ? (
    <section className="p-2">
      <h1 title="Contains the names of contributing organizations being recognized.">
        <button
          type="button"
          className={'mr-2 text-white py-2 px-3 bg-red-500 hover:bg-red-200'}
          onClick={() => {
            onUpdate({ $set: undefined })
          }}
        >
          -
        </button>
        List of contributing organizations
      </h1>
      <div key={organizations.length}>
        {organizations.map((value, index) => (
          <div key={index} className="p-2 mt-2 first:mt-0">
            <h2 title="Contains the name of a single organization.">
              Contributing organization
            </h2>
            <div
              key={index}
              className="max-w-md flex items-center justify-center"
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
  ) : (
    <div className="mt-2">
      <button
        className="border py-2 px-3 hover:bg-gray-200"
        onClick={() => {
          onUpdate({
            $set: [''],
          })
        }}
      >
        List of contributing organizations
      </button>
    </div>
  )
}

/**
   * @param {{
      urls?: string[]
      onUpdate({}): void
    }} props
   */
function Urls({ urls, onUpdate }) {
  return urls ? (
    <section className="p-2">
      <h1 title="Specifies a list of URLs or location of the reference to be acknowledged.">
        <button
          type="button"
          className={'mr-2 text-white py-2 px-3 bg-red-500 hover:bg-red-200'}
          onClick={() => {
            onUpdate({ $set: undefined })
          }}
        >
          -
        </button>
        List of URLs
      </h1>
      <div key={urls.length}>
        {urls.map((value, index) => (
          <div key={index} className="p-2 mt-2 first:mt-0">
            <h2 title="Contains the URL or location of the reference to be acknowledged.">
              URL of acknowledgment
            </h2>
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
  ) : (
    <div className="mt-2">
      <button
        className="border py-2 px-3 hover:bg-gray-200"
        onClick={() => {
          onUpdate({
            $set: [''],
          })
        }}
      >
        List of URLs
      </button>
    </div>
  )
}

/**
   * @param {{
      summary: string
      onUpdate({}): void
    }} props
   */
function Summary({ summary, onUpdate }) {
  return summary != null ? (
    <section className="p-2">
      <h1 title="SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties.">
        Summary of the acknowledgment
      </h1>
      <div className="max-w-md flex items-center justify-center mt-0">
        <input
          className="border p-2 w-full"
          type="text"
          value={summary}
          required
          placeholder="First analysis of Coordinated Multi-Stream Attack (CMSA)"
          onChange={(e) => {
            onUpdate({ $set: e.target.value })
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
            $set: '',
          })
        }}
      >
        Create Summary of the acknowledgment
      </button>
    </div>
  )
}
