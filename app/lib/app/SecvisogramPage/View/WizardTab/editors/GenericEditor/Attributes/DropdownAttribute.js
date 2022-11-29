import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import Attribute from './shared/Attribute.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  options: string[]
 *  isEnum: boolean
 *  instancePath: string[]
 *  value: unknown
 * }} props
 */
export default function DropdownAttribute({
  options,
  isEnum,
  value,
  ...props
}) {
  const { updateDoc, pruneEmpty } = React.useContext(DocumentEditorContext)
  const [inputValue, setInputValue] = React.useState(value)
  return (
    <Attribute {...props}>
      <div className="max-w-md flex">
        <div className="w-full">
          <Autocomplete
            disableClearable
            options={options}
            freeSolo={!isEnum}
            value={value}
            onChange={(event, newValue) =>
              updateDoc(props.instancePath, /** @type {string} */ (newValue))
            }
            inputValue={/** @type {string} */ (inputValue)}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue ?? '')
            }}
            onBlur={() => {
              if (!isEnum)
                updateDoc(
                  props.instancePath,
                  /** @type {string} */ (inputValue)
                )
              if (!inputValue) {
                pruneEmpty()
              }
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
