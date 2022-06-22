import {
  faCheckCircle,
  faCog,
  faExclamationTriangle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import useDebounce from './shared/useDebounce.js'
import MonacoEditor from 'react-monaco-editor'

/**
 * @param {{
 *  originalValues: import('../shared/types').FormValues
 *  formValues: import('../shared/types').FormValues
 *  validationErrors: import('../shared/types').TypedValidationError[]
 *  strict: boolean
 *  onSetStrict(strict: boolean): void
 *  onChange(doc: {} | null): void
 *  onDownload(doc: {}): void
 *  onLockTab(): void
 *  onUnlockTab(): void
 * }} props
 */
export default function JsonEditorTab({
  originalValues,
  formValues,
  validationErrors: errors,
  strict,
  onSetStrict,
  onChange,
  onLockTab,
  onUnlockTab,
}) {
  const { doc } = formValues

  /**
   * Holds the reference to the container element of the ace editor.
   */
  const ref = React.useRef(/** @type {HTMLDivElement | null} */ (null))

  /**
   * Holds the instance of the ace editor.
   */
  const editorRef =
    /** @type {React.MutableRefObject<import('../../../../vendor/ace-builds/ace').Ace.Editor | undefined>} */ (
      React.useRef()
    )
  /**
   * Initializes the ace editor.
   */
  React.useEffect(() => {
    const editorEl = /** @type {HTMLDivElement} */ (ref.current)
    if (!editorRef.current) {
      editorRef.current = ace.edit(editorEl)
    }
    const changeHandler = () => {
      setState((state) => ({
        ...state,
        value: editorRef.current?.getValue() ?? '',
      }))
    }
    editorEl.style.fontSize = '14px'

    editorRef.current.session.setMode('ace/mode/json')
    editorRef.current.setTheme('ace/theme/eclipse')
    editorRef.current.setOptions({
      foldStyle: 'markbeginend',
      fadeFoldWidgets: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    })
    editorRef.current.on('change', changeHandler)

    return () => {
      editorRef.current?.off('change', changeHandler)
      editorRef.current?.destroy()
    }
  }, [])

  const initialMountRef = React.useRef(true)

  /**
   * The initial value of the state used to prevent a re-render of the ace editor
   * when the document changes from outside.
   */
  const initialValue = React.useMemo(
    () => JSON.stringify(originalValues.doc, null, 2),
    [originalValues.doc]
  )
  /**
   * Updates the editor value if the document was changed outside (e.g. created from template)
   */
  React.useEffect(() => {
    if (!initialMountRef.current && editorRef.current) {
      editorRef.current?.setValue(initialValue)
    }
  }, [initialValue])

  /**
   * Holds the value and potential parse errors of the ace editor input.
   */
  const [{ value, parseError }, setState] = React.useState(() => ({
    value: JSON.stringify(doc, null, 2),
    parseError: null,
  }))
  React.useEffect(() => {
    if (initialMountRef.current && editorRef.current) {
      initialMountRef.current = false
      editorRef.current.setValue(value)
    }
  }, [value])

  const [showExpertSettings, setShowExpertSettings] = React.useState(!strict)
  const [showErrors, setShowErrors] = React.useState(false)
  const debouncedValue = useDebounce(value)

  /**
   * Toggles between strict and lenient validation.
   */
  const toggleStrict = () => {
    onSetStrict(!strict)
  }

  const toggleExpertSettings = () => {
    setShowExpertSettings(!showExpertSettings)
  }

  const toggleShowErrors = () => {
    setShowErrors(!showErrors)
  }

  /**
   * Locks the tab navigation if there are any parse errors.
   */
  React.useEffect(() => {
    if (parseError) onLockTab()
    else onUnlockTab()
  }, [parseError, onLockTab, onUnlockTab])

  const [editor, setEditor] = React.useState(
    /** @type {monacoEditor.editor} */ {}
  )
  const [monacoState, setMonaco] = React.useState(/** @type {monaco} */ {})

  const stringifiedDoc = React.useMemo(
    () => JSON.stringify(doc, null, 2),
    [doc]
  )

  /**
   * The initial value of the state used to prevent a re-render of the ace editor
   * when the document changes from outside.
   */
  // const [initialValue] = React.useState(stringifiedDoc)

  /**
   * Holds the value and potential parse errors of the ace editor input.
   */
  const [{ value, parseError }, setState] = React.useState({
    value: stringifiedDoc,
    parseError: null,
  })
  const [showExpertSettings, setShowExpertSettings] = React.useState(!strict)
  const [showErrors, setShowErrors] = React.useState(false)
  const debouncedValue = useDebounce(value)

  /**
   * Toggles between strict and lenient validation.
   */
  const toggleStrict = () => {
    onSetStrict(!strict)
  }

  const toggleExpertSettings = () => {
    setShowExpertSettings(!showExpertSettings)
  }

  const toggleShowErrors = () => {
    setShowErrors(!showErrors)
  }

  const confirmMin = () => {
    onNewDocMin().then((newDoc) => {
      editor.getModel().setValue(JSON.stringify(newDoc, null, 2))
    })
    hideMin()
  }

  const confirmMax = () => {
    onNewDocMax().then((newDoc) => {
      editor.getModel().setValue(JSON.stringify(newDoc, null, 2))
    })
    hideMax()
  }

  const handleOpen = (/** @type {File} */ file) => {
    onOpen(file).then((openedDoc) => {
      editor.getModel().setValue(JSON.stringify(openedDoc, null, 2))
    })
  }

  /**
   * Locks the tab navigation if there are any parse errors.
   */
  React.useEffect(() => {
    if (parseError) onLockTab()
    else onUnlockTab()
  }, [parseError, onLockTab, onUnlockTab])

  /**
   * Parses the ace editor input and replaces the document.
   */
  React.useEffect(() => {
    /** @type {{} | null} */
    let result = null
    try {
      result = JSON.parse(debouncedValue)
      setState((state) => ({ ...state, parseError: null }))
    } catch (/** @type {any} */ e) {
      setState((state) => ({ ...state, parseError: e }))
      return
    }
    onChange(result)
  }, [debouncedValue, onChange])

  React.useEffect(() => {
    if (errors.length === 0) {
      setShowErrors(false)
    }
  }, [errors])

  const {
    show: showMin,
    hide: hideMin,
    Alert: MinAlert,
  } = useAlert({
    description:
      'This will create a new CSAF document. All current content will be lost. Are you sure?',
    confirmLabel: 'Yes, create new document',
    cancelLabel: 'No, resume editing',
    confirm: confirmMin,
  })

  const {
    show: showMax,
    hide: hideMax,
    Alert: MaxAlert,
  } = useAlert({
    description:
      'This will create a new CSAF document. All current content will be lost. Are you sure?',
    confirmLabel: 'Yes, create new document',
    cancelLabel: 'No, resume editing',
    confirm: confirmMax,
  })

  const [code] = React.useState(stringifiedDoc)

  const editorDidMount = (
    /** @type {any } */ editor,
    /** @type {any} */ monaco
  ) => {
    console.log('editorDidMount', editor)
    setEditor(editor)
    setMonaco(monaco)
  }

  const editorWillMount = () => {}

  const onChangeMonaco = (
    /** @type {any} */ newValue,
    /** @type {any} */ e
  ) => {
    console.log('onChangeMonaco', newValue, e)
  }
  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
  }

  return (
    <>
      <MinAlert />
      <MaxAlert />

      <div className="json-editor flex h-full mr-3 bg-white">
        <div className=" w-full">
          <div className={'relative ' + (showErrors ? 'h-4/5' : 'h-full')}>
            <MonacoEditor
              width="inherit"
              height="inherit"
              language="json"
              theme="vs-white"
              value={code}
              options={options}
              onChange={onChangeMonaco}
              editorDidMount={editorDidMount}
              editorWillMount={editorWillMount}
            />
          </div>
          <div
            className={
              'overflow-auto p-3 border border-red-600 bg-red-200 ' +
              (showErrors ? 'h-1/5' : 'hidden')
            }
          >
            <div className="flex justify-between items-start h-full">
              <div className="pr-4">
                <h2 className="text-xl font-bold">
                  Validation <br /> Errors:
                </h2>
              </div>
              <div className="mx-2 flex-grow overflow-auto h-full">
                {errors.map((error, i) => (
                  <div key={i}>
                    <a
                      href={'#' + error.instancePath}
                      className={`validation_error${
                        error.type === 'warning'
                          ? ' validation_error-warning text-yellow-600'
                          : error.type === 'error'
                          ? ' validation_error-error'
                          : error.type === 'info'
                          ? ' validation_error-info text-blue-500'
                          : ''
                      } underline`}
                    >
                      <b>{error.instancePath}</b>:{' '}
                      <span className="validation_error-message">
                        {error.message}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="text-xl text-red-400"
                onClick={() => setShowErrors(false)}
              >
                <FontAwesomeIcon className="mr-1" icon={faWindowClose} />
              </button>
            </div>
          </div>
        </div>
        <div className="pl-3 pr-6 py-6 w-72 flex flex-col justify-between">
          <div className="flex flex-col"></div>
          <div>
            {showExpertSettings ? (
              <div className="mb-6">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    checked={strict}
                    type="checkbox"
                    name="toggle"
                    id="toggleExpertSettings"
                    onChange={toggleStrict}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="toggleExpertSettings"
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  />
                </div>
                <label
                  htmlFor="toggleExpertSettings"
                  className="text-xs text-gray-500"
                >
                  Disallow non-standard properties
                </label>
              </div>
            ) : (
              <button
                type="button"
                className="py-1 px-3 mb-6 h-9 underline text-gray-500"
                onClick={toggleExpertSettings}
              >
                <FontAwesomeIcon className="mr-1" icon={faCog} />
                Show expert settings
              </button>
            )}

            <h2 className="mb-4 text-xl font-bold">Validation Status</h2>
            {errors.length === 0 ? (
              <>
                <div className="mb-4 flex justify-end">
                  <FontAwesomeIcon
                    className="text-6xl text-green-500"
                    icon={faCheckCircle}
                  />
                </div>
                <div className="h-9" />
              </>
            ) : (
              <>
                <div className="mb-4 flex justify-between">
                  <span className="text-6xl text-red-500 font-bold">
                    {errors.length}
                  </span>
                  <FontAwesomeIcon
                    className="text-6xl text-red-500"
                    icon={faExclamationTriangle}
                  />
                </div>
                <button
                  type="button"
                  className="py-1 px-3 h-9 underline text-gray-500"
                  onClick={toggleShowErrors}
                >
                  {showErrors ? 'Hide errors' : 'Show errors'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
