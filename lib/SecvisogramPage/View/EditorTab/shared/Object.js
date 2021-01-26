import React from 'react'

/**
 * @param {{
    object?: object
    label: string
    description: string
    doAdd({}): void
    doDelete({}): void
    children?: React.ReactNode;
  }} props
 */
export default function Object({
  object,
  label,
  description,
  doAdd,
  doDelete,
  children,
}) {
  return object ? (
    <>
      <h1 title={description} className="font-bold pb-1">
        <button
          type="button"
          className={'mr-2 text-white py-2 px-3 bg-red-500 hover:bg-red-200'}
          onClick={doDelete}
        >
          -
        </button>
        {label}
      </h1>
      <div className="border p-2 mb-1">{children}</div>
    </>
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
