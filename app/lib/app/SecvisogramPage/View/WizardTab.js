import React from 'react'
import { GenericEditor } from './WizardTab/editors.js'
import schema from './WizardTab/schema.js'

export default function WizardTab() {
  const [selectedPath, setSelectedPath] = React.useState(
    /** @type {string[]} */ ([])
  )

  const property = /** @type {import('./WizardTab/schema.js').Property} */ (schema)

  return (
    <div className="flex h-full w-full grow">
      <GenericEditor
        parentProperty={null}
        property={property}
        instancePath={[]}
      />
    </div>
  )
}
