import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import ContainerErrors from './ContainerErrors'

/**
 * @param {{
 *  object?: object
 *  label: string
 *  description: string
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  objectName: string
 *  doAdd({}): void
 *  doDelete({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function Object({
  object,
  label,
  description,
  dataPath,
  objectName,
  doAdd,
  doDelete,
  children,
  ...props
}) {
  const validationErrors = props.validationErrors.filter(
    (e) => e.dataPath === dataPath
  )
  const level = dataPath.split('/').slice(1).length
  /** @type {React.ComponentType<React.HTMLProps<HTMLHeadingElement>>} */
  const Heading = /** @type {any} */ (`h${level + 1}`)

  return object ? (
    <div className="border border-white">
      <Heading
        title={description}
        className={
          'font-bold pb-2 pt-2 sticky top-0 bottom-2 left-0 w-full bg-gray-100 pl-4 border shadow' +
          (validationErrors.length ? ' text-red-500' : '')
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
      <div className="border p-4 mb-1">
        <ContainerErrors validationErrors={validationErrors} />
        {children}
      </div>
    </div>
  ) : (
    <div className="mb-1">
      <button
        type="button"
        className="border py-2 px-3 hover:bg-gray-200"
        onClick={doAdd}
      >
        Create {objectName}
      </button>
    </div>
  )
}
