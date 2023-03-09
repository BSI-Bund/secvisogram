import React from 'react'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import pruneEmpty from '../../../../../../shared/pruneEmpty.js'

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'type'> &{
 *  label: string
 *  description: string
 *  placeholder?: string
 *  pattern?: string
 *  minLength: number
 *  readOnly?: boolean
 *  required?: boolean
 *  instancePath: string[]
 *  value: unknown
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 *  fillFunction?: () => void
 *  fillDefaultFunction?: () => void
 * }} props
 */
export default function TextAttribute({
  type = 'text',
  placeholder,
  pattern,
  minLength,
  required = false,
  readOnly = false,
  value,
  disabled,
  ...props
}) {
  const { doc, updateDoc, replaceDoc } = React.useContext(DocumentEditorContext)
  return (
    <Attribute disabled={disabled} {...props}>
      <div className="max-w-md flex items-baseline justify-center">
        <div className="w-full">
          <input
            className="border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
            value={/** @type {string} */ (value)}
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            minLength={minLength}
            required={required}
            readOnly={readOnly}
            onChange={(e) => updateDoc(props.instancePath, e.target.value)}
            onBlur={(e) => {
              if (!e.target.value) {
                replaceDoc(pruneEmpty(doc))
              }
            }}
            disabled={disabled}
          />
        </div>
      </div>
    </Attribute>
  )
}
