import React from 'react'
import { GenericEditor } from './WizardPanel/editors.js'
import schema from './WizardPanel/schema.js'
import WizardContext from './WizardPanel/shared/WizardContext.js'

export default function WizardPanel() {
  const [selectedPath, _setSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )

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
      <GenericEditor
        parentProperty={null}
        property={
          /** @type {import('./WizardPanel/schema').Property} */ (schema)
        }
        instancePath={[]}
      />
    </WizardContext.Provider>
  )
}
