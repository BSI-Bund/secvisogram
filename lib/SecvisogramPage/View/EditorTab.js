import React from 'react'
import Document from './EditorTab/Document'
import ProductTree from './EditorTab/ProductTree'
import Vulnerabilities from './EditorTab/Vulnerabilities'

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
  onNewFormDoc,
  onNewSourceDoc,
}) {
  const { doc } = formValues

  return (
    <div className="form-editor flex flex-col h-full">
      <div className="px-3 py-2 flex justify-start items-center border-b">
        <div>
          <button
            type="button"
            className="py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
            onClick={() => {
              onNewFormDoc()
            }}
          >
            New
          </button>
          <button
            type="button"
            className="ml-4 py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
            onClick={() => {
              onNewSourceDoc()
            }}
          >
            New (all fields)
          </button>
        </div>
      </div>
      <div className="p-3 overflow-auto h-full">
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
          <ProductTree
            validationErrors={errors}
            dataPath="/product_tree"
            objectName="product_tree"
            value={doc.product_tree}
            onUpdate={(data) => {
              onUpdate({ product_tree: data })
            }}
          />
        </section>
        <section>
          <Vulnerabilities
            validationErrors={errors}
            dataPath="/vulnerabilities"
            objectName="vulnerabilities"
            value={doc.vulnerabilities}
            onUpdate={(data) => {
              onUpdate({ vulnerabilities: data })
            }}
          />
        </section>
      </div>
    </div>
  )
}
