import React from 'react'
import Input from './Input'

/**
   * @param {{
      label: string
      description: string
      placeholder?: string
      pattern?: string
      required?: boolean
      value: string
      onUpdate({}): void
      children?: React.ReactNode;
    }} props
   */
export default function TextAttribute({
  label,
  description,
  placeholder,
  pattern,
  required,
  value,
  onUpdate,
  children,
}) {
  return (
    <section>
      <h1 title={description}>{label}</h1>
      <div className="max-w-md flex items-baseline justify-center">
        <Input value={value}>
          {({ message, ...props }) => (
            <div className="w-full">
              <input
                {...props}
                className="border p-2 w-full"
                type="text"
                placeholder={placeholder}
                pattern={pattern}
                required={required}
                onChange={(e) => {
                  onUpdate({ $set: e.target.value })
                }}
              />
              <div>{message}</div>
            </div>
          )}
        </Input>
        {children}
      </div>
    </section>
  )
}
