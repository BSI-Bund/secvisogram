import React from 'react'
import Attribute from './Attribute'
import DatePicker from './DatePicker'
import Delete from './Delete'

/**
 * @param {{
 *  label: string
 *  description: string
 *  defaultValue?(): string
 *  readOnly?: boolean
 *  deletable?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function DateAttribute({
  required = true,
  deletable,
  readOnly = false,
  children,
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
                onChange(newValue)
              }}
              readOnly={readOnly}
            />
          </div>
          {deletable ? (
            <Delete
              doDelete={() => {
                onDelete()
              }}
            />
          ) : (
            children
          )}
        </div>
      )}
    </Attribute>
  )
}
