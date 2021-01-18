import React from 'react'
import ReactDOM from 'react-dom/server'
import HTMLTemplate from './shared/HTMLTemplate'

/**
 * @param {{
 *   formValues: import('../shared/FormValues').default
 * }} props
 */
export default function HtmlTab({ formValues }) {
  const source = React.useMemo(
    () =>
      ReactDOM.renderToStaticMarkup(<HTMLTemplate document={formValues.doc} />),
    [formValues.doc]
  )
  return (
    <section>
      <pre>{source}</pre>
    </section>
  )
}
