import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@reach/dialog/styles.css'
import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import Alert from '../../../shared/Alert'
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
  deletable = true,
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

  const [showDeleteAlert, setShowDeleteAlert] = React.useState(false)
  const openDeleteDialog = () => setShowDeleteAlert(true)
  const closeDeleteDialog = () => setShowDeleteAlert(false)
  const confirmDeleteDialog = () => {
    doDelete()
    setShowDeleteAlert(false)
  }

  return (
    <>
      {showDeleteAlert && (
        <Alert
          description="This will delete this part of the document. Are you sure?"
          yesLabel="Yes, delete"
          noLabel="No, don't delete."
          closeDeleteDialog={closeDeleteDialog}
          confirmDeleteDialog={confirmDeleteDialog}
        />
      )}
      {value ? (
        <div className="border border-white">
          <h2
            title={objectName + ': ' + description}
            className={
              'font-bold pb-2 pt-2 sticky -top-3 bottom-2 left-0 w-full bg-gray-100 pl-4 border shadow' +
              (localValidationErrors.length ? ' text-red-500' : '')
            }
          >
            {label}
            {deletable ? (
              <button
                type="button"
                className={'ml-4 hover:text-gray-400'}
                onClick={openDeleteDialog}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            ) : null}
          </h2>
          <div className="border py-2 px-4 mb-1">
            <ContainerErrors validationErrors={localValidationErrors} />
            {isValid(value) && children({ value })}
          </div>
        </div>
      ) : (
        <div className="mb-1">
          <DefaultButton onClick={doAdd}>{"Add '" + label + "'"}</DefaultButton>
        </div>
      )}
    </>
  )
}
