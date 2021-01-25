import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import React from 'react'
import Input from './Input'

/**
   * @param {{
      label: string
      description: string
      required?: boolean
      value: string
      options: string[]
      onUpdate({}): void
      children?: React.ReactNode;
    }} props
   */
export default function EnumAttribute({
  label,
  description,
  required,
  value,
  options,
  onUpdate,
  children,
}) {
  return (
    <section>
      <h1 title={description}>{label}</h1>
      <div className="max-w-md flex items-center justify-center">
        <Input value={value}>
          {({ message, ...props }) => (
            <div className="w-full">
              <Combobox
                className="w-full"
                openOnFocus
                onSelect={(item) => {
                  onUpdate({ $set: item })
                }}
              >
                <ComboboxInput
                  {...props}
                  className="border p-2 w-full"
                  selectOnClick
                  required={required}
                  onChange={(e) => {
                    onUpdate({ $set: e.target.value })
                  }}
                />
                <ComboboxPopover>
                  <ComboboxList persistSelection>
                    {options.map((option, index) => (
                      <ComboboxOption key={index} value={option} />
                    ))}
                  </ComboboxList>
                </ComboboxPopover>
              </Combobox>
              <div>{message}</div>
            </div>
          )}
        </Input>
        {children}
      </div>
    </section>
  )
}
