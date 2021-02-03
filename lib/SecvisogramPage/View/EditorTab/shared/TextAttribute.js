import React from 'react'
import Attribute from './Attribute'
import Delete from './Delete'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'minLength'> & {
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
 * }} props
 */
export default function TextAttribute({
  placeholder,
  pattern,
  type = 'text',
  minLength,
  required,
  ...props
}) {
  return (
    <Attribute {...props} onDocUpdate={props.onUpdate}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex items-baseline justify-center">
          <div className="w-full">
            <input
              value={props.value}
              className="border p-2 w-full shadow-inner rounded"
              type={type}
              placeholder={placeholder}
              pattern={pattern}
              minLength={minLength}
              required={Boolean(minLength)}
              onChange={(e) => {
                onChange(e.target.value)
              }}
            />
          </div>
          {!required ? (
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
