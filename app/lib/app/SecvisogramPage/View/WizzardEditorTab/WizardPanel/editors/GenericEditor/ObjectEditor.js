import React from 'react'
import { GenericEditor } from '../../editors.js'
import WizardContext from '../../shared/WizardContext.js'
import FieldsEditor from '../shared/FieldsEditor.js'

/**
 * @param {object} props
 * @param {import('../../shared/types').Property | null} props.parentProperty
 * @param {import('../../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function ObjectEditor({
  parentProperty,
  property,
  instancePath,
}) {
  const { selectedPath } = React.useContext(WizardContext)
  const selectedSubPath = selectedPath.slice(instancePath.length)
  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )
  const complexProperties = property.metaInfo.propertyList?.filter((p) =>
    ['OBJECT', 'ARRAY'].includes(p.type)
  )

  /**
   * @param {string[]} path
   * @returns
   */
  const resolveSubProperty = (path) =>
    path.reduce((property, pathSegment) => {
      return (
        property?.metaInfo.propertyList?.find((p) => p.key === pathSegment) ??
        null
      )
    }, /** @type {typeof property | null} */ (property))

  const level = property.addMenuItemsForChildObjects ? 2 : 1
  const selectedProperty = resolveSubProperty(selectedSubPath.slice(0, level))

  const renderComplexEditor = () => {
    if (!selectedSubPath.length) return null
    if (!selectedProperty) return null
    return (
      <GenericEditor
        key={instancePath.concat(selectedSubPath.slice(0, level)).join('.')}
        instancePath={instancePath.concat(selectedSubPath.slice(0, level))}
        parentProperty={resolveSubProperty(selectedSubPath.slice(0, -1))}
        property={selectedProperty}
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
          {parentProperty?.addMenuItemsForChildObjects ? null : (
            <div className="border">
              <Menu instancePath={instancePath} property={property} />
            </div>
          )}
          {selectedSubPath.length ? (
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

/**
 * @param {object} props
 * @param {import('../../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 * @param {number} [props.level]
 */
function Menu({ level = 0, property, instancePath }) {
  const { selectedPath, setSelectedPath } = React.useContext(WizardContext)
  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )

  const selectedMenuPath = selectedPath.slice(instancePath.length)
  const { addMenuItemsForChildObjects } = property

  return (
    <ul style={{ marginLeft: level * 10 }}>
      {property.type === 'OBJECT' && fieldProperties?.length && level === 0 ? (
        <li className="italic">
          <button
            className={`italic ${!selectedMenuPath.length ? 'underline' : ''}`}
            onClick={() => {
              setSelectedPath(instancePath)
            }}
          >
            Fields
          </button>
        </li>
      ) : null}
      {property.metaInfo.propertyList
        ?.filter((p) => ['OBJECT', 'ARRAY'].includes(p.type))
        .map((_property) => {
          const childProperty =
            /** @type {import('../../shared/types').Property} */ (_property)
          return (
            <React.Fragment key={childProperty.key}>
              <li>
                <button
                  type="button"
                  className={
                    selectedMenuPath[0] === childProperty.key ? 'underline' : ''
                  }
                  onClick={() => {
                    setSelectedPath([...instancePath, childProperty.key])
                  }}
                >
                  {childProperty.title}
                </button>
                {addMenuItemsForChildObjects ? (
                  <Menu
                    level={level + 1}
                    property={childProperty}
                    instancePath={[...instancePath, childProperty.key]}
                  />
                ) : null}
              </li>
            </React.Fragment>
          )
        })}
    </ul>
  )
}
