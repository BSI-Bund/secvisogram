import React from 'react'

/**
   * @param {{
      array: Array<any>
      doDelete({}): void
    }} props
   */
export default function DeleteArray({ array, doDelete }) {
  return (
    <button
      type="button"
      className={
        'ml-2 text-white h-6 w-6 rounded-full' +
        (array.length === 1 ? ' bg-gray-200' : ' bg-gray-500 hover:bg-gray-400')
      }
      disabled={array.length === 1}
      onClick={doDelete}
    >
      &times;
    </button>
  )
}
