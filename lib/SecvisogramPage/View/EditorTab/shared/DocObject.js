import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'
import ContainerErrors from './ContainerErrors'

/**
 * @param {{
 *  object?: object
 *  label: string
 *  description: string
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  defaultValue(): {}
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function DocObject({
  object,
  label,
  description,
  validationErrors,
  dataPath,
  objectName,
  defaultValue,
  onUpdate,
  children,
}) {
  const localValidationErrors = validationErrors.filter(
    (e) => e.dataPath === dataPath
  )
  const parsedDataPath = React.useMemo(() => parse(dataPath), [dataPath])
  const level = parsedDataPath.length
  /** @type {React.ComponentType<React.HTMLProps<HTMLHeadingElement>>} */
  const Heading = /** @type {any} */ (`h${level + 1}`)

  const doAdd = () => {
    const update = {}
    set(update, parsedDataPath.concat(['$set']), defaultValue())
    onUpdate(update)
  }

  const doDelete = () => {
    const update = {}
    const pathSplitted = parsedDataPath.slice()
    const property = pathSplitted.pop()
    set(update, pathSplitted.concat(['$unset']), [property])
    onUpdate(update)
  }

  return object ? (
    <div className="border border-white">
      <Heading
        title={objectName + ': ' + description}
        className={
          'font-bold pb-2 pt-2 sticky -top-3 bottom-2 left-0 w-full bg-gray-100 pl-4 border shadow' +
          (localValidationErrors.length ? ' text-red-500' : '')
        }
      >
        {label}
        <button
          type="button"
          className={'ml-4 hover:text-gray-400'}
          onClick={doDelete}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </Heading>
      <div className="border py-2 px-4 mb-1">
        <ContainerErrors validationErrors={localValidationErrors} />
        {children}
      </div>
    </div>
  ) : (
    <div className="mb-1">
      <DefaultButton onClick={doAdd}>{"Add '" + label + "'"}</DefaultButton>
    </div>
  )
}
