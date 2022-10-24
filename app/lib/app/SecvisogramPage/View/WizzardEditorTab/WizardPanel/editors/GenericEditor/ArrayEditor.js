import {faCircle, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
      <div className="border-l border-r border-solid bg-gray-50 border-gray-400 wizard-menu-shadow mr-2">
        <ul>
          {sanitizedValue.map((_, i) => (
            <li key={instancePath.concat([String(i)]).join('.')} className="flex w-full">
              <div className="grid place-items-center px-2 h-9">
                <FontAwesomeIcon icon={faCircle} color="green" className="text-xs" />
              </div>
              <button
                type="button"
                className={(selectedIndex === i ? 'underline' : '') +
                  ' border-b border-r border-gray-300 border-solid px-2 h-9 w-full text-left hover:bg-gray-300'}
                onClick={() => {
                  setSelectedIndex(i)
                }}
              >
                Item {i + 1}
              </button>
              <button
                type="button"
                className="border-b border-gray-300 border-solid w-9 h-9 flex-none hover:bg-gray-300"
                onClick={() => {}}
              >
                <FontAwesomeIcon icon={faInfoCircle} className="text-xs" />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="h-9 px-2 text-center hover:bg-gray-300 border-b border-gray-300 border-solid w-full"
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
