import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { GenericEditor } from '../../editors.js'
import WizardContext from '../../../shared/context/WizardContext.js'
import { faCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import SideBarContext from '../../../shared/context/SideBarContext.js'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import { getCircleColor } from '../GenericEditor.js'

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
      <div className="flex flex-col gap-4 p-4">
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
            <div className="flex bg-gray-50 border-r border-l border-solid border-gray-400 wizard-menu-shadow mr-2">
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
  const { errors } = React.useContext(DocumentEditorContext)
  const { selectedPath, setSelectedPath } = React.useContext(WizardContext)
  const sideBarData = React.useContext(SideBarContext)
  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )

  const fieldsErrors = errors.filter(
    (e) =>
      e.instancePath.startsWith('/' + instancePath.join('/')) &&
      e.instancePath.split('/').length === instancePath.length + 2
  )

  const selectedMenuPath = selectedPath.slice(instancePath.length)
  const { addMenuItemsForChildObjects } = property

  return (
    <ul className="mb-4">
      {property.type === 'OBJECT' && fieldProperties?.length && level === 0 ? (
        <li
          className={
            (!selectedMenuPath.length ? 'bg-blue-400' : '') +
            ' border-b border-gray-300 flex w-full'
          }
          style={{ marginLeft: level * 10 }}
        >
          <div className="grid place-items-center px-2">
            <FontAwesomeIcon
              icon={faCircle}
              color={getCircleColor(fieldsErrors)}
              className="text-xs"
            />
          </div>
          <button
            className="italic text-left w-full px-2 h-9 hover:bg-blue-300"
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
          const childErrors = errors.filter((e) =>
            e.instancePath.startsWith(
              '/' + [...instancePath, childProperty.key].join('/')
            )
          )
          return (
            <React.Fragment key={childProperty.key}>
              <li
                className={`bg-gray-200 ${
                  level === 0 && property.addMenuItemsForChildObjects
                    ? 'bg-gray-300'
                    : ''
                }`}
                style={{ marginLeft: level * 10 }}
              >
                <div
                  className={
                    (selectedMenuPath[0] === childProperty.key
                      ? 'bg-blue-400'
                      : '') + ' border-b border-gray-300 flex w-full'
                  }
                >
                  <div className="grid place-items-center px-2">
                    <FontAwesomeIcon
                      icon={faCircle}
                      color={getCircleColor(childErrors)}
                      className="text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    className="px-2 w-full text-left hover:bg-blue-300"
                    onClick={() => {
                      setSelectedPath([...instancePath, childProperty.key])
                    }}
                  >
                    {childProperty.title}
                  </button>
                  <button
                    type="button"
                    className="w-9 h-9 flex-none hover:bg-blue-300"
                    onClick={() => {
                      sideBarData.setSideBarIsOpen(true)
                      sideBarData.setSideBarSelectedPath([
                        ...instancePath,
                        childProperty.key,
                      ])
                    }}
                  >
                    <FontAwesomeIcon icon={faInfoCircle} size="xs" />
                  </button>
                </div>

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
