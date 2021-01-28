import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

/**
   * @param {{
      doDelete({}): void
    }} props
   */
export default function Delete({ doDelete }) {
  return (
    <button
      type="button"
      className={'ml-4 hover:text-gray-400'}
      onClick={doDelete}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  )
}
