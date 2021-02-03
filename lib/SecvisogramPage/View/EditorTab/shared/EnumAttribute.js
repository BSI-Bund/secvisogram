import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox'
import '@reach/combobox/styles.css'
import React from 'react'
import Attribute from './Attribute'
import Delete from './Delete'

/**
 * @param {{
 *  label: string
 *  description: string
 *  options: string[]
 *  required?: boolean
 *  deletable?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: string
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function EnumAttribute({
  options,
  required,
  deletable,
  children,
  ...props
}) {
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex">
          <div className="w-full">
            <Combobox
              className="w-full"
              openOnFocus
              onSelect={(item) => {
                onChange(item)
              }}
            >
              <label className="block w-full flex">
                <ComboboxInput
                  value={props.value}
                  className="border p-2 w-full shadow-inner rounded-l"
                  selectOnClick
                  required={required}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                />
                <div className="flex items-center justify-center text-xs bg-white border w-8 rounded-r hover:bg-gray-200 cursor-pointer">
                  <FontAwesomeIcon icon={faChevronDown} />
                </div>
              </label>
              <ComboboxPopover>
                <ComboboxList persistSelection>
                  {options.map((option, index) => (
                    <ComboboxOption key={index} value={option} />
                  ))}
                </ComboboxList>
              </ComboboxPopover>
            </Combobox>
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
