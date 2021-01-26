import React from 'react'
import DatePicker from './DatePicker'
import Input from './Input'

/**
   * @param {{
      label: string
      description: string
      required?: boolean
      value: string
      onUpdate({}): void
      children?: React.ReactNode;
    }} props
   */
export default function DateAttribute({
  label,
  description,
  required,
  value,
  onUpdate,
  children,
}) {
  return (
    <section className="my-2">
      <h1 title={description}>{label}</h1>
      <div className="max-w-md flex items-center justify-center">
        <Input value={value}>
          {({ message, ...props }) => (
            <div className="w-full">
              <DatePicker
                {...props}
                required={required}
                onChange={(/** @type {string} */ value) => {
                  onUpdate({ $set: value })
                }}
              />
              <div className="text-sm text-red-500">{message}</div>
            </div>
          )}
        </Input>
      </div>
      {children}
    </section>
  )
}
