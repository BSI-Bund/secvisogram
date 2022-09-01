import { set } from 'lodash/fp.js'
import React from 'react'
import DocumentEditorContext from './shared/DocumentEditorContext.js'
import WizardPanel from './WizzardEditorTab/WizardPanel.js'

/**
 * Defines the layout of the wizzard editor.
 *
 * @param {object} props
 * @param {import('../shared/types').FormValues} props.formValues
 * @param {import('../shared/types').TypedValidationError[]} props.validationErrors
 * @param {(doc: {}) => void} props.onReplaceDoc
 */
export default function WizzardEditorTab({
  formValues,
  validationErrors: errors,
  onReplaceDoc,
}) {
  const documentEditor = React.useMemo(
    /**
     * @returns {React.ContextType<typeof DocumentEditorContext>}
     */
    () => ({
      doc: formValues.doc,
      updateDoc(instancePath, value) {
        onReplaceDoc(set(instancePath, value, formValues.doc))
      },
      errors,
    }),
    [formValues.doc, errors, onReplaceDoc]
  )

  return (
    <div className="flex h-full w-full grow">
      <DocumentEditorContext.Provider value={documentEditor}>
        <WizardPanel />
      </DocumentEditorContext.Provider>
    </div>
  )
}
