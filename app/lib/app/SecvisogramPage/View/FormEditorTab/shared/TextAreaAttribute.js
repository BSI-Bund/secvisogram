import React from 'react'
import Attribute from './shared/Attribute.js'
import Delete from './shared/Delete.js'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'minLength'> & {
 *  label: string
 *  description: string
 *  placeholder?: string
 *  rows?: number
 *  defaultValue?(): string
 *  deletable?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../shared/types').ValidationError[]
 *  instancePath: string
 *  value: unknown
 *  onUpdate(instancePath: string, update: {}): void
 * }} props
 */
export default function TextAreaAttribute({
  rows = 2,
  minLength,
  placeholder,
  required = true,
  deletable,
  ...props
}) {
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex items-center justify-center">
          <div className="w-full">
            <textarea
              value={/** @type {string} */ (props.value)}
              rows={rows}
              className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
              placeholder={placeholder}
              minLength={minLength}
              required={required}
              onChange={(e) => {
                onChange(e.target.value, props.value)
              }}
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
