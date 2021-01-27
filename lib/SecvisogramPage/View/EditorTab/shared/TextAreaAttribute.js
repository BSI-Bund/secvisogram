import React from 'react'
import Attribute from './Attribute'

/**
 * @param {{
 *  label: string
 *  description: string
 *  rows?: number
 *  required?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  attributeName: string
 *  value: string
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function TextAreaAttribute({
  label,
  description,
  rows = 2,
  required,
  validationErrors,
  dataPath,
  attributeName,
  value,
  onUpdate,
  children,
}) {
  return (
    <Attribute
      label={label}
      description={description}
      validationErrors={validationErrors}
      dataPath={dataPath}
      attributeName={attributeName}
      onUpdate={onUpdate}
      value={value}
    >
      <div className="max-w-md flex items-baseline justify-center">
        <div className="w-full">
          <textarea
            value={value}
            rows={rows}
            className="border p-2 w-full shadow-inner rounded"
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
