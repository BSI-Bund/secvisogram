import React from 'react'

/**
 * @param {{
 *  formValues: import('../shared/FormValues').default
 *  onUpdate({}): void
 *  onNewSourceDoc(): void
 * }} props
 */
export default function SourceTab({ formValues, onUpdate, onNewSourceDoc }) {
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

    editorRef.current.session.setMode('ace/mode/json')
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

  return (
    <div className="json-editor">
      <div className="px-3 py-2 flex justify-end items-center border-b">
        <div>
          <button
            type="button"
            className="py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
            onClick={() => {
              onNewSourceDoc()
            }}
          >
            New (all fields)
          </button>
        </div>
      </div>
      <div ref={ref} className="absolute top-14 right-0 bottom-0 left-0" />
    </div>
  )
}

/**
 * @param {T} value
 * @param {number} [delay]
 * @returns {T}
 * @template T
 */
function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
