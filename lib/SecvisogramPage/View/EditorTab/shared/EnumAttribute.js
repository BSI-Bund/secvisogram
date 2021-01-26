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
    <section className="my-2">
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
                  ref={
                    /** @type {React.MutableRefObject<HTMLInputElement>} */ (props.ref)
                  }
                  className="border p-2 w-full shadow-inner rounded"
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
              <div className="text-sm text-red-500">{message}</div>
            </div>
          )}
        </Input>
        {children}
      </div>
    </section>
  )
}
