import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import '@reach/combobox/styles.css'
import React from 'react'
import Attribute from './shared/Attribute'
import Delete from './shared/Delete'

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
 *  onUpdate(dataPath: string, update: {}): void
 * }} props
 */
export default function EnumAttribute({ options, deletable, ...props }) {
  const [inputValue, setInputValue] = React.useState(props.value)
  return (
    <Attribute {...props}>
      {({ onChange, onDelete }) => (
        <div className="max-w-md flex">
          <div className="w-full">
            <Autocomplete
              freeSolo
              disableClearable
              options={options}
              value={props.value}
              onChange={(event, newValue) => {
                onChange(newValue ?? '', props.value)
              }}
              inputValue={/** @type {string} */ (inputValue)}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue ?? '')
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
