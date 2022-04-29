import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import React from 'react'
import Attribute from './shared/Attribute.js'
import Delete from './shared/Delete.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  options: string[]
 *  defaultValue?(): string
 *  required?: boolean
 *  deletable?: boolean
 *  validationErrors: import('../../../shared/types').ValidationError[]
 *  instancePath: string
 *  value: unknown
 *  freeSolo?: boolean
 *  onUpdate(instancePath: string, update: {}): void
 * }} props
 */
export default function EnumAttribute({
  options,
  deletable,
  freeSolo,
  ...props
}) {
  const [inputValue, setInputValue] = React.useState(props.value)
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex">
          <div className="w-full">
            <Autocomplete
              disableClearable
              options={options}
              value={props.value}
              freeSolo={freeSolo}
              onChange={(event, newValue) => {
                onChange(newValue ?? '', props.value)
              }}
              inputValue={/** @type {string} */ (inputValue)}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue ?? '')
              }}
              onBlur={() => {
                if (freeSolo) onChange(inputValue, props.value)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!props.value}
                  margin="dense"
                  variant="outlined"
                />
              )}
            />
          </div>
          {deletable ? (
            <Delete
              doDelete={() => {
                onDelete(props.value)
              }}
            />
          ) : null}
        </div>
      )}
    </Attribute>
  )
}
