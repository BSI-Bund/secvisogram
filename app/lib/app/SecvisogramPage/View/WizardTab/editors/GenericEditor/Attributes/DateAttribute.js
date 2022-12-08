import React from 'react'
import DatePicker from './DateAttribute/DatePicker.js'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  readOnly?: boolean
 *  required?: boolean
 *  instancePath: string[]
 *  value: unknown
 *   property: import('../../../shared/types').Property
 * }} props
 */
export default function DateAttribute({
  required = true,
  readOnly = false,
  value,
  ...props
}) {
  const { updateDoc, pruneEmpty } = React.useContext(DocumentEditorContext)
  return (
    <Attribute {...props}>
      <div className="max-w-md flex items-center justify-center">
        <div className="w-full">
          <DatePicker
            value={/** @type {string} */ (value)}
            required={required}
            onChange={(/** @type {string} */ newValue) =>
              updateDoc(props.instancePath, newValue)
            }
            onBlur={(e) => {
              if (!e.target.value) {
                pruneEmpty()
              }
            }}
            readOnly={readOnly}
          />
        </div>
      </div>
    </Attribute>
  )
}
