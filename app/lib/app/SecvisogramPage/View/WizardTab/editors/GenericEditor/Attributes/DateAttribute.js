import React from 'react'
import DatePicker from './DateAttribute/DatePicker.js'
import Attribute from './shared/Attribute.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  readOnly?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../../../shared/types').ValidationError[]
 *  instancePath: string[]
 *  value: unknown
 *  updateDoc(instancePath: string[], value: string): void
 * }} props
 */
export default function DateAttribute({
  required = true,
  readOnly = false,
  updateDoc,
  value,
  ...props
}) {
  return (
    <Attribute {...props}>
      <div className="max-w-md flex items-center justify-center">
        <div className="w-full">
          <DatePicker
            value={/** @type {string} */ (value)}
            required={required}
            onChange={(/** @type {string} */ newValue) =>
              updateDoc(props.instancePath, newValue)
            }
            readOnly={readOnly}
          />
        </div>
      </div>
    </Attribute>
  )
}
