import React from 'react'
import { GenericEditor } from './FormEditor/editors.js'
import schema from './FormEditor/schema.js'

export default function FormEditorTab() {
  const property = /** @type {import('./FormEditor/schema.js').Property} */ (
    schema
  )

  return (
    <div className="flex h-full w-full grow">
      <GenericEditor
        parentProperty={null}
        property={property}
        instancePath={[]}
        enable_last_rev_hist_item={false}
      />
    </div>
  )
}
