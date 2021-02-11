import {
  faBook,
  faCheckCircle,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useErrorHandler } from 'react-error-boundary'

/**
 * @typedef {Array<{ dataPath: string; message: string; error: boolean }>} StrippedPathArray
 */

/**
 * @param {{
 *  formValues: import('../shared/FormValues').default
 *  onStrip(document: {}): Promise<{ document: {}, strippedPaths: StrippedPathArray }>
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

  let hasErrors = data != null && data.strippedPaths?.length > 0

  const exportCsaf = () => {}

  return (
    <div className="csaf-document flex h-full mr-3 bg-white">
      <div className="p-3 w-full">
        <div className={'relative ' + (hasErrors ? 'h-4/5' : 'h-full')}>
          <section className="absolute top-0 right-0 bottom-0 left-0 h-full bg-white flex flex-col">
            {data === null ? (
              <div>Loading data ...</div>
            ) : (
              <div className="h-full border overflow-auto">
                <pre className="text-sm whitespace-pre-wrap p-3">
                  {JSON.stringify(data.strippedDocument, null, 2)}
                </pre>
              </div>
            )}
          </section>
        </div>
        <div
          className={
            'overflow-auto p-3 border border-red-600 bg-red-200 ' +
            (hasErrors ? 'h-1/5' : 'hidden')
          }
        >
          <div className="flex justify-between items-start h-full">
            <div className="pr-4">
              <h2 className="text-xl font-bold">
                Empty or invalid <br /> elements removed:
              </h2>
            </div>
            <div className="mx-2 flex-grow overflow-auto h-full">
              {data?.strippedPaths.map((strippedPath, i) => (
                <div key={i}>
                  <b>{strippedPath.dataPath}</b>: {strippedPath.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pl-3 pr-6 py-6 w-72 flex flex-col justify-between">
        <div className="flex flex-col">
          <h2 className="mb-4 text-l font-bold">Sanitized document</h2>
          <span className="mb-4 text-gray-500">
            Here you can always find a stripped-down, CSAF-standard-compliant
            version of your document, containing only the valid and non-empty
            fields.
          </span>
          <button
            type="button"
            className="mb-2 py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
            onClick={exportCsaf}
          >
            <FontAwesomeIcon className="mr-1" icon={faBook} />
            Export CSAF
          </button>
        </div>
        <div>
          <h2 className="mb-4 text-xl font-bold">Validation Status</h2>
          {hasErrors ? (
            <div>
              <div className="mb-4 flex justify-between">
                <span className="text-6xl text-red-500 font-bold">
                  {data?.strippedPaths.length}
                </span>
                <FontAwesomeIcon
                  className="text-6xl text-red-500"
                  icon={faExclamationTriangle}
                />
              </div>
              <div className="h-9 text-gray-500">
                <span>removed elements</span>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-end">
                <FontAwesomeIcon
                  className="text-6xl text-green-500"
                  icon={faCheckCircle}
                />
              </div>
              <div className="h-9" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
