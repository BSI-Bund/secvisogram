import React from 'react'
import { GenericEditor } from './WizardTab/editors.js'
import schema from './WizardTab/schema.js'
import WizardContext from './shared/context/WizardContext.js'

export default function WizardTab() {
  const [selectedPath, setSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )

  return (
    <WizardContext.Provider value={{ selectedPath, setSelectedPath }}>
      <div className="flex h-full w-full grow">
        <GenericEditor
          parentProperty={null}
          property={
            /** @type {import('./WizardTab/schema').Property} */ (schema)
          }
          instancePath={[]}
        />
      </div>
    </WizardContext.Provider>
  )
}
