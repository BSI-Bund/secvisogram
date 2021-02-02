import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { set } from 'lodash'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'
import ContainerErrors from './ContainerErrors'

/**
 * @param {{
    array?: Array<any>
    itemLabel?: string
    itemDescription?: string
    dataPath: string
    validationErrors: import('../../../../shared/validationTypes').ValidationError[]
    onUpdate?({}): void
    onDocUpdate?({}): void
    children(
      props: {
        value: any
        index: number
      }
    ): JSX.Element
  }} props
 */
export default function DocObjectArray({
  array,
  itemLabel,
  itemDescription,
  dataPath,
  children,
  ...props
}) {
  const level = `${dataPath}/index`.split('/').slice(1).length
  /** @type {React.ComponentType<React.HTMLProps<HTMLHeadingElement>>} */
  const Heading = /** @type {any} */ (`h${level + 1}`)

  /**
   *
   * @param {{}} data
   */
  const onUpdate = (data) => {
    if (props.onDocUpdate) {
      const update = {}
      set(update, dataPath.split('/').slice(1), data)
      props.onDocUpdate(update)
    } else {
      props.onUpdate?.(data)
    }
  }

  return (
    <>
      {array
        ? array.map((value, index) => {
            const validationErrors = props.validationErrors.filter(
              (e) => e.dataPath === `${dataPath}/${index}`
            )

            return (
              <div key={index} className="border border-white">
                <Heading
                  title={itemDescription}
                  className={
                    'font-bold pb-2 pt-2 sticky -top-3 bottom-2 left-0 w-full pl-4 border bg-gray-100 shadow' +
                    (validationErrors.length ? ' text-red-500' : '')
                  }
                >
                  {itemLabel ?? '(Untitled)'}
                  <button
                    type="button"
                    className={'ml-4 text-gray-500 hover:text-gray-400'}
                    onClick={() => {
                      onUpdate({ $splice: [[index, 1]] })
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </Heading>
                <div className="border py-2 px-4 mb-1">
                  <ContainerErrors validationErrors={validationErrors} />
                  {children({ value, index })}
                </div>
              </div>
            )
          })
        : null}
      <div className="mb-1">
        <DefaultButton
          onClick={() => {
            onUpdate({
              $push: [{}],
            })
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </DefaultButton>
      </div>
    </>
  )
}
