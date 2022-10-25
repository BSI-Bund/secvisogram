import React from 'react'
import DocumentEditorContext from '../../shared/DocumentEditorContext.js'
import ArrayEditor from './GenericEditor/ArrayEditor.js'
import ObjectEditor from './GenericEditor/ObjectEditor.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import SideBarContext from '../../shared/context/SideBarContext.js'

/**
 * utility function to get the color of circles identifying errors
 *
 * @param {Array<{ instancePath: string; message?: string; type?: string}>} errors
 * @returns {string}
 */
export function getCircleColor(errors) {
  const errorTypes = errors.map((e) => e.type)
  return errorTypes.includes('error')
    ? 'red'
    : errorTypes.includes('warning')
    ? 'yellow'
    : errorTypes.includes('info')
    ? 'blue'
    : errors.length
    ? 'red' // fall back to red if there are errors but their type is not known
    : 'green'
}

/**
 * @param {object} props
 * @param {import('../shared/types').Property | null} props.parentProperty
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function Editor({ parentProperty, property, instancePath }) {
  const {doc, errors, updateDoc} = React.useContext(DocumentEditorContext)
  const sideBarData = React.useContext(SideBarContext)

  const fieldErrors = errors.filter(
    (e) => e.instancePath === '/' + instancePath.join('/')
  )

  if (property.type === 'ARRAY') {
    return <ArrayEditor property={property} instancePath={instancePath}/>
  } else if (property.type === 'OBJECT') {
    return (
      <ObjectEditor
        parentProperty={parentProperty}
        property={property}
        instancePath={instancePath}
      />
    )
  } else if (['STRING', 'URI'].includes(property.type)) {
    const value = instancePath.reduce((value, pathSegment) => {
      return (value ?? {})[pathSegment]
    }, /** @type {Record<string, any> | null} */ (doc))
    const sanitizedValue = typeof value === 'string' ? value : ''

    return (
      <div className="bg-white">
        <div className="flex m-1">
          <div className="flex place-items-center">
            <label className="text-left">{property.title}</label>
          </div>
          <button
            type="button"
            className="w-9 h-9 flex-none hover:bg-gray-300 rounded m-1"
            onClick={() => {
              sideBarData.setSideBarIsOpen(true)
              sideBarData.setSideBarSelectedPath(instancePath)
            }}
          >
            <FontAwesomeIcon icon={faInfoCircle} size="xs"/>
          </button>
        </div>
        <input
          className="border px-2 py-1"
          type="text"
          value={sanitizedValue}
          onChange={(e) => {
            updateDoc(instancePath, e.target.value)
          }}
        />
        <div className="m-1">
          <ul className="block list-disc list-inside">
            {fieldErrors.map((e, i) => (
              <li key={`${i}-${e.message}`} className="flex">
                <div className="grid place-items-center px-2">
                  <FontAwesomeIcon
                    icon={faCircle}
                    color={getCircleColor([e])}
                    size="xs"
                  />
                </div>
                {e.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  } else {
    return (
      <div className="bg-white">
        <div>{property.fullName.join('.')}</div>
        <div>{}</div>
      </div>
    )
  }
}
