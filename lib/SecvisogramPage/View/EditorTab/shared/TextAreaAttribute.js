import React from 'react'
import Attribute from './Attribute'
import Delete from './Delete'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'minLength'> & {
 *  label: string
 *  description: string
 *  rows?: number
 *  defaultValue?: string
 *  deletable?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function TextAreaAttribute({
  rows = 2,
  minLength,
  required = true,
  deletable,
  children,
  ...props
}) {
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex items-center justify-center">
          <div className="w-full">
            <textarea
              value={/** @type {string} */ (props.value)}
              rows={rows}
              className="border p-2 w-full shadow-inner rounded"
              minLength={minLength}
              required={required}
              onChange={(e) => {
                onChange(e.target.value)
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
