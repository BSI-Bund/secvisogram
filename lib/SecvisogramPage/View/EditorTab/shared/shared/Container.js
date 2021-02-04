import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import DefaultButton from '../../../shared/DefaultButton'
import ContainerErrors from '../ContainerErrors'

const numberRegExp = /^(0|[1-9][0-9]*)$/

/**
 * @param {{
 *   value: unknown
 *   label: string
 *   description: string
 *   validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   defaultValue(): V
 *   isValid(v: unknown): v is V
 *   onUpdate({}): void
 *   children(props: { value: V }): React.ReactNode;
 * }} props
 * @template V
 */
export default function Container({
  value,
  label,
  description,
  validationErrors,
  dataPath,
  defaultValue,
  isValid,
  onUpdate,
  children,
}) {
  const localValidationErrors = validationErrors.filter(
    (e) => e.dataPath === dataPath
  )
  const parsedDataPath = React.useMemo(() => parse(dataPath), [dataPath])
  const objectName = React.useMemo(() => parsedDataPath.slice().pop() ?? '', [
    parsedDataPath,
  ])
  const level = parsedDataPath.length
  /** @type {React.ComponentType<React.HTMLProps<HTMLHeadingElement>>} */
  const Heading = /** @type {any} */ (`h${level + 1}`)
  const isInArray = React.useMemo(
    () => Boolean(objectName.match(numberRegExp)),
    [objectName]
  )

  const doAdd = () => {
    const update = {}
    set(update, parsedDataPath.concat(['$set']), defaultValue())
    onUpdate(update)
  }

  const doDelete = () => {
    const update = {}
    set(
      update,
      parsedDataPath.slice(0, -1),
      !isInArray
        ? { $unset: [objectName] }
        : { $splice: [[Number(objectName), 1]] }
    )
    onUpdate(update)
  }

  return value ? (
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
        {isValid(value) && children({ value })}
      </div>
    </div>
  ) : (
    <div className="mb-1">
      <DefaultButton onClick={doAdd}>{"Add '" + label + "'"}</DefaultButton>
    </div>
  )
}
