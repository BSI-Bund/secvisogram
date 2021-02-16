import React from 'react'
import CsafTab from './View/CsafTab'
import FormEditorTab from './View/FormEditorTab'
import JsonEditorTab from './View/JsonEditorTab'
import LoadingIndicator from './View/LoadingIndicator'
import PreviewTab from './View/PreviewTab'
import Reducer from './View/Reducer'
import Alert from './View/shared/Alert'
import useDebounce from './View/shared/useDebounce'

/**
 * @param {{
 *  isLoading: boolean
 *  isSaving: boolean
 *  errors: import('../shared/validationTypes').ValidationError[]
 *  data: {
 *    doc: unknown
 *  } | null
 *  activeTab: 'EDITOR' | 'SOURCE' | 'PREVIEW' | 'CSAF-JSON'
 *  alert?: {
 *    confirmLabel: string
 *    cancelLabel: string
 *    label: string
 *    description: string
 *    onConfirm(): void
 *    onCancel(): void
 *  } | null
 *  stripResult: React.ComponentProps<typeof CsafTab>['stripResult']
 *  strict: boolean
 *  onSetStrict(strict: boolean): void
 *  onDownload(doc: {}): void
 *  onOpen(file: File): Promise<void | {}>
 *  onChangeTab(tab: 'EDITOR' | 'SOURCE' | 'PREVIEW' | 'CSAF-JSON', document: {}): void
 *  onValidate(document: {}): void
 *  onNewDocMin(): Promise<void | {}>
 *  onNewDocMax(): Promise<void | {}>
 *  onStrip(document: {}): void
 *  onExportCSAF(doc: {}): void
 *  onExportHTML(html: string): void
 * }} props
 */
function View({
  activeTab,
  isLoading,
  isSaving,
  errors,
  data,
  alert,
  stripResult,
  strict,
  onSetStrict,
  onDownload,
  onOpen,
  onChangeTab,
  onValidate,
  onNewDocMin,
  onNewDocMax,
  onStrip,
  onExportCSAF,
  onExportHTML,
}) {
  const originalValues = React.useMemo(() => ({ doc: data?.doc ?? null }), [
    data,
  ])
  const [{ ...state }, dispatch] = React.useReducer(Reducer, {
    formValues: originalValues,
  })
  const formValues = /** @type {import('./shared/FormValues').default} */ (state.formValues)
  const debouncedChangedDoc = useDebounce(formValues.doc, 300)
  const onUpdate = /** @type {((update: {}) => void) & ((dataPath: string, update: {}) => void)} */ (React.useCallback(
    (/** @type {any} */ newValue, /** @type {any?} */ update) => {
      if (typeof newValue === 'string') {
        dispatch({
          type: 'CHANGE_FORM_DOC',
          dataPath: newValue,
          timestamp: new Date(),
          update: update,
        })
      } else {
        dispatch({
          type: 'CHANGE_FORM_DOC',
          timestamp: new Date(),
          update: newValue,
        })
      }
    },
    []
  ))
  const onResetDoc = React.useCallback((
    /** @type {unknown} */ newSerializedDoc
  ) => {
    dispatch({ type: 'RESET_FORM_DOC', doc: newSerializedDoc })
  }, [])

  React.useEffect(() => {
    dispatch({ type: 'RESET_FORM', values: originalValues })
  }, [originalValues])

  React.useEffect(() => {
    /**
     * @param {BeforeUnloadEvent} e
     */
    const handler = (e) => {
      if (originalValues !== formValues) e.preventDefault()
    }

    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [originalValues, formValues])

  React.useEffect(() => {
    onValidate(debouncedChangedDoc)
  }, [debouncedChangedDoc, onValidate])

  const { doc } = formValues

  return (
    <>
      {alert ? <Alert {...alert} /> : null}
      <div className="mx-auto w-full h-screen flex flex-col">
        <div className="bg-gray-500 flex justify-between items-baseline pt-2">
          <div>
            <button
              type="button"
              className={
                'ml-3 px-2 pb-2 pt-1 ' +
                (activeTab === 'EDITOR'
                  ? 'bg-white text-blue-400'
                  : 'bg-blue-400 text-white hover:bg-white hover:text-blue-400')
              }
              onClick={() => {
                onChangeTab('EDITOR', formValues.doc)
              }}
            >
              Form Editor
            </button>
            <button
              type="button"
              className={
                'ml-3 px-2 pb-2 pt-1 ' +
                (activeTab === 'SOURCE'
                  ? 'bg-white text-blue-400'
                  : 'bg-blue-400 text-white hover:bg-white hover:text-blue-400')
              }
              onClick={() => {
                onChangeTab('SOURCE', formValues.doc)
              }}
            >
              JSON Editor
            </button>
            <button
              type="button"
              className={
                'ml-3 px-2 pb-2 pt-1 ' +
                (activeTab === 'PREVIEW'
                  ? 'bg-white text-gray-400'
                  : 'bg-gray-400 text-white hover:bg-white hover:text-gray-400')
              }
              onClick={() => {
                onChangeTab('PREVIEW', formValues.doc)
              }}
            >
              Preview
            </button>
            <button
              type="button"
              className={
                'ml-3 px-2 pb-2 pt-1 ' +
                (activeTab === 'CSAF-JSON'
                  ? 'bg-white text-green-500'
                  : 'bg-green-500 text-white hover:bg-white hover:text-green-500')
              }
              onClick={() => {
                onChangeTab('CSAF-JSON', formValues.doc)
              }}
            >
              CSAF Document
            </button>
          </div>
          <h1 className="mr-3 text-2xl text-blue-200 font-mono">Secvisogram</h1>
        </div>
        <div
          className="relative overflow-auto h-full bg-gray-500"
          key={activeTab}
        >
          {isLoading ? (
            <LoadingIndicator label="Loading data ..." />
          ) : isSaving ? (
            <LoadingIndicator label="Saving data ..." />
          ) : doc ? (
            <>
              {activeTab === 'EDITOR' ? (
                <FormEditorTab
                  formValues={formValues}
                  validationErrors={errors}
                  onUpdate={onUpdate}
                  onOpen={onOpen}
                  onDownload={onDownload}
                  onNewDocMin={onNewDocMin}
                  onNewDocMax={onNewDocMax}
                />
              ) : activeTab === 'SOURCE' ? (
                <JsonEditorTab
                  formValues={formValues}
                  validationErrors={errors}
                  strict={strict}
                  onSetStrict={onSetStrict}
                  onChange={onResetDoc}
                  onOpen={onOpen}
                  onDownload={onDownload}
                  onNewDocMin={onNewDocMin}
                  onNewDocMax={onNewDocMax}
                />
              ) : activeTab === 'PREVIEW' ? (
                <PreviewTab
                  formValues={formValues}
                  validationErrors={errors}
                  onExport={onExportHTML}
                />
              ) : activeTab === 'CSAF-JSON' ? (
                <CsafTab
                  stripResult={stripResult}
                  onStrip={() => {
                    onStrip(formValues.doc)
                  }}
                  onExport={() => {
                    onExportCSAF(formValues.doc)
                  }}
                />
              ) : null}
            </>
          ) : null}
        </div>
      </div>
    </>
  )
}

export default View
