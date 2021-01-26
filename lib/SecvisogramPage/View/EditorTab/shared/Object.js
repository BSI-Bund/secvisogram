import React from 'react'

/**
 * @param {{
    object?: object
    label: string
    description: string
    dataPath: string
    validationErrors: import('../../../../shared/validationTypes').ValidationError[]
    doAdd({}): void
    doDelete({}): void
    children?: React.ReactNode;
  }} props
 */
export default function Object({
  object,
  label,
  description,
  dataPath,
  doAdd,
  doDelete,
  children,
  ...props
}) {
  const validationErrors = props.validationErrors.filter(
    (e) => e.dataPath === dataPath
  )
  return object ? (
    <div
      className={
        validationErrors.length
          ? 'border border-red-500'
          : 'border border-white'
      }
    >
      <h1
        title={description}
        className="font-bold pb-2 pt-2 sticky top-0 bottom-2 left-0 w-full bg-gray-100 pl-4 border shadow"
      >
        {label}
        <button
          type="button"
          className={
            'ml-2 text-white h-6 w-6 rounded-full bg-gray-500 hover:bg-gray-400'
          }
          onClick={doDelete}
        >
          &times;
        </button>
      </h1>
      <div className="border p-4 mb-1">{children}</div>
    </div>
  ) : (
    <div className="mb-1">
      <button
        type="button"
        className="border py-2 px-3 hover:bg-gray-200"
        onClick={doAdd}
      >
        {'Create ' + label}
      </button>
    </div>
  )
}
