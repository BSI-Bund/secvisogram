import React from 'react'
import Attribute from './Attribute'

/**
 * @param {{
 *  label: string
 *  description: string
 *  placeholder?: string
 *  pattern?: string
 *  type?: string
 *  required?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: string
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function TextAttribute({
  label,
  description,
  placeholder,
  pattern,
  type = 'text',
  required,
  validationErrors,
  dataPath,
  value,
  onUpdate,
  children,
}) {
  return (
    <Attribute
      label={label}
      description={description}
      dataPath={dataPath}
      validationErrors={validationErrors}
      onUpdate={onUpdate}
      value={value}
    >
      <div className="max-w-md flex items-baseline justify-center">
        <div className="w-full">
          <input
            value={value}
            className="border p-2 w-full shadow-inner rounded"
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            required={required}
            onChange={(e) => {
              onUpdate({ $set: e.target.value })
            }}
          />
        </div>
        {children}
      </div>
    </Attribute>
  )
}
