import React from 'react'
import Acknowledgments from './EditorTab/Acknowledgments'

/**
 * @typedef {Object} Doc
 * @property {Array<{
    names: string[]
    organizations: string[]
    summary: string
    urls: string []
  }>} acknowledgments
 */

/**
 * @param {{
    formValues: import('../shared/FormValues').default
    onUpdate(data: {}): void
  }} props
 */
export default function EditorTab({ formValues, onUpdate }) {
  const { doc } = formValues

  return (
    <section>
      <h1 className="font-bold pb-1">Document</h1>
      <Acknowledgments
        acknowledgments={doc.acknowledgments}
        onUpdate={(data) => {
          onUpdate({ acknowledgments: data })
        }}
      />
    </section>
  )
}
