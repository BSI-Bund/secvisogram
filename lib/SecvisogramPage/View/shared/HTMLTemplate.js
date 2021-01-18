import React from 'react'

/**
 * @param {{ document: {} }} props
 */
export default function HTMLTemplate({ document }) {
  return (
    <>
      <h1>HTML View</h1>
      <p>This is the stringified version of the document:</p>
      <pre>{JSON.stringify(document, null, 2)}</pre>
    </>
  )
}
