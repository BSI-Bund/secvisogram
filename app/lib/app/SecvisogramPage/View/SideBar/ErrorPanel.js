import React from 'react'
import DocumentEditorContext from '../shared/DocumentEditorContext.js'

/**
 * Defines the content of the sideBar displaying errors for a selected path
 *
 * @param {{
 *   selectedPath: string[]
 * }} props
 */
export default function ErrorPanel({ selectedPath }) {
  const { errors } = React.useContext(DocumentEditorContext)

  const errorsUnderPath = errors.filter((error) =>
    error.instancePath.startsWith('/' + selectedPath.join('/'))
  )

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold">
        {errorsUnderPath.length} errors for {selectedPath.join('/')}
      </h1>
      {errorsUnderPath.map((err, i) => {
        const color =
          err.type === 'error'
            ? 'red'
            : err.type === 'warning'
            ? 'yellow'
            : 'blue'
        const colorCls = 'border-' + color + '-600 bg-' + color + '-400'
        return (
          <div
            key={i}
            className={'p-2 m-1 rounded border ' + colorCls}
          >
            <b>{err.instancePath}</b>: {err.message}
          </div>
        )
      })}
    </div>
  )
}
