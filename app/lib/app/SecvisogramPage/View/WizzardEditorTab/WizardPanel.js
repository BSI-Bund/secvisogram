import React from 'react'
import { GenericEditor, ObjectFieldsEditor } from './WizardPanel/editors.js'
import schema from './WizardPanel/schema.js'
import WizardContext from './WizardPanel/shared/WizardContext.js'

export default function WizardPanel() {
  const level = 0
  const [selectedPath, _setSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )
  const selectedTopLevelProperty = selectedPath
    .slice(0, 2)
    .reduce((property, pathSegment) => {
      return (
        property?.metaInfo.propertyList?.find((p) => p.key === pathSegment) ??
        null
      )
    }, /** @type {import('./WizardPanel/schema').Property | null} */ (schema))

  /**
   * @param {string[]} newPath
   */
  const setSelectedPath = (newPath) => {
    const isPrefix = newPath.every((segment, i) => selectedPath[i] === segment)
    const isSameObject = isPrefix && newPath.length === selectedPath.length - 1

    if (!isPrefix || isSameObject) {
      _setSelectedPath(newPath)
    }
  }

  return (
    <WizardContext.Provider value={{ selectedPath, setSelectedPath }}>
      <div className="flex">
        <ul>
          {schema.metaInfo.propertyList.map((_property) => {
            const property =
              /** @type {import('./WizardPanel/schema').Property} */ (_property)
            return (
              <React.Fragment key={property.fullName.join('.')}>
                <li>
                  <button
                    type="button"
                    className={
                      selectedPath[level] === property.fullName[level]
                        ? 'underline'
                        : ''
                    }
                    onClick={() => {
                      setSelectedPath(property.fullName)
                    }}
                  >
                    {property.title}
                  </button>
                  {schema.addMenuItemsForChildObjects &&
                  property.type === 'OBJECT' ? (
                    <ul className="ml-2">
                      {property.metaInfo.propertyList
                        ?.filter((p) => ['OBJECT', 'ARRAY'].includes(p.type))
                        .map((childProperty) => {
                          const childLevel = level + 1
                          return (
                            <li key={childProperty.fullName.join('.')}>
                              <button
                                type="button"
                                className={
                                  selectedPath[childLevel] ===
                                  childProperty.fullName[childLevel]
                                    ? 'underline'
                                    : ''
                                }
                                onClick={() => {
                                  setSelectedPath(childProperty.fullName)
                                }}
                              >
                                {childProperty.title}
                              </button>
                            </li>
                          )
                        })}
                    </ul>
                  ) : null}
                </li>
              </React.Fragment>
            )
          })}
        </ul>
        {selectedPath.length && selectedTopLevelProperty ? (
          selectedPath.length === 1 &&
          selectedTopLevelProperty.type === 'OBJECT' ? (
            <ObjectFieldsEditor
              property={selectedTopLevelProperty}
              instancePath={selectedTopLevelProperty.fullName}
            />
          ) : (
            <GenericEditor
              property={selectedTopLevelProperty}
              instancePath={selectedTopLevelProperty.fullName}
            />
          )
        ) : null}
      </div>
    </WizardContext.Provider>
  )
}
