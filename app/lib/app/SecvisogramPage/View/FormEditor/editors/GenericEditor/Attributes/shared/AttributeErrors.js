import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { getErrorTextColor } from '../../../GenericEditor.js'

/**
 * @param {object} props
 * @param {import('../../../../../../shared/types').ValidationError[]} props.validationErrors
 * @param {number} [props.maxWidth]
 */
export default function AttributeErrors({ validationErrors, maxWidth }) {
  return validationErrors.length ? (
    <div className="m-1">
      <ul className="block list-disc list-inside">
        {validationErrors.map((e, i) => {
          const msg = e.message
            ? e.message.charAt(0).toUpperCase() + e.message.slice(1)
            : 'error message'

          return (
            <li key={`${i}-${e.message}`} className="flex">
              <div className="grid place-items-center px-2">
                <FontAwesomeIcon
                  icon={faCircle}
                  className={getErrorTextColor([e])}
                  size="xs"
                />
              </div>
              <span
                className="inline-block"
                style={{
                  maxWidth,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                title={msg}
              >
                {msg}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  ) : null
}
