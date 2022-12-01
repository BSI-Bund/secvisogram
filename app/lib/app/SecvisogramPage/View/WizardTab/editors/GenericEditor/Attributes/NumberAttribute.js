import React from 'react'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  placeholder?: string
 *  pattern?: string
 *  min: number
 *  max: number
 *  readOnly?: boolean
 *  required?: boolean
 *  instancePath: string[]
 *  value: unknown
 *  updateDoc(instancePath: string[], value: string): void
 *  property: import('../../../shared/types').Property
 * }} props
 */
export default function NumberAttribute({
  placeholder,
  pattern,
  min,
  max,
  required = false,
  readOnly = false,
  value,
  ...props
}) {
  const { updateDoc, pruneEmpty } = React.useContext(DocumentEditorContext)

  return (
    <Attribute {...props}>
      <div className="max-w-md flex items-baseline justify-center">
        <div className="w-full">
          <input
            className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
            value={/** @type {string} */ (value)}
            type="number"
            placeholder={placeholder}
            pattern={pattern}
            min={min}
            max={max}
            required={required}
            readOnly={readOnly}
            onChange={(e) => {
              const float = parseFloat(e.target.value)
              updateDoc(
                props.instancePath,
                Number.isNaN(float) ? '' : float.toString()
              )
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                pruneEmpty()
              }
            }}
          />
        </div>
      </div>
    </Attribute>
  )
}
