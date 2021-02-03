import { parse } from 'json-pointer'
import { set } from 'lodash'
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
 *  attributeName?: string
 *  value: string
 *  onUpdate?({}): void
 *  onDocUpdate?({}): void
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
  children,
  ...props
}) {
  const parsedDataPath = React.useMemo(() => parse(dataPath), [dataPath])
  const attributeName = React.useMemo(
    () => parsedDataPath.slice().pop() ?? '',
    [parsedDataPath]
  )

  /**
   * @param {{}} data
   */
  const onUpdate = (data) => {
    if (props.onDocUpdate) {
      const update = {}
      set(update, parsedDataPath, data)
      props.onDocUpdate(update)
    } else {
      props.onUpdate?.(data)
    }
  }

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
