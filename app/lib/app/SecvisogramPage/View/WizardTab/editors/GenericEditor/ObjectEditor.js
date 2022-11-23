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
                      (!selectedMenuPath.length ? 'font-bold' : '') +
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
                      className="italic text-left w-full px-2 h-9 hover:underline"
                      onClick={() => {
                        setSelectedPath(instancePath)
                      }}
                    >
                      Fields
                    </button>
                  </li>
                ) : null}
                {menuStructure.map((menuItem, menuItemIndex) => {
                  const childErrors = errors.filter((e) =>
                    e.instancePath.startsWith(
                      '/' + menuItem.instancePath.join('/')
                    )
                  )
                  const isSelected =
                    selectedSubPath &&
                    menuItem.instancePath.every(
                      (p, i) => selectedSubPath[i] === p
                    )
                  const docuPathFromInstancePath = [
                    ...instancePath,
                    ...menuItem.instancePath,
                  ].filter((p) => Number.isNaN(Number(p)))
                  const isActiveInSidebar =
                    docuPathFromInstancePath.length ===
                      sideBarData.sideBarSelectedPath.length &&
                    docuPathFromInstancePath.every(
                      (p, i) => sideBarData.sideBarSelectedPath[i] === p
                    )

                  return (
                    <React.Fragment key={menuItem.instancePath.join('.')}>
                      <li
                        className={`bg-gray-300 ${
                          instancePath.length === 0 &&
                          menuItem.instancePath.length === 1 &&
                          menuItemIndex > 0
                            ? 'mt-4'
                            : ''
                        }`}
                        style={{}}
                      >
                        <div
                          className={
                            `${isSelected ? 'font-bold' : ''} ${
                              menuItem.instancePath.length === 1 &&
                              !fieldProperties?.length
                                ? 'bg-gray-300'
                                : 'bg-gray-200'
                            }` +
                            (menuItem.instancePath.length > 1
                              ? ' border-b border-gray-200 flex w-full'
                              : ' border-b border-gray-300 flex w-full')
                          }
                        >
                          {Array.from({
                            length: menuItem.instancePath.length - 2,
                          }).map((_, i) => (
                            <div key={i} className={'spacer w-4'}>
                              I
                            </div>
                          ))}
                          {menuItem.instancePath.length === 1 ? null : menuItem
                              .instancePath.length > 1 ? (
                            menuItem.index === 0 ? (
                              <div className="spacer-t">T</div>
                            ) : menuItem.parentLength - 1 === menuItem.index ? (
                              <div className="spacer-l">L</div>
                            ) : (
                              <div className="spacer-t">T</div>
                            )
                          ) : null}
                          <div className="grid place-items-center px-2">
                            <FontAwesomeIcon
                              icon={faCircle}
                              className={getErrorTextColor(childErrors)}
                              size="xs"
                            />
                          </div>
                          <button
                            type="button"
                            className="px-2 w-full text-left hover:underline whitespace-nowrap"
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
                            className={
                              'w-9 h-9 flex-none hover:text-slate-600 ' +
                              `${
                                isActiveInSidebar
                                  ? 'text-slate-600'
                                  : 'text-slate-400'
                              }`
                            }
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
  const menuProperties =
    property.metaInfo.propertyList?.filter(
      (p) => p.type === 'OBJECT' || p.type === 'ARRAY'
    ) ?? []
  /** @type {Array<{ instancePath: string[]; title?: string; index: number; parentLength: number }>} */
  const menuStructure =
    menuProperties.flatMap((childProperty, index) => {
      return [
        ...(childProperty.type === 'OBJECT' || childProperty.type === 'ARRAY'
          ? [
              {
                index,
                parentLength: menuProperties.length ?? 0,
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
