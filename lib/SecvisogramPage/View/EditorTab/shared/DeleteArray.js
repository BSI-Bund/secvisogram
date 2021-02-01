import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

/**
   * @param {{
      array?: Array<any>
      doDelete({}): void
    }} props
   */
export default function DeleteArray({ doDelete }) {
  return (
    <button
      type="button"
      className={'ml-4 text-gray-500 hover:text-gray-400'}
      onClick={doDelete}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  )
}
