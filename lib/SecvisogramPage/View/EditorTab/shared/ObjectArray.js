import React from 'react'

/**
 * @param {{
    array?: Array<any>
    itemLabel?: string
    itemDescription?: string
    dataPath: string
    validationErrors: import('../../../../shared/validationTypes').ValidationError[]
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
  dataPath,
  onUpdate,
  children,
  ...props
}) {
  return (
    <>
      {array
        ? array.map((value, index) => {
            const validationErrors = props.validationErrors.filter(
              (e) => e.dataPath === `${dataPath}/${index}`
            )

            return (
              <div
                key={index}
                className={
                  validationErrors.length
                    ? 'border border-red-500'
                    : 'border border-white'
                }
              >
                <h1
                  title={itemDescription}
                  className="font-bold pb-2 pt-2 sticky top-0 bottom-2 left-0 w-full pl-4 border bg-gray-100 shadow"
                >
                  {itemLabel ?? '(Untitled)'}
                  <button
                    type="button"
                    className={
                      'ml-2 text-white h-6 w-6 rounded-full' +
                      (array.length === 1
                        ? ' bg-gray-200'
                        : ' bg-gray-500 hover:bg-gray-400')
                    }
                    disabled={array.length === 1}
                    onClick={() => {
                      onUpdate({ $splice: [[index, 1]] })
                    }}
                  >
                    &times;
                  </button>
                </h1>
                <div className="border p-4 mb-1">
                  {children({ value, index })}
                </div>
              </div>
            )
          })
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
