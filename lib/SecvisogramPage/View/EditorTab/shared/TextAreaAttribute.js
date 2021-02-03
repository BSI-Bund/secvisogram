import React from 'react'
import Attribute from './Attribute'
import Delete from './Delete'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'minLength'> & {
 *  label: string
 *  description: string
 *  rows?: number
 *  deletable?: boolean
 *  required?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: string
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function TextAreaAttribute({
  rows = 2,
  deletable,
  required,
  minLength,
  children,
  ...props
}) {
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex items-center justify-center">
          <div className="w-full">
            <textarea
              value={props.value}
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
