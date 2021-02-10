import React from 'react'
import { useAlert } from './shared/Alert'
import useDebounce from './shared/useDebounce'

/**
 * @param {{
 *  formValues: import('../shared/FormValues').default
 *  onUpdate({}): void
 *  onNewDocMax(): Promise<void | {}>
 * }} props
 */
export default function SourceTab({ formValues, onUpdate, onNewDocMax }) {
  const ref = React.useRef(/** @type {HTMLDivElement | null} */ (null))
  const editorRef = /** @type {React.MutableRefObject<import('../../../vendor/ace-builds/ace').Ace.Editor | undefined>} */ (React.useRef())
  const parsedDoc = React.useMemo(
    () => JSON.stringify(formValues.doc, null, 2),
    [formValues.doc]
  )
  const [initialValue] = React.useState(parsedDoc)
  const [{ value }, setState] = React.useState({ value: parsedDoc })
  const debouncedValue = useDebounce(value)

  React.useEffect(() => {
    const editorEl = /** @type {HTMLDivElement} */ (ref.current)
    if (!editorRef.current) {
      editorRef.current = ace.edit(editorEl)
    }
    const onChange = () => {
      setState((state) => ({
        ...state,
        value: editorRef.current?.getValue() ?? '',
      }))
    }
    editorEl.style.fontSize = '18px'

    editorRef.current.session.setMode('ace/mode/json')
    editorRef.current.setTheme('ace/theme/eclipse')
    editorRef.current.setOptions({
      foldStyle: 'markbeginend',
      fadeFoldWidgets: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
    })
    editorRef.current.on('change', onChange)
    editorRef.current.setValue(initialValue)

    return () => {
      editorRef.current?.off('change', onChange)
      editorRef.current?.destroy()
    }
  }, [initialValue])

  React.useEffect(() => {
    /** @type {{} | null} */
    let result = null
    try {
      result = JSON.parse(debouncedValue)
    } catch (e) {
      return
    }
    onUpdate({ $set: result })
  }, [debouncedValue, onUpdate])

  const confirm = () => {
    onNewDocMax().then((doc) => {
      editorRef.current?.setValue(JSON.stringify(doc, null, 2))
    })
    hide()
  }

  const { show, hide, Alert } = useAlert({
    description:
      'This will create a new CSAF document. All current content will be lost. Are you sure?',
    confirmLabel: 'Yes, create new document',
    cancelLabel: 'No, resume editing',
    confirm: confirm,
  })

  return (
    <>
      <Alert />
      <div className="json-editor mr-3 bg-white">
        <div className="px-3 py-2 flex justify-end items-center border-b">
          <div>
            <button
              type="button"
              className="py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
              onClick={show}
            >
              New (all fields)
            </button>
          </div>
          <div
            ref={ref}
            className="absolute top-14 right-0 bottom-0 left-0 mr-3 bg-white"
          />
        </div>
      </div>
    </>
  )
}
