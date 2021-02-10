import React from 'react'
import HTMLTemplate from './shared/HTMLTemplate'

/**
 * @param {{
 *   formValues: import('../shared/FormValues').default
 * }} props
 */
export default function AdvisoryTab({ formValues }) {
  return (
    <div className="advisory p-3 h-full mr-3 bg-white">
      <section
        className="max-w-2xl"
        dangerouslySetInnerHTML={{
          __html: HTMLTemplate({ document: formValues.doc }),
        }}
      />
    </div>
  )
}
