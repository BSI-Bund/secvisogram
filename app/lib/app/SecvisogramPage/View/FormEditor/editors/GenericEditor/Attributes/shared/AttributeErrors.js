import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { getErrorTextColor } from '../../../GenericEditor.js'

/**
 * @param {{
    validationErrors: import('../../../../../../shared/types').ValidationError[]
  }} props
 */
export default function AttributeErrors({ validationErrors }) {
  return validationErrors.length ? (
    <div className="m-1">
      <ul className="block list-disc list-inside">
        {validationErrors.map((e, i) => (
          <li key={`${i}-${e.message}`} className="flex">
            <div className="grid place-items-center px-2">
              <FontAwesomeIcon
                icon={faCircle}
                className={getErrorTextColor([e])}
                size="xs"
              />
            </div>
            {e.message
              ? e.message.charAt(0).toUpperCase() + e.message.slice(1)
              : 'error message'}
          </li>
        ))}
      </ul>
    </div>
  ) : null
}
