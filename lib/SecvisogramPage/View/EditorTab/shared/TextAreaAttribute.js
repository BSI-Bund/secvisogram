import React from 'react'
import Input from './Input'

/**
   * @param {{
      label: string
      description: string
      rows?: number
      required?: boolean
      value: string
      onUpdate({}): void
      children?: React.ReactNode;
    }} props
   */
export default function TextAreaAttribute({
  label,
  description,
  rows = 2,
  required,
  value,
  onUpdate,
  children,
}) {
  return (
    <section className="mb-2">
      <h1 title={description}>{label}</h1>
      <div className="max-w-md flex items-baseline justify-center">
        <Input value={value}>
          {({ message, ref, ...props }) => (
            <div className="w-full">
              <textarea
                {...props}
                ref={
                  /** @type {React.MutableRefObject<HTMLTextAreaElement>} */ (ref)
                }
                rows={rows}
                className="border p-2 w-full shadow-inner rounded"
                required={required}
                onChange={(e) => {
                  onUpdate({ $set: e.target.value })
                }}
              />
              <div className="text-sm text-red-500">{message}</div>
            </div>
          )}
        </Input>
        {children}
      </div>
    </section>
  )
}
