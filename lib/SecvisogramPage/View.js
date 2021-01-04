import React from 'react'
import EditorTab from './View/EditorTab'
import LoadingIndicator from './View/LoadingIndicator'
import Reducer from './View/Reducer'

/**
 * @typedef {import('../shared/Core').Doc} Doc
 */

/**
 * @param {{
    isLoading: boolean
    isSaving: boolean
    data: {
      doc: Doc
    } | null
    activeTab: 'EDITOR' | 'SOURCE' | 'ADVISORY' | 'HTML' | 'CSAF-JSON'
    editorPageUrl: string
    sourcePageUrl: string
    advisoryPageUrl: string
    htmlPageUrl: string
    csafJsonPageUrl: string
    onNew(): void
    onDownload(): void
    onOpen(file: File): void
    onSave(doc: Doc): void
  }} props
 */
function View({
  activeTab,
  editorPageUrl,
  sourcePageUrl,
  advisoryPageUrl,
  htmlPageUrl,
  csafJsonPageUrl,
  isLoading,
  isSaving,
  data,
  onSave,
  onNew,
  onDownload,
  onOpen,
}) {
  const originalValues = React.useMemo(() => ({ doc: data?.doc ?? null }), [
    data,
  ])
  const [{ ...state }, dispatch] = React.useReducer(Reducer, {
    formValues: originalValues,
  })
  const formValues = /** @type {import('./shared/FormValues').default} */ (state.formValues)

  React.useEffect(() => {
    dispatch({ type: 'RESET_FORM', values: originalValues })
  }, [originalValues])

  const { doc } = formValues

  return (
    <div className="mx-auto w-full h-screen w-screen">
      <div className="px-3 py-2 flex justify-between items-center w-full">
        <h1 className="text-2xl font-mono">Secvisogram</h1>
        <div>
          <button
            className="py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
            onClick={() => {
              onNew()
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
            className="py-1 ml-4 hover:text-green-500"
            onClick={() => {
              onDownload()
            }}
          >
            Download
          </button>
        </div>
      </div>
      <div className="pt-1 bg-gray-200 flex">
        <a
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'EDITOR' ? 'bg-white' : 'bg-gray-200 hover:bg-white')
          }
          href={editorPageUrl}
        >
          Editor
        </a>
        <a
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'SOURCE' ? 'bg-white' : 'bg-gray-200 hover:bg-white')
          }
          href={sourcePageUrl}
        >
          Source
        </a>
        <a
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'ADVISORY'
              ? 'bg-white'
              : 'bg-gray-200 hover:bg-white')
          }
          href={advisoryPageUrl}
        >
          Advisory
        </a>
        <a
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'HTML' ? 'bg-white' : 'bg-gray-200 hover:bg-white')
          }
          href={htmlPageUrl}
        >
          HTML
        </a>
        <a
          className={
            'ml-3 px-2 pb-2 pt-1 ' +
            (activeTab === 'CSAF-JSON'
              ? 'bg-white'
              : 'bg-gray-200 hover:bg-white')
          }
          href={csafJsonPageUrl}
        >
          CSAF-JSON
        </a>
      </div>
      <div className="p-3">
        <div>
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
              <div className="pb-12">
                {activeTab === 'EDITOR' ? (
                  <EditorTab
                    formValues={formValues}
                    onUpdate={(data) => {
                      dispatch({
                        type: 'CHANGE_FORM_DOC',
                        update: data,
                      })
                    }}
                  />
                ) : null}
                {formValues !== originalValues ? (
                  <div
                    className={
                      'px-3 fixed bottom-0 left-0 right-0 h-12 flex items-center justify-end border bg-gray-200'
                    }
                  >
                    <button
                      className={
                        'py-1 px-3 rounded border border-blue-500 ' +
                        (formValues === originalValues
                          ? 'text-gray-500'
                          : 'bg-blue-500 hover:bg-white text-white hover:text-blue-500')
                      }
                      disabled={formValues === originalValues}
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className="py-1 ml-4 hover:text-blue-500"
                      disabled={formValues === originalValues}
                      type="button"
                      onClick={() => {
                        if (
                          !confirm(
                            'Do you really want to reset all unsaved data?'
                          )
                        )
                          return
                        dispatch({ type: 'RESET_FORM', values: originalValues })
                      }}
                    >
                      Reset
                    </button>
                  </div>
                ) : null}
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default View
