import React from 'react'
import Attribute from './Attribute'
import DatePicker from './DatePicker'
import Delete from './Delete'

/**
 * @param {{
 *  label: string
 *  description: string
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
export default function DateAttribute({ required, children, ...props }) {
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex items-center justify-center">
          <div className="w-full">
            <DatePicker
              value={props.value}
              required={true}
              onChange={(/** @type {string} */ newValue) => {
                onChange(newValue)
              }}
            />
          </div>
          {props.onDocUpdate && !required ? (
            <Delete
              doDelete={() => {
                onDelete()
              }}
            />
          ) : (
            children
          )}
        </div>
      )}
    </Attribute>
  )
}
