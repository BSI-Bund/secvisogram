import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import CsafTab from './View/CsafTab.js'
import FormEditorTab from './View/FormEditorTab.js'
import JsonEditorTab from './View/JsonEditorTab.js'
import LoadingIndicator from './View/LoadingIndicator.js'
import PreviewTab from './View/PreviewTab.js'
import Reducer from './View/Reducer.js'
import Alert from './View/shared/Alert.js'
import useDebounce from './View/shared/useDebounce.js'

const secvisogramVersion = SECVISOGRAM_VERSION // eslint-disable-line

/**
 * Holds the editor-state and defines the main layout of the application.
 *
 * @param {import('./View/types.js').Props} props
 */
function View({
  activeTab,
  isTabLocked,
  errors,
  data,
  defaultAdvisoryState = null,
  alert,
  stripResult,
  previewResult,
  strict,
  generatorEngineData,
  DocumentsTab,
  onLoadAdvisory,
  onUpdateAdvisory,
  onSetStrict,
  onDownload,
  onOpen,
  onChangeTab,
  onValidate,
  onNewDocMin,
  onNewDocMax,
  onStrip,
  onPreview,
  onExportCSAF,
  onExportHTML,
  onLockTab,
  onUnlockTab,
  onCollectProductIds,
  onCollectGroupIds,
  ...props
}) {
  const [advisoryState, setAdvisoryState] = React.useState(
    /** @type {import('./View/types.js').AdvisoryState | null} */ (
      defaultAdvisoryState ?? {
        type: 'NEW_ADVISORY',
        csaf: /** @type {{}} */ (data?.doc),
      }
    )
  )
  React.useEffect(() => {
    setAdvisoryState((state) =>
      data
        ? { type: 'NEW_ADVISORY', csaf: /** @type {{}} */ (data.doc) }
        : state
    )
  }, [data])

  const [isLoading, setLoading] = React.useState(props.isLoading)
  React.useEffect(() => {
    setLoading(props.isLoading)
  }, [props.isLoading])

  const [isSaving, setSaving] = React.useState(false)

  /**
   * Initial values for the editors. Can be used to detect changes of the
   * document.
   */
  const originalValues = React.useMemo(
    () => ({
      doc:
        advisoryState?.type === 'NEW_ADVISORY'
          ? advisoryState.csaf
          : advisoryState?.type === 'ADVISORY'
          ? advisoryState.advisory.csaf
          : null,
    }),
    [advisoryState]
  )

  /**
   * Editor state.
   */
  const [state, dispatch] = React.useReducer(Reducer, {
    formValues: originalValues,
  })
  const formValues = /** @type {import('./shared/types').FormValues} */ (
    state.formValues
  )

  /**
   * Enables debounced validation.
   */
  const debouncedChangedDoc = useDebounce(formValues.doc, 300)

  /**
   * Callback to update the document. Dispatches an update-action to the
   * reducer.
   *
   * @see {Reducer}
   */
  const onUpdate =
    /** @type {((update: {}) => void) & ((instancePath: string, update: {}) => void)} */ (
      React.useCallback(
        (/** @type {any} */ newValue, /** @type {any?} */ update) => {
          if (typeof newValue === 'string') {
            dispatch({
              type: 'CHANGE_FORM_DOC',
              instancePath: newValue,
              timestamp: new Date(),
              update: update,
              generatorEngineData,
            })
          } else {
            dispatch({
              type: 'CHANGE_FORM_DOC',
              timestamp: new Date(),
              update: newValue,
              generatorEngineData,
            })
          }
        },
        [generatorEngineData]
      )
    )

  /**
   * Is used to replace the complete document in the json editor.
   *
   * @see {JsonEditorTab}
   */
  const onReplaceDoc = React.useCallback(
    (/** @type {unknown} */ newSerializedDoc) => {
      dispatch({ type: 'RESET_FORM_DOC', doc: newSerializedDoc })
    },
    []
  )

  const onStripCallback = React.useCallback(() => {
    onStrip(formValues.doc)
  }, [formValues.doc, onStrip])

  const onPreviewCallback = React.useCallback(() => {
    onPreview(formValues.doc)
  }, [formValues.doc, onPreview])

  const onExportCSAFCallback = React.useCallback(() => {
    onExportCSAF(formValues.doc)
  }, [formValues.doc, onExportCSAF])

  const onCollectProductIdsCallback = React.useCallback(() => {
    return onCollectProductIds(formValues.doc)
  }, [formValues.doc, onCollectProductIds])

  const onCollectGroupIdsCallback = React.useCallback(() => {
    return onCollectGroupIds(formValues.doc)
  }, [formValues.doc, onCollectGroupIds])

  /**
   * Resets the editor state if a new document is created.
   */
  React.useEffect(() => {
    dispatch({ type: 'RESET_FORM', values: originalValues })
  }, [originalValues])

  /**
   * Prevents accidental loss of changes of the editor state
   * (e.g. browser refresh).
   */
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

  /**
   * Triggers debounced validation.
   */
  React.useEffect(() => {
    onValidate(debouncedChangedDoc)
  }, [debouncedChangedDoc, onValidate])

  const tabButtonProps = React.useCallback(
    (/** @type {typeof activeTab} */ tab) => {
      return {
        type: /** @type {'button'} */ ('button'),
        disabled: Boolean(activeTab !== tab && isTabLocked),
        className:
          'text-sm font-bold p-4 h-auto ' +
          (activeTab === tab
            ? 'bg-gray-900 text-white'
            : 'hover:bg-gray-800 hover:text-white text-gray-300'),
        onClick() {
          onChangeTab(tab, formValues.doc)
        },
      }
    },
    [activeTab, onChangeTab, formValues.doc, isTabLocked]
  )

  return (
    <>
      {alert ? <Alert {...alert} /> : null}
      <div className="mx-auto w-full h-screen flex flex-col">
        <div>
          <div className="flex justify-between bg-gray-700">
            <div className="flex pl-5">
              <button className="text-sm font-bold p-4 h-auto hover:bg-gray-800 hover:text-white text-gray-300">
                Wizard
              </button>
              <button {...tabButtonProps('EDITOR')}>Form Editor</button>
              <button {...tabButtonProps('SOURCE')}>JSON Editor</button>
              <button {...tabButtonProps('PREVIEW')}>Preview</button>
              <button {...tabButtonProps('CSAF-JSON')}>CSAF Document</button>
            </div>
            {advisoryState?.type === 'ADVISORY' && (
              <div className="text-gray-400 p-4">
                Document:{' '}
                <span data-testid="document_tracking_id">
                  {advisoryState.advisory.documentTrackingId ||
                    '<document without tracking-id>'}
                </span>
              </div>
            )}
            <div className="pr-5 flex items-center text-white">
              <button {...tabButtonProps('DOCUMENTS')}>CSAF Documents</button>
            </div>
          </div>
          {activeTab !== 'DOCUMENTS' && (
            <div className="bg-gray-400 flex items-center justify-between">
              <div className="pl-5">
                {advisoryState?.type === 'NEW_ADVISORY' ? (
                  <button
                    className="text-gray-300 hover:bg-gray-500 hover:text-white text-sm font-bold p-2 h-auto"
                    onClick={() => {
                      onDownload(formValues.doc)
                    }}
                  >
                    Save
                  </button>
                ) : advisoryState?.type === 'ADVISORY' ? (
                  <button
                    data-testid="save_button"
                    type="button"
                    className="text-gray-300 hover:bg-gray-500 hover:text-white text-sm font-bold p-2 h-auto"
                    onClick={() => {
                      setSaving(true)
                      onUpdateAdvisory(
                        {
                          advisoryId: advisoryState.advisory.advisoryId,
                          revision: advisoryState.advisory.revision,
                          csaf: formValues.doc,
                        },
                        () => {
                          onLoadAdvisory(
                            { advisoryId: advisoryState.advisory.advisoryId },
                            (advisory) => {
                              setAdvisoryState({ type: 'ADVISORY', advisory })
                              setSaving(false)
                            }
                          )
                        }
                      )
                    }}
                  >
                    Save
                  </button>
                ) : null}
              </div>
              <div className="pr-5 text-gray-300">
                <a
                  className="text-xs"
                  href="https://github.com/secvisogram/secvisogram"
                >
                  <FontAwesomeIcon className="mx-1" icon={faCodeBranch} />
                  <span>{secvisogramVersion}</span>
                </a>
                ,{' '}
                <a
                  className="text-xs"
                  href="https://github.com/secvisogram/secvisogram/blob/main/LICENSE.md"
                >
                  License: MIT
                </a>
              </div>
            </div>
          )}
        </div>
        <div
          className="relative overflow-auto h-full bg-gray-500"
          key={activeTab}
        >
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
                onCollectProductIds={onCollectProductIdsCallback}
                onCollectGroupIds={onCollectGroupIdsCallback}
              />
            ) : activeTab === 'SOURCE' ? (
              <JsonEditorTab
                formValues={formValues}
                validationErrors={errors}
                strict={strict}
                onSetStrict={onSetStrict}
                onChange={onReplaceDoc}
                onOpen={onOpen}
                onDownload={onDownload}
                onNewDocMin={onNewDocMin}
                onNewDocMax={onNewDocMax}
                onLockTab={onLockTab}
                onUnlockTab={onUnlockTab}
              />
            ) : activeTab === 'PREVIEW' ? (
              <PreviewTab
                previewResult={previewResult}
                onPreview={onPreviewCallback}
                formValues={formValues}
                validationErrors={errors}
                onExport={onExportHTML}
              />
            ) : activeTab === 'CSAF-JSON' ? (
              <CsafTab
                stripResult={stripResult}
                onStrip={onStripCallback}
                onExport={onExportCSAFCallback}
              />
            ) : activeTab === 'DOCUMENTS' ? (
              <DocumentsTab
                onOpenAdvisory={({ advisoryId }, callback) => {
                  setLoading(true)
                  onLoadAdvisory({ advisoryId }, (advisory) => {
                    setAdvisoryState({ type: 'ADVISORY', advisory })
                    callback()
                    setLoading(false)
                  })
                }}
              />
            ) : null}
          </>
        </div>
      </div>
      {isLoading ? (
        <LoadingIndicator label="Loading data ..." />
      ) : isSaving ? (
        <LoadingIndicator label="Saving data ..." />
      ) : null}
    </>
  )
}

export default View
