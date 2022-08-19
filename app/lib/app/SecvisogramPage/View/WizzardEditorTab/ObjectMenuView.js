import React from 'react'
import ColumnTypeSelectorView from './ColumnTypeSelectorView.js'
import { getObjectInfo } from './shared/helper.js'

/**
 * Displays the content of the provided json path as a list or tree, depending on the type.
 *
 * @param {{
 *  formValues: import('../../shared/types').FormValues
 *  validationErrors: import('../../shared/types').TypedValidationError[]
 *  onUpdate(instancePath: string, update: {}): void
 *  traversedJsonPath: string[]
 *  schema: import('./shared/types').MetaProperty
 * }} props
 */
export default function ObjectMenuView({
  formValues,
  validationErrors,
  onUpdate,
  traversedJsonPath,
  schema,
}) {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(
    /** @type {import('./shared/types.js').MenuItem | null} */ (null)
  )

  /** @type import('./shared/types.js').MenuItem[] */
  let menuItems = getMenuItems(schema, traversedJsonPath, false)

  /**
   * TODO
   *
   * @param {import('./shared/types.js').MetaProperty} schema
   * @param {string[]} traversedJsonPath
   * @param {boolean} isDeepMenu
   */
  function getMenuItems(schema, traversedJsonPath, isDeepMenu) {
    /** @type import('./shared/types.js').MenuItem[] */
    let menuItems = []

    const objectInfo = getObjectInfo(schema)
    if (!isDeepMenu && objectInfo.fields.length) {
      menuItems.push({
        title: 'FIELDS',
        metaInfo: schema,
        traversedJsonPath: traversedJsonPath,
        viewType: 'EDITOR',
        subMenuItems: [],
      })
    }

    for (/** @type {import('./shared/types.js').MetaProperty} */ const metaInfoEntry of /** @type {import('./shared/types.js').MetaInfoObject} */ (
      schema.metaInfo
    ).propertyList) {
      if (metaInfoEntry.type === 'OBJECT' || metaInfoEntry.type === 'ARRAY') {
        let currentPath = [...traversedJsonPath]
        currentPath.push(metaInfoEntry.key)

        /** @type {'EDITOR' | 'LIST' | 'MENU' | 'INVISIBLE' | undefined} */
        let viewType

        if (metaInfoEntry.type === 'OBJECT') {
          const objectInfo = getObjectInfo(metaInfoEntry)

          if (
            objectInfo.fields.length &&
            !objectInfo.objects.length &&
            !objectInfo.lists.length
          ) {
            viewType = 'EDITOR'
          } else if (
            objectInfo.fields.length &&
            (objectInfo.objects.length || objectInfo.lists.length)
          ) {
            if (schema.addMenuItemsForChildObjects && !isDeepMenu) {
              // we want a deep menu but are still on the first lvl
              // in this case we want the editor view because the objects and lists will be added in the next call
              viewType = 'EDITOR'
            } else {
              // for normal menus or if we are not on the first lvl of a deep menu
              viewType = 'MENU'
            }
          } else {
            if (schema.addMenuItemsForChildObjects) {
              viewType = 'INVISIBLE'
            } else {
              viewType = 'MENU'
            }
          }
        } else if (metaInfoEntry.type === 'ARRAY') {
          viewType = 'LIST'
        }

        /** @type import('./shared/types.js').MenuItem */
        let menuItem = {
          title: metaInfoEntry.title,
          metaInfo: metaInfoEntry,
          traversedJsonPath: currentPath,
          viewType: viewType,
          subMenuItems: [],
        }

        if (
          schema.addMenuItemsForChildObjects &&
          metaInfoEntry.type === 'OBJECT'
        ) {
          menuItem.subMenuItems.push(
            ...getMenuItems(metaInfoEntry, currentPath, true)
          )
        }

        menuItems.push(menuItem)
      }
    }

    return menuItems
  }

  /**
   * TODO
   *
   * @param {import('./shared/types.js').MenuItem[]} menuItems
   * @return {JSX.Element}
   */
  function buildHtmlMenu(menuItems) {
    return (
      <>
        {menuItems.map((menuItem, index) => (
          <>
            {menuItem.viewType !== 'INVISIBLE' ? (
              <li
                key={menuItem.title + index}
                className="py-1 px-4 cursor-pointer hover:bg-gray-200"
                onClick={() => setSelectedMenuItem(menuItem)}
              >
                {menuItem.title}
              </li>
            ) : null}

            {menuItem.subMenuItems
              ? buildHtmlMenu(menuItem.subMenuItems)
              : null}
          </>
        ))}
      </>
    )
  }

  return (
    <>
      <div className="w-auto bg-gray-300 border-black border-r-1">
        <nav className="text-gray-700">
          <ul>{buildHtmlMenu(menuItems)}</ul>
        </nav>
      </div>

      {selectedMenuItem ? (
        <ColumnTypeSelectorView
          formValues={formValues}
          validationErrors={validationErrors}
          onUpdate={onUpdate}
          selectedMenuItem={selectedMenuItem}
        />
      ) : null}
    </>
  )
}
