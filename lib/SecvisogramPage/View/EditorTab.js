import React from 'react'
import Document from './EditorTab/Document'
import ProductTree from './EditorTab/ProductTree'
import ObjectContainer from './EditorTab/shared/ObjectContainer'
import Vulnerabilities from './EditorTab/Vulnerabilities'
import { useAlert } from './shared/Alert'

/**
 * @param {{
 *  formValues: import('../shared/FormValues').default
 *  validationErrors: import('../../shared/validationTypes').ValidationError[]
 *  onUpdate: ((update: {}) => void) & ((dataPath: string, update: {}) => void)
 *  onNewDocMin(): void
 *  onNewDocMax(): void
 * }} props
 */
export default function EditorTab({
  formValues,
  validationErrors: errors,
  onUpdate,
  onNewDocMin,
  onNewDocMax,
}) {
  const { doc } = formValues

  const confirmMin = () => {
    onNewDocMin()
    hideMin()
  }

  const confirmMax = () => {
    onNewDocMax()
    hideMax()
  }

  const { show: showMin, hide: hideMin, Alert: MinAlert } = useAlert({
    description:
      'This will create a new CSAF document. All current content will be lost. Are you sure?',
    confirmLabel: 'Yes, create new document',
    cancelLabel: 'No, resume editing',
    confirm: confirmMin,
  })

  const { show: showMax, hide: hideMax, Alert: MaxAlert } = useAlert({
    description:
      'This will create a new CSAF document. All current content will be lost. Are you sure?',
    confirmLabel: 'Yes, create new document',
    cancelLabel: 'No, resume editing',
    confirm: confirmMax,
  })

  return (
    <>
      <MinAlert />
      <MaxAlert />
      <div className="form-editor flex flex-col h-full">
        <div className="px-3 py-2 flex justify-end items-center border-b">
          <button
            type="button"
            className="py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
            onClick={showMin}
          >
            New
          </button>
          <button
            type="button"
            className="ml-4 py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
            onClick={showMax}
          >
            New (all fields)
          </button>
        </div>
        <div className="p-3 overflow-auto h-full">
          <ObjectContainer
            label="Common Security Advisory Framework"
            description="Representation of security advisory information as a JSON document."
            dataPath=""
            value={doc}
            deletable={false}
            validationErrors={errors}
            onUpdate={onUpdate}
            defaultValue={() => ({
              document: {},
            })}
          >
            {(csafProps) => (
              <>
                <Document {...csafProps('document')} />
                <ProductTree {...csafProps('product_tree')} />
                <Vulnerabilities {...csafProps('vulnerabilities')} />
              </>
            )}
          </ObjectContainer>
        </div>
      </div>
    </>
  )
}
