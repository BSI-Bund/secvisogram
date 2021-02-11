import {
  faCheckCircle,
  faCode,
  faExclamationTriangle,
  faWindowClose,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import HTMLTemplate from './shared/HTMLTemplate'

/**
 * @param {{
 *  formValues: import('../shared/FormValues').default
 *  validationErrors: import('../../shared/validationTypes').ValidationError[]
 * }} props
 */
export default function HtmlTab({ formValues, validationErrors: errors }) {
  const source = React.useMemo(
    () => HTMLTemplate({ document: formValues.doc }),
    [formValues.doc]
  )

  const exportPreview = () => {}

  const [showErrors, setShowErrors] = React.useState(false)

  return (
    <div className="preview-html flex h-full mr-3 bg-white">
      <div className="p-3 w-full">
        <div className={'relative ' + (showErrors ? 'h-4/5' : 'h-full')}>
          <section className="absolute top-0 right-0 bottom-0 left-0 h-full bg-white flex flex-col">
            <div className="h-full border overflow-auto">
              <pre className="text-sm whitespace-pre-wrap p-3 break-all">
                {source}
              </pre>
            </div>
          </section>
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
                  <b>{error.dataPath}</b>: {error.message}
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
        <div className="flex flex-col">
          <button
            type="button"
            className="mb-2 py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
            onClick={exportPreview}
          >
            <FontAwesomeIcon className="mr-1" icon={faCode} />
            Export Preview
          </button>
        </div>
        <div>
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
            <div>
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
                onClick={() => setShowErrors(!showErrors)}
              >
                {showErrors ? 'Hide errors' : 'Show errors'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
