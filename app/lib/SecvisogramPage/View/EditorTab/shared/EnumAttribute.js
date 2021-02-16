import '@reach/combobox/styles.css'
import React from 'react'
import Attribute from './Attribute'
import Delete from './shared/Delete'

/**
 * @param {{
 *  label: string
 *  description: string
 *  options: string[]
 *  defaultValue?(): string
 *  required?: boolean
 *  deletable?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate({}): void
 * }} props
 */
export default function EnumAttribute({
  options,
  required = true,
  deletable,
  ...props
}) {
  const listId = `${props.dataPath}-list`
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex">
          <div className="w-full">
            <input
              className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
              type="text"
              list={listId}
              value={/** @type {string} */ (props.value)}
              onChange={(e) => {
                onChange(e.target.value)
              }}
              required={required}
            />
            <datalist id={listId}>
              {options.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
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
