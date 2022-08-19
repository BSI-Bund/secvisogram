import React from 'react'
import EditorView from './EditorView.js'
import ListView from './ListView.js'
import ObjectMenuView from './ObjectMenuView.js'

/**
 * Displays the content of the provided json path as a list or tree, depending on the type.
 *
 * @param {{
 *  formValues: import('../../shared/types').FormValues
 *  validationErrors: import('../../shared/types').TypedValidationError[]
 *  onUpdate(instancePath: string, update: {}): void
 *  selectedMenuItem: import('./shared/types').MenuItem
 * }} props
 */
export default function ColumnTypeSelectorView({
  formValues,
  validationErrors,
  onUpdate,
  selectedMenuItem,
}) {
  return (
    <>
      {selectedMenuItem?.viewType === 'EDITOR' ? (
        <EditorView
          formValues={formValues}
          validationErrors={validationErrors}
          onUpdate={onUpdate}
          traversedJsonPath={selectedMenuItem.traversedJsonPath}
          schema={selectedMenuItem.metaInfo}
        />
      ) : selectedMenuItem?.viewType === 'LIST' ? (
        <ListView
          formValues={formValues}
          validationErrors={validationErrors}
          onUpdate={onUpdate}
          traversedJsonPath={selectedMenuItem.traversedJsonPath}
          schema={selectedMenuItem.metaInfo}
        />
      ) : selectedMenuItem?.viewType === 'MENU' ? (
        <ObjectMenuView
          formValues={formValues}
          validationErrors={validationErrors}
          onUpdate={onUpdate}
          traversedJsonPath={selectedMenuItem.traversedJsonPath}
          schema={selectedMenuItem.metaInfo}
        />
      ) : null}
    </>
  )
}
