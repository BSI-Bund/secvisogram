import React from 'react'
import HTMLTemplate from './shared/HTMLTemplate'

/**
 * @param {{
 *   formValues: import('../shared/FormValues').default
 * }} props
 */
export default function HtmlTab({ formValues }) {
  const source = React.useMemo(
    () => HTMLTemplate({ document: formValues.doc }),
    [formValues.doc]
  )
  return (
    <div className="csaf-document">
      <div className="px-3 py-2 flex justify-end items-center border-b">
        <div>
          <button
            type="button"
            className="py-1 px-3 rounded shadow border border-green-500 bg-green-500 text-white hover:text-green-500 hover:bg-white"
            onClick={() => {}}
          >
            Export
          </button>
        </div>
      </div>
      <section className="absolute top-12 right-0 bottom-0 left-0 p-3 flex flex-col">
        <div className="h-full border overflow-auto">
          <pre className="text-sm whitespace-pre-wrap p-3 break-all">
            {source}
          </pre>
        </div>
      </section>
    </div>
  )
}
