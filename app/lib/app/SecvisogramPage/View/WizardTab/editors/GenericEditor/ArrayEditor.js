import { faCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import SideBarContext from '../../../shared/context/SideBarContext.js'
import SelectedPathContext from '../../../shared/context/SelectedPathContext.js'
import DocumentEditorContext from '../../../shared/DocumentEditorContext.js'
import { GenericEditor } from '../../editors.js'
import { getErrorTextColor } from '../GenericEditor.js'

/**
 * @param {object} props
 * @param {import('../../shared/types').Property} props.property
 * @param {string[]} props.instancePath
 */
export default function ArrayEditor({ property, instancePath }) {
  const { doc } = React.useContext(DocumentEditorContext)
  const { selectedPath } = React.useContext(SelectedPathContext)

  const value = instancePath.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, /** @type {Record<string, any> | null} */ (doc))
  const sanitizedValue = Array.isArray(value) ? value : []
  const childProperty =
    /** @type {NonNullable<typeof property.metaInfo.arrayType>} */ (
      property.metaInfo.arrayType
    )
  const recursionProperty =
    property.metaInfo.arrayType?.metaInfo.propertyList?.find(
      (p) => p.type === 'RECURSION'
    )
  const menuStructure = getArrayMenuStructure(
    property,
    recursionProperty ?? null,
    sanitizedValue
  )
  const selectedSubPath = menuStructure
    .slice()
    .sort((a, z) => z.length - a.length)
    .find((menuPath) =>
      menuPath.every(
        (seg, i) => seg === selectedPath.slice(instancePath.length)[i]
      )
    )

  return (
    <>
      <div className="border-l border-r border-solid bg-gray-50 border-gray-400 wizard-menu-shadow mr-2">
        <Menu
          value={sanitizedValue}
          instancePath={instancePath}
          property={property}
        />
      </div>
      {selectedSubPath ? (
        <GenericEditor
          key={selectedPath.join('.')}
          parentProperty={property}
          property={childProperty}
          instancePath={[...instancePath, ...selectedSubPath]}
        />
      ) : null}
    </>
  )
}

/**
 * @param {import('../../shared/types').Property} property
 * @param {import('../../shared/types').Property | null} recursionProperty
 * @param {any[]} value
 * @param {string[]} instancePath
 * @returns {string[][]}
 */
function getArrayMenuStructure(
  property,
  recursionProperty,
  value,
  instancePath = []
) {
  return Array.isArray(value)
    ? value.flatMap((item, i) => {
        const itemInstancePath = [...instancePath, String(i)]
        return [
          itemInstancePath,
          ...(recursionProperty
            ? getArrayMenuStructure(
                property,
                recursionProperty,
                item[recursionProperty.key],
                [...itemInstancePath, recursionProperty.key]
              )
            : []),
        ]
      })
    : []
}

/**
 * @param {object} props
 * @param {Array<unknown>} props.value
 * @param {string[]} props.instancePath
 * @param {import('../../shared/types').Property} props.property
 * @param {number} [props.level]
 * @returns
 */
function Menu({ instancePath, level = 1, ...props }) {
  const { property } = props

  const { errors } = React.useContext(DocumentEditorContext)
  const { selectedPath, setSelectedPath } = React.useContext(SelectedPathContext)
  const { setSideBarIsOpen, setSideBarSelectedPath } =
    React.useContext(SideBarContext)
  const { doc, updateDoc } = React.useContext(DocumentEditorContext)

  const value = instancePath.reduce((value, pathSegment) => {
    return (value ?? {})[pathSegment]
  }, /** @type {Record<string, any> | null} */ (doc))
  const sanitizedValue = Array.isArray(value) ? value : []
  const recursionProperty =
    property.metaInfo.arrayType?.metaInfo.propertyList?.find(
      (p) => p.type === 'RECURSION'
    )
  const isPartOfTheSelection = instancePath.every(
    (pathSegment, i) => pathSegment === selectedPath[i]
  )
  const selectedPathSegment = isPartOfTheSelection
    ? selectedPath.slice(instancePath.length).at(0)
    : undefined
  const selectedIndex = selectedPathSegment ? Number(selectedPathSegment) : null
  const childProperty =
    /** @type {NonNullable<typeof property.metaInfo.arrayType>} */ (
      property.metaInfo.arrayType
    )

  /**
   * @param {number} index
   */
  const setSelectedIndex = (index) => {
    setSelectedPath(instancePath.concat([String(index)]))
  }

  return (
    <div>
      <ul className={`block ${level > 1 ? 'ml-2' : ''}`}>
        {sanitizedValue.map((_, i) => {
          const indexErrors = errors.filter((e) =>
            e.instancePath.startsWith('/' + [...instancePath, i].join('/'))
          )
          return (
            <li key={instancePath.concat([String(i)]).join('.')}>
              <div
                className={
                  (selectedIndex === i ? 'bg-blue-400' : '') +
                  ' border-b border-gray-300 flex w-full'
                }
              >
                <div className="grid place-items-center px-2 h-9">
                  <FontAwesomeIcon
                    icon={faCircle}
                    className={getErrorTextColor(indexErrors)}
                    size="xs"
                  />
                </div>
                <button
                  type="button"
                  className={
                    'px-2 h-9 w-full text-left hover:bg-blue-300 whitespace-nowrap'
                  }
                  onClick={() => {
                    setSelectedIndex(i)
                  }}
                >
                  Item {i + 1}
                </button>
                <button
                  data-testid={[...instancePath, i].join('-') + '-infoButton'}
                  type="button"
                  className="w-9 h-9 flex-none hover:bg-blue-300"
                  onClick={() => {
                    setSideBarIsOpen(true)
                    setSideBarSelectedPath(instancePath.concat(i.toString()))
                  }}
                >
                  <FontAwesomeIcon icon={faInfoCircle} size="xs" />
                </button>
              </div>
              {recursionProperty ? (
                <Menu
                  {...props}
                  instancePath={instancePath.concat([
                    String(i),
                    recursionProperty.key,
                  ])}
                  level={level + 1}
                />
              ) : null}
            </li>
          )
        })}
      </ul>
      <button
        type="button"
        className={`h-9 pr-2 text-left hover:bg-gray-300 border-b border-blue-300 border-solid w-full whitespace-nowrap ${
          level > 1 ? 'pl-4' : 'pl-2'
        }`}
        data-testid={`menu_entry-/${instancePath.join('/')}-add_item_button`}
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
  )
}
