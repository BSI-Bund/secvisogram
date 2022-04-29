import React from 'react'
import Attribute from './shared/Attribute.js'
import Delete from './shared/Delete.js'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'minLength' | 'onBlur'> & {
 *  label: string
 *  description: string
 *  placeholder?: string
 *  pattern?: string
 *  type?: string
 *  defaultValue?(): string
 *  readOnly?: boolean
 *  deletable?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../shared/types').ValidationError[]
 *  instancePath: string
 *  value: unknown
 *  canBeAdded?: boolean
 *  onUpdate(instancePath: string, update: {}): void
 * }} props
 */
export default function TextAttribute({
  placeholder,
  pattern,
  type = 'text',
  minLength,
  required = true,
  readOnly = false,
  deletable,
  onBlur,
  ...props
}) {
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex items-baseline justify-center">
          <div className="w-full">
            <input
              value={/** @type {string} */ (props.value)}
              className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
              type={type}
              placeholder={placeholder}
              pattern={pattern}
              minLength={minLength}
              required={required}
              readOnly={readOnly}
              onChange={(e) => {
                onChange(e.target.value, props.value)
              }}
              onBlur={onBlur}
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
