import React from 'react'
import schema from './WizardPanel/schema.js'
import {
  GenericEditor,
  ObjectFieldsEditor,
} from './WizardPanel/shared/shared/editors.js'

export default function WizardPanel() {
  const level = 0
  const [selectedPath, setSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )
  const selectedProperty = selectedPath.reduce((property, pathSegment) => {
    return (
      property?.metaInfo.propertyList?.find((p) => p.key === pathSegment) ??
      null
    )
  }, /** @type {import('./WizardPanel/shared/types').Property | null} */ (schema))
  // const [documentEditor, setDocumentEditor] = React.useState(
  //   /** @type {React.ContextType<typeof DocumentEditorContext>} */ ({
  //     doc: {
  //       document: {
  //         title: 'My document',
  //         acknowledgments: [{}, {}],
  //       },
  //     },
  //     updateDoc(instancePath, value) {
  //       setDocumentEditor((documentEditor) => ({
  //         ...documentEditor,
  //         doc: set(instancePath, value, documentEditor.doc),
  //       }))
  //     },
  //   })
  // )

  return (
    <div className="flex">
      <ul>
        {schema.metaInfo.propertyList.map((_property) => {
          const property =
            /** @type {import('./WizardPanel/shared/types').Property} */ (
              _property
            )
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
      {selectedPath.length && selectedProperty ? (
        selectedPath.length === 1 && selectedProperty.type === 'OBJECT' ? (
          <ObjectFieldsEditor
            property={selectedProperty}
            instancePath={selectedProperty.fullName}
          />
        ) : (
          <GenericEditor
            property={selectedProperty}
            instancePath={selectedProperty.fullName}
          />
        )
      ) : null}
    </div>
  )
}
