import React from 'react'
import WizardContext from './shared/context/WizardContext.js'
import { GenericEditor } from './WizardTab/editors.js'
import schema from './WizardTab/schema.js'

export default function WizardTab() {
  const [selectedPath, setSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )
  /** @type {import('./WizardTab/schema.js').Property} */
  const property = schema

  return (
    <WizardContext.Provider value={{ selectedPath, setSelectedPath }}>
      <div className="flex h-full w-full grow">
        <GenericEditor
          parentProperty={null}
          property={property}
          instancePath={[]}
        />
      </div>
    </WizardContext.Provider>
  )
}
