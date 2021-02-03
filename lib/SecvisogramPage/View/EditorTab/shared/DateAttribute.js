import React from 'react'
import Attribute from './Attribute'
import DatePicker from './DatePicker'
import Delete from './Delete'

/**
 * @param {{
 *  label: string
 *  description: string
 *  deletable?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  attributeName?: string
 *  value: string
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function DateAttribute({ deletable, children, ...props }) {
  return (
    <Attribute {...props} onDocUpdate={props.onUpdate}>
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
          {deletable ? (
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
