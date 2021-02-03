import React from 'react'
import Attribute from './Attribute'
import Delete from './Delete'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'minLength'> & {
 *  label: string
 *  description: string
 *  rows?: number
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
export default function TextAreaAttribute({
  rows = 2,
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
              required={Boolean(minLength)}
              onChange={(e) => {
                onChange(e.target.value)
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
