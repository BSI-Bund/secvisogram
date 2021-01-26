import React from 'react'

/**
   * @param {{
      doDelete({}): void
    }} props
   */
export default function DeleteAttribute({ doDelete }) {
  return (
    <button
      type="button"
      className={
        'ml-2 text-white h-6 w-6 rounded-full bg-gray-500 hover:bg-gray-400'
      }
      onClick={doDelete}
    >
      &times;
    </button>
  )
}
