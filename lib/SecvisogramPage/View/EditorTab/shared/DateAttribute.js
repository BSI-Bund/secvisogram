import React from 'react'
import Attribute from './Attribute'
import DatePicker from './DatePicker'

/**
 * @param {{
 *  label: string
 *  description: string
 *  required?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  attributeName: string
 *  value: string
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function DateAttribute({
  label,
  description,
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
      <div className="max-w-md flex items-center justify-center">
        <div className="w-full">
          <DatePicker
            value={value}
            required={required}
            onChange={(/** @type {string} */ newValue) => {
              onUpdate({ $set: newValue })
            }}
          />
        </div>
      </div>
      {children}
    </Attribute>
  )
}
