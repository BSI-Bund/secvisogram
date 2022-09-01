import React from 'react'
import DocumentEditorContext from '../../../../../shared/DocumentEditorContext.js'
import FieldsEditor from './shared/FieldsEditor.js'

/**
 * @param {object} props
 * @param {import('../../types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function Editor({ property, instancePath }) {
  const { doc, errors, updateDoc } = React.useContext(DocumentEditorContext)

  const fieldErrors = errors.filter(
    (e) => e.instancePath === '/' + instancePath.join('/')
  )

  if (property.type === 'ARRAY') {
    return <ArrayEditor property={property} instancePath={instancePath} />
  } else if (property.type === 'OBJECT') {
    return (
      <ComplexObjectEditor property={property} instancePath={instancePath} />
    )
  } else if (property.type === 'STRING') {
    const value = instancePath.reduce((value, pathSegment) => {
      return (value ?? {})[pathSegment]
    }, /** @type {Record<string, any> | null} */ (doc))
    const sanitizedValue = typeof value === 'string' ? value : ''

    return (
      <div>
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
      <div>
        <div>{property.fullName.join('.')}</div>
        <div>{}</div>
      </div>
    )
  }
}

/**
 * @param {object} props
 * @param {import('../../types').Property} props.property
 * @param {string[]} props.instancePath
 */
function ArrayEditor({ property, instancePath }) {
  const { doc, updateDoc } = React.useContext(DocumentEditorContext)
  const value = instancePath.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, /** @type {Record<string, any> | null} */ (doc))
  const [selectedIndex, setSelectedIndex] = React.useState(
    /** @type {number | null} */ (null)
  )
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
        <Editor
          key={instancePath.concat([String(selectedIndex)]).join('.')}
          property={childProperty}
          instancePath={instancePath.concat([String(selectedIndex)])}
        />
      ) : null}
    </>
  )
}

/**
 * @param {object} props
 * @param {import('../../types').Property} props.property
 * @param {string[]} props.instancePath
 */
function ComplexObjectEditor({ property, instancePath }) {
  const [selectedKey, setSelectedKey] = React.useState(
    /** @type {{ type: 'fields' } | { type: 'key'; name: string } | null} */ (
      null
    )
  )
  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )
  const complexProperties = property.metaInfo.propertyList?.filter((p) =>
    ['OBJECT', 'ARRAY'].includes(p.type)
  )

  const renderComplexEditor = () => {
    if (selectedKey?.type !== 'key') return null
    const childProperty = property.metaInfo.propertyList?.find(
      (p) => p.key === selectedKey.name
    )
    if (!childProperty) return null
    return (
      <Editor
        key={instancePath.concat([selectedKey.name]).join('.')}
        instancePath={instancePath.concat([selectedKey.name])}
        property={childProperty}
      />
    )
  }

  return (
    <>
      {!complexProperties?.length ? (
        <FieldsEditor
          fieldProperties={fieldProperties ?? []}
          instancePath={instancePath}
        />
      ) : (
        <>
          <div className="border">
            <ul>
              {fieldProperties?.length ? (
                <li className="italic">
                  <button
                    className={`italic ${
                      selectedKey?.type === 'fields' ? 'underline' : ''
                    }`}
                    onClick={() => {
                      setSelectedKey({ type: 'fields' })
                    }}
                  >
                    Fields
                  </button>
                </li>
              ) : null}
              {complexProperties?.map((childProperty) => (
                <li key={instancePath.concat([childProperty.key]).join('.')}>
                  <button
                    className={
                      selectedKey?.type === 'key' &&
                      selectedKey.name === childProperty.key
                        ? 'underline'
                        : ''
                    }
                    onClick={() => {
                      setSelectedKey({ type: 'key', name: childProperty.key })
                    }}
                  >
                    {childProperty.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {selectedKey?.type === 'fields' ? (
            <FieldsEditor
              fieldProperties={fieldProperties ?? []}
              instancePath={instancePath}
            />
          ) : selectedKey?.type === 'key' ? (
            renderComplexEditor()
          ) : null}
        </>
      )}
    </>
  )
}
