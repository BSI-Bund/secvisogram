import React from 'react'

/**
 * @param {{
 *   formValues: import('../shared/FormValues').default
 *   onStrip(document: {}): Promise<{}>
 * }} props
 */
export default function CsafTab({ formValues, onStrip }) {
  const [{ data }, setState] = React.useState({
    data: /** @type {{ strippedDocument: {} } | null} */ (null),
  })

  React.useEffect(() => {
    onStrip(formValues.doc).then((doc) => {
      setState((state) => ({ ...state, data: { strippedDocument: doc } }))
    })
  }, [formValues, onStrip])

  return (
    <section>
      <h1 className="text-xl font-bold pb-1">CSAF-JSON</h1>
      {data === null ? (
        <div>Loading data ...</div>
      ) : (
        <pre className="text-sm">
          {JSON.stringify(data.strippedDocument, null, 2)}
        </pre>
      )}
    </section>
  )
}
