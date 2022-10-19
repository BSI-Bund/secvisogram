import React from 'react'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import { GenericEditor } from '../../editors.js'
import WizardContext from '../../shared/WizardContext.js'

/**
 * @param {object} props
 * @param {import('../../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function ArrayEditor({ property, instancePath }) {
  const { doc, updateDoc } = React.useContext(DocumentEditorContext)
  const { selectedPath, setSelectedPath } = React.useContext(WizardContext)
  const selectedPathSegment = selectedPath.slice(instancePath.length).at(0)
  const selectedIndex = selectedPathSegment ? Number(selectedPathSegment) : null

  /**
   * @param {number} index
   */
  const setSelectedIndex = (index) => {
    setSelectedPath(instancePath.concat([String(index)]))
  }

  const value = instancePath.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, /** @type {Record<string, any> | null} */ (doc))
  const sanitizedValue = Array.isArray(value) ? value : []
  const childProperty =
    /** @type {NonNullable<typeof property.metaInfo.arrayType>} */ (
      property.metaInfo.arrayType
    )

  return (
    <>
      <div className="border">
        <ul>
          {sanitizedValue.map((_, i) => (
            <li key={instancePath.concat([String(i)]).join('.')}>
              <button
                type="button"
                className={selectedIndex === i ? 'underline' : ''}
                onClick={() => {
                  setSelectedIndex(i)
                }}
              >
                Item {i + 1}
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            const value =
              childProperty.type === 'OBJECT'
                ? {}
                : childProperty.type === 'ARRAY'
                ? []
                : ['STRING', 'DATETIME', 'URI'].includes(childProperty.type)
                ? ''
                : null
            if (value !== null) {
              updateDoc(instancePath, sanitizedValue.concat([value]))
            }
          }}
        >
          Add item
        </button>
      </div>
      {typeof selectedIndex === 'number' ? (
        <GenericEditor
          key={instancePath.concat([String(selectedIndex)]).join('.')}
          parentProperty={property}
          property={childProperty}
          instancePath={instancePath.concat([String(selectedIndex)])}
        />
      ) : null}
    </>
  )
}
