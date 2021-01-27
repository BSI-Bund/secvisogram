import React from 'react'
import Document from './EditorTab/Document'

/**
 * @param {{
 *  formValues: import('../shared/FormValues').default
 *  validationErrors: import('../../shared/validationTypes').ValidationError[]
 *  onUpdate(data: {}): void
 *  onNewFormDoc(): void
 *  onNewSourceDoc(): void
 * }} props
 */
export default function EditorTab({
  formValues,
  validationErrors: errors,
  onUpdate,
}) {
  const { doc } = formValues

  return (
    <>
      <section>
        <Document
          validationErrors={errors}
          dataPath="/document"
          objectName="document"
          value={doc.document}
          onUpdate={(data) => {
            onUpdate({ document: data })
          }}
        />
      </section>
      <section>
        <h2 className="font-bold pb-1">Product tree</h2>
      </section>
      <section>
        <h2 className="font-bold pb-1">Vulnerabilities</h2>
      </section>
    </>
  )
}
