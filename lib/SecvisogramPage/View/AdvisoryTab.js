import React from 'react'
import HTMLTemplate from './shared/HTMLTemplate'

/**
 * @param {{
 *   formValues: import('../shared/FormValues').default
 * }} props
 */
export default function AdvisoryTab({ formValues }) {
  return (
    <section
      className="advisory max-w-2xl"
      dangerouslySetInnerHTML={{
        __html: HTMLTemplate({ document: formValues.doc }),
      }}
    />
  )
}
