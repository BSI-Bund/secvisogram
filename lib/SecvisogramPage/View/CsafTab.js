import React from 'react'
import { useErrorHandler } from 'react-error-boundary'

/**
 * @typedef {Array<{ dataPath: string; message: string; error: boolean }>} StrippedPathArray
 */

/**
 * @param {{
 *   formValues: import('../shared/FormValues').default
 *   onStrip(document: {}): Promise<{ document: {}, strippedPaths: StrippedPathArray }>
 * }} props
 */
export default function CsafTab({ formValues, onStrip }) {
  const [{ data }, setState] = React.useState({
    data: /** @type {{ strippedDocument: {}, strippedPaths: StrippedPathArray } | null} */ (null),
  })
  const handleError = useErrorHandler()

  React.useEffect(() => {
    onStrip(formValues.doc)
      .then(({ document: doc, strippedPaths }) => {
        setState((state) => ({
          ...state,
          data: { strippedDocument: doc, strippedPaths },
        }))
      })
      .catch(handleError)
  }, [formValues, onStrip, handleError])

  return (
    <section className="absolute top-0 right-0 bottom-0 left-0 p-3 flex flex-col">
      {data === null ? (
        <div>Loading data ...</div>
      ) : (
        <>
          {data.strippedPaths.length ? (
            <div className="mb-3">
              <div>
                <b>Empty or invalid elements removed</b>
              </div>
              <div className="p-3 border border-red-600 bg-red-200">
                <div className="max-h-32 overflow-auto">
                  {data.strippedPaths.map((strippedPath, i) => (
                    <div key={i}>
                      <b>{strippedPath.dataPath}</b>: {strippedPath.message}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          <div className="h-full border overflow-auto">
            <pre className="text-sm whitespace-pre-wrap p-3">
              {JSON.stringify(data.strippedDocument, null, 2)}
            </pre>
          </div>
        </>
      )}
    </section>
  )
}
