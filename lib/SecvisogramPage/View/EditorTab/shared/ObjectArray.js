import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ContainerErrors from './ContainerErrors'

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
              <div key={index} className="border border-white">
                <h1
                  title={itemDescription}
                  className={
                    'font-bold pb-2 pt-2 sticky top-0 bottom-2 left-0 w-full pl-4 border bg-gray-100 shadow' +
                    (validationErrors.length ? ' text-red-500' : '')
                  }
                >
                  {itemLabel ?? '(Untitled)'}
                  <button
                    type="button"
                    className={
                      'ml-4' +
                      (array.length === 1
                        ? ' text-gray-200'
                        : ' text-gray-500 hover:text-gray-400')
                    }
                    disabled={array.length === 1}
                    onClick={() => {
                      onUpdate({ $splice: [[index, 1]] })
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </h1>
                <div className="border p-4 mb-1">
                  <ContainerErrors validationErrors={validationErrors} />
                  {children({ value, index })}
                </div>
              </div>
            )
          })
        : null}
      <div className="mb-1">
        <button
          type="button"
          className="border py-2 px-3 hover:bg-gray-200 text-sm"
          onClick={() => {
            onUpdate({
              $push: [{}],
            })
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </>
  )
}
