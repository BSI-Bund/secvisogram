import React from 'react'
import { GenericEditor } from '../../editors.js'
import WizardContext from '../../shared/WizardContext.js'

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

  const findSelectedProperty = () => {
    const menuDepth = property.addMenuItemsForChildObjects ? 2 : 1
    const selectedSubPath = selectedPath.slice(instancePath.length)

    /** @type {import('../../shared/types').Property | null} */
    let selectedProperty = null
    /** @type {string[]} */
    const sanitizedSelectedSubPath = []
    for (const [i, pathSegment] of selectedSubPath.entries()) {
      const nextProperty =
        i + 1 > menuDepth
          ? null
          : resolveSubProperty(selectedSubPath.slice(0, i + 1))

      // As soon as we find a property that is not an object or an array
      // we reached the limit of the selectable property in this menu
      if (
        !nextProperty ||
        (nextProperty.type !== 'OBJECT' && nextProperty.type !== 'ARRAY')
      ) {
        break
      }
      sanitizedSelectedSubPath.push(pathSegment)
      selectedProperty = nextProperty
    }
    return { selectedProperty, selectedSubPath: sanitizedSelectedSubPath }
  }

  const { selectedProperty, selectedSubPath } = findSelectedProperty()

  const renderComplexEditor = () => {
    if (!selectedSubPath.length) return null
    if (!selectedProperty) return null
    return (
      <GenericEditor
        key={instancePath.concat(selectedSubPath).join('.')}
        instancePath={instancePath.concat(selectedSubPath)}
        parentProperty={resolveSubProperty(selectedSubPath.slice(0, -1))}
        property={selectedProperty}
      />
    )
  }

  const renderFieldsEditor = () => {
    return (
      <div className="border flex flex-col gap-1 p-2">
        {fieldProperties?.map((property) => (
          <GenericEditor
            key={property.key}
            property={property}
            parentProperty={resolveSubProperty(selectedSubPath)}
            instancePath={instancePath
              .concat(selectedSubPath)
              .concat([property.key])}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      {!complexProperties?.length ? (
        renderFieldsEditor()
      ) : (
        <>
          {parentProperty?.addMenuItemsForChildObjects ? null : (
            <div className="border">
              <Menu instancePath={instancePath} property={property} />
            </div>
          )}
          {selectedSubPath.length
            ? renderComplexEditor()
            : renderFieldsEditor()}
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
