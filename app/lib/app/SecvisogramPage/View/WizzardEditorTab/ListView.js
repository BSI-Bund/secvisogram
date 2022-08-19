import { get } from 'lodash'
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
export default function ListView({
  formValues,
  validationErrors,
  onUpdate,
  traversedJsonPath,
  schema,
}) {
  const { doc } = formValues

  const [selectedMenuItem, setSelectedMenuItem] = React.useState(
    /** @type {import('./shared/types.js').MenuItem | null} */ (null)
  )

  const metaInfo = /** @type {import('./shared/types.js').MetaInfoArray} */ (
    schema.metaInfo
  )
  const listItemMetaInfo = metaInfo.arrayType

  let content = get(doc, traversedJsonPath)

  /** @type {'EDITOR' | 'LIST' | 'MENU' | 'INVISIBLE' | undefined} */
  let viewType

  if (listItemMetaInfo.type === 'OBJECT') {
    const objectInfo = getObjectInfo(listItemMetaInfo)

    if (
      objectInfo.fields.length &&
      !objectInfo.objects.length &&
      !objectInfo.lists.length
    ) {
      viewType = 'EDITOR'
    } else if (
      objectInfo.fields.length ||
      !objectInfo.objects.length ||
      !objectInfo.lists.length
    ) {
      viewType = 'MENU'
    }
  } else if (
    !(listItemMetaInfo.type === 'OBJECT' || listItemMetaInfo.type === 'ARRAY')
  ) {
    // listen ohne objekte sondern mit reinen strings
    viewType = 'EDITOR'
  }

  /** @type import('./shared/types.js').MenuItem[] */
  let menuItems = []

  if (content) {
    for (const [i, item] of content.entries()) {
      let path = [...traversedJsonPath]
      path.push(i)

      menuItems.push({
        title: 'Item ' + i,
        metaInfo: listItemMetaInfo,
        traversedJsonPath: path,
        viewType: viewType,
        subMenuItems: [],
      })
    }
  }

  function addItem() {
    let defaultValue = listItemMetaInfo.type === 'OBJECT' ? {} : ''

    if (!content?.length) {
      onUpdate('/' + traversedJsonPath.join('/'), {
        $set: [defaultValue],
      })
    } else {
      onUpdate('/' + traversedJsonPath.join('/'), {
        $push: [defaultValue],
      })
    }
  }

  return (
    <>
      <div className="w-auto bg-white border-black border-r-1">
        <ul>
          {/*<li className="py-1 px-4">*/}
          {/*  <b>List View: {traversedJsonPath.join('.')}</b>*/}
          {/*</li>*/}

          {menuItems.map((menuItem, /** @type {number} */ index) => (
            <li
              key={index}
              className="py-1 px-4 hover:bg-gray-100"
              onClick={() => setSelectedMenuItem(menuItem)}
            >
              Item {index}
            </li>
          ))}

          <li className="py-1 px-1">
            <button
              className="border border-gray-400 py-1 px-1 hover:bg-gray-200 rounded"
              onClick={() => addItem()}
            >
              Add Item
            </button>
          </li>
        </ul>
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
