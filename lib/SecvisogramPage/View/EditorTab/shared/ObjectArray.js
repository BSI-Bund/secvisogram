import React from 'react'

/**
 * @param {{
    array?: Array<any>
    itemLabel?: string
    itemDescription?: string
    onUpdate({}): void
    children(
      props: {
        value: any
        index: number
      }
    ): JSX.Element
  }} props
 */
export default function ObjectArray({
  array,
  itemLabel,
  itemDescription,
  onUpdate,
  children,
}) {
  return (
    <>
      {array
        ? array.map((value, index) => (
            <section key={index} className="border p-2 mb-1">
              <div className="flex items-center mb-2">
                <button
                  type="button"
                  className={
                    'text-white py-2 px-3 ' +
                    (array.length === 1
                      ? 'bg-red-200'
                      : 'bg-red-500 hover:bg-red-200')
                  }
                  disabled={array.length === 1}
                  onClick={() => {
                    onUpdate({ $splice: [[index, 1]] })
                  }}
                >
                  -
                </button>
                {itemLabel ? (
                  <h1 title={itemDescription} className="ml-2">
                    {itemLabel}
                  </h1>
                ) : null}
              </div>
              {children({ value, index })}
            </section>
          ))
        : null}
      <div className="mb-1">
        <button
          type="button"
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
    </>
  )
}
