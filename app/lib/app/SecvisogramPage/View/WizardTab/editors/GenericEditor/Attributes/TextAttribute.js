import React from 'react'
import Attribute from './shared/Attribute.js'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'type'> &{
 *  label: string
 *  description: string
 *  placeholder?: string
 *  pattern?: string
 *  minLength: number
 *  readOnly?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../../../shared/types').ValidationError[]
 *  instancePath: string[]
 *  value: unknown
 *  updateDoc(instancePath: string[], value: string): void
 * }} props
 */
export default function TextAttribute({
  type = 'text',
  placeholder,
  pattern,
  minLength,
  required = false,
  readOnly = false,
  updateDoc,
  value,
  ...props
}) {
  return (
    <Attribute {...props}>
      <div className="max-w-md flex items-baseline justify-center">
        <div className="w-full">
          <input
            className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
            value={/** @type {string} */ (value)}
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            minLength={minLength}
            required={required}
            readOnly={readOnly}
            onChange={(e) => updateDoc(props.instancePath, e.target.value)}
          />
        </div>
      </div>
    </Attribute>
  )
}
