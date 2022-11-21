import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  options: string[]
 *  freeSolo: boolean
 *  instancePath: string[]
 *  value: unknown
 * }} props
 */
export default function EnumAttribute({ options, freeSolo, value, ...props }) {
  const { updateDoc } = React.useContext(DocumentEditorContext)
  const [inputValue, setInputValue] = React.useState(value)
  return (
    <Attribute {...props}>
      <div className="max-w-md flex">
        <div className="w-full">
          <Autocomplete
            disableClearable
            options={options}
            freeSolo={freeSolo}
            value={value}
            onChange={(event, newValue) =>
              updateDoc(props.instancePath, /** @type {string} */ (newValue))
            }
            inputValue={/** @type {string} */ (inputValue)}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue ?? '')
            }}
            onBlur={() => {
              if (freeSolo)
                updateDoc(
                  props.instancePath,
                  /** @type {string} */ (inputValue)
                )
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
