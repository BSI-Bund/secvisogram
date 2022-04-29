import React from 'react'
import Attribute from './shared/Attribute.js'
import Delete from './shared/Delete.js'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'min' | 'max' | 'step'> & {
 *  label: string
 *  description: string
 *  placeholder?: string
 *  pattern?: string
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
export default function NumberAttribute({
  placeholder,
  pattern,
  required = true,
  min,
  max,
  readOnly = false,
  step,
  deletable,
  ...props
}) {
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex items-baseline justify-center">
          <div className="w-full">
            <input
              value={String(props.value)}
              className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
              type="number"
              placeholder={placeholder}
              pattern={pattern}
              min={min}
              max={max}
              required={required}
              step={step}
              readOnly={readOnly}
              onChange={(e) => {
                const float = parseFloat(e.target.value)
                onChange(Number.isNaN(float) ? '' : float, String(props.value))
              }}
            />
          </div>
          {deletable ? (
            <Delete
              doDelete={() => {
                onDelete(String(props.value))
              }}
            />
          ) : null}
        </div>
      )}
    </Attribute>
  )
}
