import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'
import ContainerErrors from './ContainerErrors'

/**
 * @param {{
 *  array?: unknown
 *  itemLabel?: string
 *  itemDescription?: string
 *  dataPath: string
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  defaultValue(): {}
 *  onDocUpdate({}): void
 *  children(
 *    props: {
 *      value: any
 *      index: number
 *    }
 *  ): JSX.Element
 * }} props
 */
export default function DocObjectArray({
  array,
  itemLabel,
  itemDescription,
  dataPath,
  validationErrors,
  defaultValue,
  onDocUpdate,
  children,
}) {
  const parsedDataPath = React.useMemo(() => parse(dataPath), [dataPath])
  const level = parsedDataPath.length + 1
  /** @type {React.ComponentType<React.HTMLProps<HTMLHeadingElement>>} */
  const Heading = /** @type {any} */ (`h${level + 1}`)

  const doAdd = () => {
    const update = {}
    set(update, parsedDataPath.concat(['$push']), defaultValue())
    onDocUpdate(update)
  }

  /**
   *
   * @param {number} index
   */
  const doDelete = (index) => {
    const update = {}
    set(update, parsedDataPath, { $splice: [[index, 1]] })
    onDocUpdate(update)
  }

  return (
    <>
      {Array.isArray(array) ? (
        <>
          {array.map((value, index) => {
            const localValidationErrors = validationErrors.filter(
              (e) => e.dataPath === `${dataPath}/${index}`
            )

            return (
              <div key={index} className="border border-white">
                <Heading
                  title={itemDescription}
                  className={
                    'font-bold pb-2 pt-2 sticky -top-3 bottom-2 left-0 w-full pl-4 border bg-gray-100 shadow' +
                    (localValidationErrors.length ? ' text-red-500' : '')
                  }
                >
                  {itemLabel ?? '(Untitled)'}
                  <button
                    type="button"
                    className={'ml-4 text-gray-500 hover:text-gray-400'}
                    onClick={() => {
                      doDelete(index)
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </Heading>
                <div className="border py-2 px-4 mb-1">
                  <ContainerErrors validationErrors={localValidationErrors} />
                  {children({ value, index })}
                </div>
              </div>
            )
          })}
          <div className="mb-1">
            <DefaultButton onClick={doAdd}>
              <FontAwesomeIcon icon={faPlus} />
            </DefaultButton>
          </div>
        </>
      ) : null}
    </>
  )
}
