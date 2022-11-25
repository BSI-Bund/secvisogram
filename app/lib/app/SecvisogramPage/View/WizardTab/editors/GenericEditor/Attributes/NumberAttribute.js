import React from 'react'
import Attribute from './shared/Attribute.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  placeholder?: string
 *  pattern?: string
 *  min: number
 *  max: number
 *  step: number
 *  readOnly?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../../../shared/types').ValidationError[]
 *  instancePath: string[]
 *  value: unknown
 *  updateDoc(instancePath: string[], value: string): void
 * }} props
 */
export default function NumberAttribute({
  placeholder,
  pattern,
  min,
  max,
  step,
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
            type="number"
            placeholder={placeholder}
            pattern={pattern}
            min={min}
            max={max}
            step={step}
            required={required}
            readOnly={readOnly}
            onChange={(e) => {
              const float = parseFloat(e.target.value)
              updateDoc(
                props.instancePath,
                Number.isNaN(float) ? '' : float.toString()
              )
            }}
          />
        </div>
      </div>
    </Attribute>
  )
}
