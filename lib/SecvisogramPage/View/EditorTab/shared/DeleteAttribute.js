import React from 'react'

/**
   * @param {{
      doDelete({}): void
    }} props
   */
export default function DeleteAttribute({ doDelete }) {
  return (
    <button
      className={'ml-2 text-white py-2 px-3 bg-red-500 hover:bg-red-200'}
      onClick={doDelete}
    >
      -
    </button>
  )
}
