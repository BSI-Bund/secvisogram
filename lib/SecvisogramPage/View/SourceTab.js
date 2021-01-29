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
  const parsedDoc = React.useMemo(
    () => JSON.stringify(formValues.doc, null, 2),
    [formValues.doc]
  )
  const [initialValue] = React.useState(parsedDoc)
  const [{ value }, setState] = React.useState({ value: parsedDoc })
  const debouncedValue = useDebounce(value)

  React.useEffect(() => {
    if (!ref.current) return
    const editor = ace.edit(ref.current)
    const onChange = () => {
      setState((state) => ({ ...state, value: editor.getValue() }))
    }

    editor.session.setMode('ace/mode/json')
    editor.on('change', onChange)
    editor.setValue(initialValue)

    return () => {
      editor.off('change', onChange)
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
      <div className="px-3 py-2 flex justify-start items-center border-b">
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
