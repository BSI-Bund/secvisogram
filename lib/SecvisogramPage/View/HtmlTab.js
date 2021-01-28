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
    <section className="absolute top-0 right-0 bottom-0 left-0 p-3 flex flex-col">
      <div className="h-full border overflow-auto">
        <pre className="text-sm whitespace-pre-wrap p-3 break-all">
          {source}
        </pre>
      </div>
    </section>
  )
}
