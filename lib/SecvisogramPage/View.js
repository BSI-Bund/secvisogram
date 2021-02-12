import React from 'react'
import AdvisoryTab from './View/AdvisoryTab'
import CsafTab from './View/CsafTab'
import EditorTab from './View/EditorTab'
import HtmlTab from './View/HtmlTab'
import LoadingIndicator from './View/LoadingIndicator'
import Reducer from './View/Reducer'
import Alert from './View/shared/Alert'
import useDebounce from './View/shared/useDebounce'
import SourceTab from './View/SourceTab'

/**
 * @param {{
 *   isLoading: boolean
 *   isSaving: boolean
 *   errors: import('../shared/validationTypes').ValidationError[]
 *   data: {
 *     doc: unknown
 *   } | null
 *   activeTab: 'EDITOR' | 'SOURCE' | 'ADVISORY' | 'HTML' | 'CSAF-JSON'
 *   alert?: {
 *     confirmLabel: string
 *     cancelLabel: string
 *     label: string
 *     description: string
 *     onConfirm(): void
 *     onCancel(): void
 *   } | null
 *   stripResult: React.ComponentProps<typeof CsafTab>['stripResult']
 *   onDownload(doc: {}): void
 *   onOpen(file: File): void
 *   onChangeTab(tab: 'EDITOR' | 'SOURCE' | 'ADVISORY' | 'HTML' | 'CSAF-JSON', document: {}): void
 *   onValidate(document: {}): void
 *   onNewDocMin(): Promise<void | {}>
 *   onNewDocMax(): Promise<void | {}>
 *   onStrip(document: {}): void
 *   onExportCSAF(doc: {}): void
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
  onDownload,
  onOpen,
  onChangeTab,
  onValidate,
  onNewDocMin,
  onNewDocMax,
  onStrip,
  onExportCSAF,
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
          update: update,
        })
      } else {
        dispatch({
          type: 'CHANGE_FORM_DOC',
          update: newValue,
        })
      }
    },
    []
  ))

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
                (activeTab === 'ADVISORY'
                  ? 'bg-white text-gray-400'
                  : 'bg-gray-400 text-white hover:bg-white hover:text-gray-400')
              }
              onClick={() => {
                onChangeTab('ADVISORY', formValues.doc)
              }}
            >
              Preview
            </button>
            <button
              type="button"
              className={
                'ml-3 px-2 pb-2 pt-1 ' +
                (activeTab === 'HTML'
                  ? 'bg-white text-gray-400'
                  : 'bg-gray-400 text-white hover:bg-white hover:text-gray-400')
              }
              onClick={() => {
                onChangeTab('HTML', formValues.doc)
              }}
            >
              Preview HTML
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
                <EditorTab
                  formValues={formValues}
                  validationErrors={errors}
                  onUpdate={onUpdate}
                  onOpen={onOpen}
                  onDownload={onDownload}
                  onNewDocMin={onNewDocMin}
                  onNewDocMax={onNewDocMax}
                />
              ) : activeTab === 'SOURCE' ? (
                <SourceTab
                  formValues={formValues}
                  validationErrors={errors}
                  onUpdate={onUpdate}
                  onOpen={onOpen}
                  onDownload={onDownload}
                  onNewDocMin={onNewDocMin}
                  onNewDocMax={onNewDocMax}
                />
              ) : activeTab === 'ADVISORY' ? (
                <AdvisoryTab
                  formValues={formValues}
                  validationErrors={errors}
                />
              ) : activeTab === 'HTML' ? (
                <HtmlTab formValues={formValues} validationErrors={errors} />
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
