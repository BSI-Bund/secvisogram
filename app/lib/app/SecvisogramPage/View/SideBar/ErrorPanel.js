import React from 'react'
import DocumentEditorContext from '../shared/DocumentEditorContext.js'
import SelectedPathContext from '../shared/context/SelectedPathContext.js'

/**
 * Defines the content of the sideBar displaying errors for a selected path
 *
 * @param {{
 *   selectedPath: string[]
 * }} props
 */
export default function ErrorPanel({ selectedPath }) {
  const { errors } = React.useContext(DocumentEditorContext)
  const { setSelectedPath } = React.useContext(SelectedPathContext)

  const errorsUnderPath = errors.filter((error) =>
    error.instancePath.startsWith('/' + selectedPath.join('/'))
  )

  return (
    <>
      <div className="w-full px-4 pt-2">
        {selectedPath.length ? 'Context specific Errors:' : 'All errors:'}
      </div>
      <div className="p-3" data-testid="error-cards">
        {errorsUnderPath.map((err, i) => {
          const color =
            err.type === 'error'
              ? 'border-red-800 bg-red-600/75'
              : err.type === 'warning'
              ? 'border-yellow-800 bg-yellow-600/75'
              : err.type === 'info'
              ? 'border-blue-800 bg-blue-600/75'
              : ''
          return (
            <div
              key={i}
              className={'p-2 m-1 rounded border hover:cursor-pointer ' + color}
              data-testid={`error_card-${err.instancePath}-${i}`}
              onClick={() =>
                setSelectedPath(err.instancePath.split('/').slice(1))
              }
            >
              <b>{err.instancePath}</b>: {err.message}
            </div>
          )
        })}
      </div>
    </>
  )
}
