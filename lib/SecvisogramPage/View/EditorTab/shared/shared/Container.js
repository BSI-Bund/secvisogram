import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@reach/dialog/styles.css'
import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import { useAlert } from '../../../shared/Alert'
import DefaultButton from '../../../shared/DefaultButton'
import ContainerErrors from '../ContainerErrors'

const numberRegExp = /^(0|[1-9][0-9]*)$/

/**
 * @param {{
 *   value: unknown
 *   label: string
 *   description: string
 *   deletable?: boolean
 *   validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   open?: boolean
 *   defaultValue?(): V
 *   isValid(v: unknown): v is V
 *   onUpdate({}): void
 *   children(props: { value: V; validationErrors: import('../../../../../shared/validationTypes').ValidationError[] }): React.ReactNode;
 * }} props
 * @template V
 */
export default function Container({
  value,
  label,
  description,
  deletable = true,
  validationErrors,
  dataPath,
  open = false,
  defaultValue,
  isValid,
  onUpdate,
  children,
}) {
  const validationErrorsForChildren = validationErrors.filter((e) =>
    e.dataPath.startsWith(dataPath + '/')
  )
  const localValidationErrors = validationErrors.filter(
    (e) => e.dataPath === dataPath
  )
  const parsedDataPath = React.useMemo(() => parse(dataPath), [dataPath])
  const objectName = React.useMemo(() => parsedDataPath.slice().pop() ?? '', [
    parsedDataPath,
  ])
  const isInArray = React.useMemo(
    () => Boolean(objectName.match(numberRegExp)),
    [objectName]
  )

  const doDelete = () => {
    const operation = !isInArray
      ? { $unset: [objectName] }
      : { $splice: [[Number(objectName), 1]] }
    if (parsedDataPath.length === 1) {
      onUpdate(operation)
    } else {
      onUpdate(
        set(
          {},
          parsedDataPath.slice(0, -1),
          !isInArray
            ? { $unset: [objectName] }
            : { $splice: [[Number(objectName), 1]] }
        )
      )
    }
  }

  const confirm = () => {
    doDelete()
    hide()
  }

  const { show, hide, Alert } = useAlert({
    description: 'This will delete this part of the document. Are you sure?',
    confirmLabel: 'Yes, delete',
    cancelLabel: "No, don't delete.",
    confirm: confirm,
  })

  return (
    <>
      <Alert />
      {value ? (
        <details
          open={open}
          className="mb-1 border border-l-4 border-gray-400 rounded"
        >
          <summary className="px-2 py-1">
            <h2
              id={dataPath}
              title={objectName + ': ' + description}
              className={
                'inline font-bold ' +
                (localValidationErrors.length ? ' text-red-500' : '')
              }
            >
              {label}
              {deletable ? (
                <button
                  type="button"
                  className={'ml-4 text-gray-400 hover:text-gray-300'}
                  onClick={show}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              ) : null}
            </h2>
          </summary>
          <div className="p-2">
            <ContainerErrors validationErrors={localValidationErrors} />
            {isValid(value) &&
              children({
                value,
                validationErrors: validationErrorsForChildren,
              })}
          </div>
        </details>
      ) : defaultValue ? (
        <div className="mb-1">
          <DefaultButton
            onClick={() => {
              const update = {}
              set(update, parsedDataPath.concat(['$set']), defaultValue())
              onUpdate(update)
            }}
          >
            {"Add '" + label + "'"}
          </DefaultButton>
        </div>
      ) : null}
    </>
  )
}
