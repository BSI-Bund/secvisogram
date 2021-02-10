import React from 'react'
import Attribute from './Attribute'
import Delete from './Delete'

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
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  canBeAdded?: boolean
 *  onUpdate({}): void
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
              className="border p-2 w-full shadow-inner rounded"
              type={type}
              placeholder={placeholder}
              pattern={pattern}
              minLength={minLength}
              required={required}
              readOnly={readOnly}
              onChange={(e) => {
                onChange(e.target.value)
              }}
              onBlur={onBlur}
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
