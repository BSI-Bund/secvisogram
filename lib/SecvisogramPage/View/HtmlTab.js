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
    <section>
      <pre>{source}</pre>
    </section>
  )
}
