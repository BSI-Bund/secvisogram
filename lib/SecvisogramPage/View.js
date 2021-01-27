import React from 'react'
import AdvisoryTab from './View/AdvisoryTab'
import CsafTab from './View/CsafTab'
import EditorTab from './View/EditorTab'
import HtmlTab from './View/HtmlTab'
import LoadingIndicator from './View/LoadingIndicator'
import Reducer from './View/Reducer'
import SourceTab from './View/SourceTab'

/**
 * @typedef {import('../shared/Core').Doc} Doc
 */

/**
 * @param {{
    isLoading: boolean
    isSaving: boolean
    data: {
      documentIsValid: boolean | null
      errors: import('../shared/validationTypes').ValidationError[]
      doc: Doc
    } | null
    activeTab: 'EDITOR' | 'SOURCE' | 'ADVISORY' | 'HTML' | 'CSAF-JSON'
    onDownload(): void
    onOpen(file: File): void
    onSave(doc: Doc): void
    onChangeTab(tab: 'EDITOR' | 'SOURCE' | 'ADVISORY' | 'HTML' | 'CSAF-JSON', document: {}): void
    onValidate(document: {}): void
    onNewFormDoc(): void
    onNewSourceDoc(): void
    onStrip(document: {}): Promise<{}>
  }} props
 */
function View({
  activeTab,
  isLoading,
  isSaving,
  data,
  onSave,
  onDownload,
  onOpen,
  onChangeTab,
  onValidate,
  onNewFormDoc,
  onNewSourceDoc,
  onStrip,
}) {
  const originalValues = React.useMemo(() => ({ doc: data?.doc ?? null }), [
    data,
  ])
  const [{ ...state }, dispatch] = React.useReducer(Reducer, {
    formValues: originalValues,
  })
  const formValues = /** @type {import('./shared/FormValues').default} */ (state.formValues)
  const debouncedChangedDoc = useDebounce(formValues.doc, 300)
  const onUpdate = React.useCallback((/** @type {{}} */ data) => {
    dispatch({
      type: 'CHANGE_FORM_DOC',
      update: data,
    })
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
    <div className="mx-auto w-full h-screen flex flex-col">
      <div className="px-3 py-2 flex justify-between items-center w-full bg-white shadow">
        <h1 className="text-2xl font-mono">Secvisogram</h1>
        <div>
          {data ? (
            data.documentIsValid === true ? (
              <span className="text-green-500 font-bold">
                ✓ Document is valid
              </span>
            ) : data.documentIsValid === false ? (
              <span className="text-red-500 font-bold">
                Document is invalid ({data.errors.length} error(s))
              </span>
            ) : null
          ) : null}
        </div>
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
          <label className="py-1 ml-4 hover:text-green-500">
            Open
            <input
              id="openFile"
              title="open file"
              type="file"
              className="hidden"
              onChange={(e) => {
                if (!e.target.files || !e.target.files[0]) return
                onOpen(e.target.files[0])
              }}
            />
          </label>
          <button
            type="button"
            className="py-1 ml-4 hover:text-green-500"
            onClick={() => {
              onDownload()
            }}
          >
            Download
          </button>
        </div>
      </div>
      <div className="bg-gray-500 flex pt-2">
        <button
          type="button"
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'EDITOR'
              ? 'bg-white'
              : 'text-white hover:bg-white hover:text-black')
          }
          onClick={() => {
            onChangeTab('EDITOR', formValues.doc)
          }}
        >
          Editor
        </button>
        <button
          type="button"
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'SOURCE'
              ? 'bg-white'
              : 'text-white hover:bg-white hover:text-black')
          }
          onClick={() => {
            onChangeTab('SOURCE', formValues.doc)
          }}
        >
          Source
        </button>
        <button
          type="button"
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'ADVISORY'
              ? 'bg-white'
              : 'text-white hover:bg-white hover:text-black')
          }
          onClick={() => {
            onChangeTab('ADVISORY', formValues.doc)
          }}
        >
          Advisory
        </button>
        <button
          type="button"
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'HTML'
              ? 'bg-white'
              : 'text-white hover:bg-white hover:text-black')
          }
          onClick={() => {
            onChangeTab('HTML', formValues.doc)
          }}
        >
          HTML
        </button>
        <button
          type="button"
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'CSAF-JSON'
              ? 'bg-white'
              : 'text-white hover:bg-white hover:text-black')
          }
          onClick={() => {
            onChangeTab('CSAF-JSON', formValues.doc)
          }}
        >
          CSAF-JSON
        </button>
      </div>
      <div className="relative overflow-auto h-full">
        {isLoading ? (
          <LoadingIndicator label="Loading data ..." />
        ) : isSaving ? (
          <LoadingIndicator label="Saving data ..." />
        ) : doc ? (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (formValues === originalValues) return
              onSave(doc)
            }}
          >
            {activeTab === 'EDITOR' ? (
              <div className="p-3">
                <EditorTab
                  formValues={formValues}
                  validationErrors={data?.errors ?? []}
                  onUpdate={onUpdate}
                  onNewFormDoc={onNewFormDoc}
                  onNewSourceDoc={onNewSourceDoc}
                />
              </div>
            ) : activeTab === 'SOURCE' ? (
              <SourceTab
                formValues={formValues}
                onUpdate={onUpdate}
                onNewSourceDoc={onNewSourceDoc}
              />
            ) : activeTab === 'ADVISORY' ? (
              <div className="p-3">
                <AdvisoryTab formValues={formValues} />
              </div>
            ) : activeTab === 'HTML' ? (
              <div className="p-3">
                <HtmlTab formValues={formValues} />
              </div>
            ) : activeTab === 'CSAF-JSON' ? (
              <div className="p-3">
                <CsafTab formValues={formValues} onStrip={onStrip} />
              </div>
            ) : null}
          </form>
        ) : null}
      </div>
    </div>
  )
}

export default View

/**
 * @param {T} value
 * @param {number} [delay]
 * @returns {T}
 * @template T
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
