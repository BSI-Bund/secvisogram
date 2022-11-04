import { faCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import SideBarContext from '../../../shared/context/SideBarContext.js'
import WizardContext from '../../../shared/context/WizardContext.js'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import { GenericEditor } from '../../editors.js'
import { getErrorTextColor } from '../GenericEditor.js'

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
  const { selectedPath, setSelectedPath } = React.useContext(WizardContext)
  const { errors } = React.useContext(DocumentEditorContext)
  const fieldProperties = property.metaInfo.propertyList?.filter(
    (p) => !['OBJECT', 'ARRAY'].includes(p.type)
  )
  const complexProperties = property.metaInfo.propertyList?.filter((p) =>
    ['OBJECT', 'ARRAY'].includes(p.type)
  )
  const menuStructure = getObjectMenuStructure(property)
  const menuDepth = Math.max(...menuStructure.map((p) => p.instancePath.length))
  const selectedSubPath = menuStructure
    .slice()
    .map((p) => p.instancePath)
    .sort((a, z) => z.length - a.length)
    .find((menuPath) =>
      menuPath.every(
        (seg, i) => seg === selectedPath.slice(instancePath.length)[i]
      )
    )
  const sideBarData = React.useContext(SideBarContext)

  const fieldsErrors = errors.filter(
    (e) =>
      e.instancePath.startsWith('/' + instancePath.join('/')) &&
      e.instancePath.split('/').length === instancePath.length + 2
  )

  const selectedMenuPath = selectedPath.slice(instancePath.length)

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

  const selectedProperty =
    selectedSubPath && resolveSubProperty(selectedSubPath)

  const renderComplexEditor = () => {
    if (!selectedSubPath) return null
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
            parentProperty={resolveSubProperty(selectedSubPath ?? [])}
            instancePath={instancePath
              .concat(selectedSubPath ?? [])
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
              <ul className="mb-4">
                {fieldProperties?.length ? (
                  <li
                    className={
                      (!selectedMenuPath.length ? 'bg-blue-400' : '') +
                      ' border-b border-gray-300 flex w-full'
                    }
                  >
                    <div className="grid place-items-center px-2">
                      <FontAwesomeIcon
                        icon={faCircle}
                        className={getErrorTextColor(fieldsErrors)}
                        size="xs"
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
                {menuStructure.map((menuItem) => {
                  const childErrors = errors.filter((e) =>
                    e.instancePath.startsWith(
                      '/' + menuItem.instancePath.join('/')
                    )
                  )

                  return (
                    <React.Fragment key={menuItem.instancePath.join('.')}>
                      <li
                        className={`bg-gray-200 ${
                          menuDepth > 1 && menuItem.instancePath.length === 1
                            ? 'bg-gray-300'
                            : ''
                        }`}
                        style={{
                          marginLeft: (menuItem.instancePath.length - 1) * 10,
                        }}
                      >
                        <div
                          className={
                            (selectedSubPath &&
                            menuItem.instancePath.every(
                              (p, i) => selectedSubPath[i] === p
                            )
                              ? 'bg-blue-400'
                              : '') + ' border-b border-gray-300 flex w-full'
                          }
                        >
                          <div className="grid place-items-center px-2">
                            <FontAwesomeIcon
                              icon={faCircle}
                              className={getErrorTextColor(childErrors)}
                              size="xs"
                            />
                          </div>
                          <button
                            type="button"
                            className="px-2 w-full text-left hover:bg-blue-300"
                            data-testid={`menu_entry-/${instancePath
                              .concat(menuItem.instancePath)
                              .join('/')}`}
                            onClick={() => {
                              setSelectedPath([
                                ...instancePath,
                                ...menuItem.instancePath,
                              ])
                            }}
                          >
                            {menuItem.title}
                          </button>
                          <button
                            data-testid={
                              [...instancePath, ...menuItem.instancePath].join(
                                '-'
                              ) + '-infoButton'
                            }
                            type="button"
                            className="w-9 h-9 flex-none hover:bg-blue-300"
                            onClick={() => {
                              sideBarData.setSideBarIsOpen(true)
                              sideBarData.setSideBarSelectedPath([
                                ...instancePath,
                                ...menuItem.instancePath,
                              ])
                            }}
                          >
                            <FontAwesomeIcon icon={faInfoCircle} size="xs" />
                          </button>
                        </div>
                      </li>
                    </React.Fragment>
                  )
                })}
              </ul>
            </div>
          )}
          {selectedSubPath ? renderComplexEditor() : renderFieldsEditor()}
        </>
      )}
    </>
  )
}

/**
 * @param {import('../../shared/types').Property} property
 * @param {string[]} [instancePath]
 */
export function getObjectMenuStructure(property, instancePath = []) {
  /** @type {Array<{ instancePath: string[]; title: string }>} */
  const menuStructure =
    property.metaInfo.propertyList?.flatMap((childProperty) => {
      return [
        ...(childProperty.type === 'OBJECT' || childProperty.type === 'ARRAY'
          ? [
              {
                instancePath: [...instancePath, childProperty.key],
                title: childProperty.title,
              },
            ]
          : []),
        ...(childProperty.type === 'OBJECT' &&
        property.addMenuItemsForChildObjects
          ? getObjectMenuStructure(childProperty, [
              ...instancePath,
              childProperty.key,
            ])
          : []),
      ]
    }) ?? []

  return menuStructure
}
