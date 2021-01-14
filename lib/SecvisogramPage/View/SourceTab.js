import React from 'react'

export default function SourceTab({}) {
  const ref = React.useRef(/** @type {HTMLDivElement | null} */ (null))

  React.useEffect(() => {
    if (!ref.current) return
    const editor = ace.edit(ref.current)
    editor.session.setMode('ace/mode/json')
  }, [])

  return (
    <div>
      <div ref={ref} className="absolute top-0 right-0 bottom-0 left-0" />
    </div>
  )
}
