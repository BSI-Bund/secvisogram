import React from 'react'
import { GenericEditor } from './WizardTab/editors.js'
import schema from './WizardTab/schema.js'

export default function WizardTab() {
  /** @type {import('./WizardTab/schema.js').Property} */
  const property = schema

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
