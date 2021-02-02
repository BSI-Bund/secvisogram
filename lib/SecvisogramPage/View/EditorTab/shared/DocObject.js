import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
 *  defaultValue?(): {}
 *  doAdd?(): void
 *  doDelete?(): void
 *  onDocUpdate?({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function DocObject({
  object,
  label,
  description,
  dataPath,
  objectName,
  children,
  ...props
}) {
  const validationErrors = props.validationErrors.filter(
    (e) => e.dataPath === dataPath
  )
  const level = dataPath.split('/').slice(1).length
  /** @type {React.ComponentType<React.HTMLProps<HTMLHeadingElement>>} */
  const Heading = /** @type {any} */ (`h${level + 1}`)

  const doAdd = () => {
    if (props.onDocUpdate && props.defaultValue) {
      const update = {}
      set(
        update,
        dataPath.split('/').slice(1).concat(['$set']),
        props.defaultValue()
      )
      props.onDocUpdate(update)
    } else {
      props.doAdd?.()
    }
  }

  const doDelete = () => {
    if (props.onDocUpdate && props.defaultValue) {
      const update = {}
      const pathSplitted = dataPath.split('/').slice(1)
      const property = pathSplitted.pop()
      set(update, pathSplitted.concat(['$unset']), [property])
      props.onDocUpdate(update)
    } else {
      props.doDelete?.()
    }
  }

  return object ? (
    <div className="border border-white">
      <Heading
        title={objectName + ': ' + description}
        className={
          'font-bold pb-2 pt-2 sticky -top-3 bottom-2 left-0 w-full bg-gray-100 pl-4 border shadow' +
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
      <div className="border py-2 px-4 mb-1">
        <ContainerErrors validationErrors={validationErrors} />
        {children}
      </div>
    </div>
  ) : (
    <div className="mb-1">
      <DefaultButton onClick={doAdd}>{"Add '" + label + "'"}</DefaultButton>
    </div>
  )
}
