import React from 'react'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import ArrayEditor from './GenericEditor/ArrayEditor.js'
import ObjectEditor from './GenericEditor/ObjectEditor.js'

/**
 * @param {object} props
 * @param {import('../shared/types').Property | null} props.parentProperty
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function Editor({ parentProperty, property, instancePath }) {
  const { doc, errors, updateDoc } = React.useContext(DocumentEditorContext)

  const fieldErrors = errors.filter(
    (e) => e.instancePath === '/' + instancePath.join('/')
  )

  if (property.type === 'ARRAY') {
    return <ArrayEditor property={property} instancePath={instancePath} />
  } else if (property.type === 'OBJECT') {
    return (
      <ObjectEditor
        parentProperty={parentProperty}
        property={property}
        instancePath={instancePath}
      />
    )
  } else if (property.type === 'STRING') {
    const value = instancePath.reduce((value, pathSegment) => {
      return (value ?? {})[pathSegment]
    }, /** @type {Record<string, any> | null} */ (doc))
    const sanitizedValue = typeof value === 'string' ? value : ''

    return (
      <div className="bg-white">
        <label className="block">{property.title}</label>
        <input
          className="border px-2 py-1"
          type="text"
          value={sanitizedValue}
          onChange={(e) => {
            updateDoc(instancePath, e.target.value)
          }}
        />
        <ul className="block list-disc list-inside">
          {fieldErrors.map((e, i) => (
            <li key={`${i}-${e.message}`}>{e.message}</li>
          ))}
        </ul>
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
