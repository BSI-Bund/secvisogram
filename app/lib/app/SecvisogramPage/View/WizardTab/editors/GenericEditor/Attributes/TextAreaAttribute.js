import React from 'react'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  placeholder?: string
 *  rows?: number
 *  minLength: number
 *  readOnly?: boolean
 *  required?: boolean
 *  instancePath: string[]
 *  value: unknown
 *  property: import('../../../shared/types').Property
 * }} props
 */
export default function TextAreaAttribute({
  placeholder,
  rows = 2,
  minLength,
  required = false,
  readOnly = false,
  value,
  ...props
}) {
  const { updateDoc, pruneEmpty } = React.useContext(DocumentEditorContext)
  return (
    <Attribute {...props}>
      <div className="max-w-md flex items-center justify-center">
        <div className="w-full">
          <textarea
            className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
            value={/** @type {string} */ (value)}
            rows={rows}
            placeholder={placeholder}
            minLength={minLength}
            required={required}
            readOnly={readOnly}
            onChange={(e) => updateDoc(props.instancePath, e.target.value)}
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
