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
 *  defaultValue?(): string
 *  required?: boolean
 *  deletable?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: unknown
 *  onUpdate({}): void
 * }} props
 */
export default function EnumAttribute({
  options,
  required = true,
  deletable,
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
                  value={/** @type {string} */ (props.value)}
                  className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded-l"
                  selectOnClick
                  required={required}
                  onChange={(e) => {
                    onChange(e.target.value)
                  }}
                />
                <div className="flex items-center justify-center w-8 text-xs border border-gray-400 rounded-r bg-white hover:bg-gray-200 cursor-pointer">
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
          ) : null}
        </div>
      )}
    </Attribute>
  )
}
