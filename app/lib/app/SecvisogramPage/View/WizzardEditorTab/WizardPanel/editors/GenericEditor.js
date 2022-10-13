import React from 'react'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import WizardContext from '../shared/WizardContext.js'
import FieldsEditor from './shared/FieldsEditor.js'

/**
 * @param {object} props
 * @param {import('../shared/types').Property} props.property
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
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
function ArrayEditor({ property, instancePath }) {
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
 * @param {import('../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
function ComplexObjectEditor({ property, instancePath }) {
  const { selectedPath, setSelectedPath } = React.useContext(WizardContext)
  const selectedPathSegment = selectedPath.slice(instancePath.length).at(0)
  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )
  const complexProperties = property.metaInfo.propertyList?.filter((p) =>
    ['OBJECT', 'ARRAY'].includes(p.type)
  )

  const renderComplexEditor = () => {
    if (!selectedPathSegment) return null
    const childProperty = property.metaInfo.propertyList?.find(
      (p) => p.key === selectedPathSegment
    )
    if (!childProperty) return null
    return (
      <Editor
        key={instancePath.concat([selectedPathSegment]).join('.')}
        instancePath={instancePath.concat([selectedPathSegment])}
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
                      !selectedPathSegment ? 'underline' : ''
                    }`}
                    onClick={() => {
                      setSelectedPath(instancePath)
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
                      selectedPathSegment === childProperty.key
                        ? 'underline'
                        : ''
                    }
                    onClick={() => {
                      setSelectedPath(instancePath.concat([childProperty.key]))
                    }}
                  >
                    {childProperty.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {selectedPathSegment ? (
            renderComplexEditor()
          ) : (
            <FieldsEditor
              fieldProperties={fieldProperties ?? []}
              instancePath={instancePath}
            />
          )}
        </>
      )}
    </>
  )
}
