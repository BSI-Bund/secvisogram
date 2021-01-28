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
    <section className="max-w-2xl">
      <pre className="break-all whitespace-pre-wrap">{source}</pre>
    </section>
  )
}
