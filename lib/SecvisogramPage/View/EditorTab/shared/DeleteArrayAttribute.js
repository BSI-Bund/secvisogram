import React from 'react'

/**
   * @param {{
      array: Array<any>
      doDelete({}): void
    }} props
   */
export default function DeleteArrayAttribute({ array, doDelete }) {
  return (
    <button
      className={
        'ml-2 text-white py-2 px-3 ' +
        (array.length === 1 ? 'bg-red-200' : 'bg-red-500 hover:bg-red-200')
      }
      disabled={array.length === 1}
      onClick={doDelete}
    >
      -
    </button>
  )
}
