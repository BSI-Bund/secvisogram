import React from 'react'
import DatePicker from './DateAttribute/DatePicker.js'
import Attribute from './shared/Attribute.js'
import Delete from './shared/Delete.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  defaultValue?(): string
 *  readOnly?: boolean
 *  deletable?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../shared/types').ValidationError[]
 *  instancePath: string
 *  value: unknown
 *  onUpdate(instancePath: string, update: {}): void
 * }} props
 */
export default function DateAttribute({
  required = true,
  deletable,
  readOnly = false,
  ...props
}) {
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex items-center justify-center">
          <div className="w-full">
            <DatePicker
              value={/** @type {string} */ (props.value)}
              required={required}
              onChange={(/** @type {string} */ newValue) => {
                onChange(newValue, props.value)
              }}
              readOnly={readOnly}
            />
          </div>
          {deletable ? (
            <Delete
              doDelete={() => {
                onDelete(props.value)
              }}
            />
          ) : null}
        </div>
      )}
    </Attribute>
  )
}
