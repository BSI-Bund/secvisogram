import React from 'react'
import convertedSchema from '../../../../../data/convertedSchema.json'
import ObjectMenuView from './WizzardEditorTab/ObjectMenuView.js'

/**
 * Defines the layout of the wizzard editor.
 *
 * @param {{
 *  formValues: import('../shared/types').FormValues
 *  validationErrors: import('../shared/types').TypedValidationError[]
 *  onUpdate(instancePath: string, update: {}): void
 * }} props
 */
export default function WizzardEditorTab({
  formValues,
  validationErrors: errors,
  onUpdate,
}) {
  return (
    <div className="flex h-full w-full grow">
      <ObjectMenuView
        formValues={formValues}
        validationErrors={errors}
        onUpdate={onUpdate}
        traversedJsonPath={[]}
        schema={
          /** @type import('./WizzardEditorTab/shared/types.js').MetaProperty */ (
            convertedSchema
          )
        }
      />
    </div>
  )
}
