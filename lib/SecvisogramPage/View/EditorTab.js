import React from 'react'
import Document from './EditorTab/Document'

/**
 * @param {{
    formValues: import('../shared/FormValues').default
    onUpdate(data: {}): void
  }} props
 */
export default function EditorTab({ formValues, onUpdate }) {
  const { doc } = formValues

  return (
    <>
      <h2 className="font-bold pb-1">Document title</h2>
      <section>
        <Document
          document={doc.document}
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
