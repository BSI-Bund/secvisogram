import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { compile, parse } from 'json-pointer'
import React from 'react'
import { useAlert } from '../../../shared/Alert.js'
import DefaultButton from '../../../shared/DefaultButton.js'
import ContainerErrors from '../ContainerErrors.js'

const numberRegExp = /^(0|[1-9][0-9]*)$/

/**
 * Abstracts the base functionality for all containers in the form editor.
 * It uses the data path to filter the associated validation errors.
 * Provides the functionality to add or remove itself.
 *
 * @param {{
 *   value: unknown
 *   label: string
 *   description: string
 *   deletable?: boolean
 *   validationErrors: import('../../../../shared/types').ValidationError[]
 *   instancePath: string
 *   collapsible?: boolean
 *   defaultValue?(): V
 *   isValid(v: unknown): v is V
 *   onUpdate(instancePath: string, update: {}): void
 *   onDelete?(): void
 *   children(props: { value: V; validationErrors: import('../../../../shared/types').ValidationError[] }): React.ReactNode;
 * }} props
 * @template V
 */
export default function Container({
  value,
  label,
  description,
  deletable = true,
  validationErrors,
  instancePath,
  collapsible = true,
  defaultValue,
  isValid,
  onUpdate,
  onDelete,
  children,
}) {
  const validationErrorsForChildren = validationErrors.filter((e) =>
    e.instancePath.startsWith(instancePath + '/')
  )
  const localValidationErrors = validationErrors.filter(
    (e) => e.instancePath === instancePath
  )
  const parsedInstancePath = React.useMemo(
    () => parse(instancePath),
    [instancePath]
  )
  const objectName = React.useMemo(
    () => parsedInstancePath.slice().pop() ?? '',
    [parsedInstancePath]
  )
  const isInArray = React.useMemo(
    () => Boolean(objectName.match(numberRegExp)),
    [objectName]
  )

  const doDelete = () => {
    const operation = !isInArray
      ? { $unset: [objectName] }
      : { $splice: [[Number(objectName), 1]] }
    onUpdate(compile(parsedInstancePath.slice(0, -1)), operation)
    onDelete?.()
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
          open={true}
          className={
            'mb-2 border border-l-4 border-gray-400 rounded' +
            (collapsible ? ' js-collapsible' : '')
          }
        >
          <summary className="px-2 py-1">
            <h2
              id={instancePath}
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
        <div className="mb-2">
          <DefaultButton
            onClick={() => {
              onUpdate(instancePath, { $set: defaultValue() })
            }}
          >
            {"Add '" + label + "'"}
          </DefaultButton>
        </div>
      ) : null}
    </>
  )
}
