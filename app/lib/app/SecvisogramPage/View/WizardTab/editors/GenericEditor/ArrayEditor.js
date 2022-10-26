import { faCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import { GenericEditor } from '../../editors.js'
import WizardContext from '../../../shared/context/WizardContext.js'
import SideBarContext from '../../../shared/context/SideBarContext.js'
import { getCircleColor } from '../GenericEditor.js'

/**
 * @param {object} props
 * @param {import('../../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function ArrayEditor({ property, instancePath }) {
  const { doc, errors, updateDoc } = React.useContext(DocumentEditorContext)
  const sideBarData = React.useContext(SideBarContext)
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
          {sanitizedValue.map((_, i) => {
            const indexErrors = errors.filter((e) =>
              e.instancePath.startsWith('/' + [...instancePath, i].join('/'))
            )
            return (
              <li
                key={instancePath.concat([String(i)]).join('.')}
                className={
                  (selectedIndex === i ? 'bg-blue-400' : '') +
                  ' border-b border-gray-300 flex w-full'
                }
              >
                <div className="grid place-items-center px-2 h-9">
                  <FontAwesomeIcon
                    icon={faCircle}
                    color={getCircleColor(indexErrors)}
                    className="text-xs"
                  />
                </div>
                <button
                  type="button"
                  className={'px-2 w-full text-left hover:bg-blue-300'}
                  onClick={() => {
                    setSelectedIndex(i)
                  }}
                >
                  Item {i + 1}
                </button>
                <button
                  type="button"
                  className="w-9 h-9 flex-none hover:bg-blue-300"
                  onClick={() => {
                    sideBarData.setSideBarIsOpen(true)
                    sideBarData.setSideBarSelectedPath(
                      instancePath.concat(i.toString())
                    )
                  }}
                >
                  <FontAwesomeIcon icon={faInfoCircle} size="xs" />
                </button>
              </li>
            )
          })}
        </ul>
        <button
          type="button"
          className="h-9 px-2 text-center hover:bg-blue-300 border-b border-gray-300 border-solid w-full"
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
