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

/**
 * @param {{
 *  label: string
 *  description: string
 *  options: string[]
 *  required?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  attributeName: string
 *  value: string
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function EnumAttribute({
  value,
  label,
  description,
  options,
  required,
  validationErrors,
  dataPath,
  attributeName,
  onUpdate,
  children,
}) {
  return (
    <Attribute
      label={label}
      description={description}
      validationErrors={validationErrors}
      dataPath={dataPath}
      attributeName={attributeName}
      onUpdate={onUpdate}
      value={value}
    >
      <div className="max-w-md">
        <div className="w-full">
          <Combobox
            className="w-full"
            openOnFocus
            onSelect={(item) => {
              onUpdate({ $set: item })
            }}
          >
            <label className="block w-full flex">
              <ComboboxInput
                value={value}
                className="border p-2 w-full shadow-inner rounded-l"
                selectOnClick
                required={required}
                onChange={(e) => {
                  onUpdate({ $set: e.target.value })
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
        {children}
      </div>
    </Attribute>
  )
}
