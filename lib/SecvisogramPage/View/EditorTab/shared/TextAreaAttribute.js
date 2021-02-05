import React from 'react'
import Attribute from './Attribute'
import Delete from './Delete'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'minLength'> & {
 *  label: string
 *  description: string
 *  placeholder?: string
 *  rows?: number
 *  defaultValue?(): string
 *  deletable?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate({}): void
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
              className="border p-2 w-full shadow-inner rounded"
              placeholder={placeholder}
              minLength={minLength}
              required={required}
              onChange={(e) => {
                onChange(e.target.value)
              }}
            />
          </div>
          {deletable ? (
            <Delete
              doDelete={() => {
                onDelete()
              }}
            />
          ) : null}
        </div>
      )}
    </Attribute>
  )
}
