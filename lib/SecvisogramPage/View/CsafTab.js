import React from 'react'

/**
 * @param {{
 *   formValues: import('../shared/FormValues').default
 * }} props
 */
export default function CsafTab({ formValues }) {
  return (
    <section>
      <h1 className="text-xl font-bold pb-1">CSAF-JSON</h1>
      <pre className="text-sm">{JSON.stringify(formValues.doc, null, 2)}</pre>
    </section>
  )
}
