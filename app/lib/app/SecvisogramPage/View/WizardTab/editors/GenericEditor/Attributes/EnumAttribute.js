import {TextField} from '@material-ui/core'
import {Autocomplete} from '@material-ui/lab'
import React from 'react'
import Attribute from './shared/Attribute.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  options: string[]
 *  validationErrors: import('../../../../../shared/types').ValidationError[]
 *  instancePath: string[]
 *  value: unknown
 *  updateDoc(instancePath: string[], value: string): void
 * }} props
 */
export default function EnumAttribute({ options, updateDoc, value, ...props }) {
  const [inputValue, setInputValue] = React.useState(value)
  return (
    <Attribute {...props}>
      <div className="max-w-md flex">
        <div className="w-full">
          <Autocomplete
            disableClearable
            options={options}
            value={value}
            onChange={(event, newValue) =>
              updateDoc(props.instancePath, /** @type {string} */ (newValue))
            }
            inputValue={/** @type {string} */ (inputValue)}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue ?? '')
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!value}
                margin="dense"
                variant="outlined"
              />
            )}
          />
        </div>
      </div>
    </Attribute>
  )
}
