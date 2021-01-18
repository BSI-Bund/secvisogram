import React from 'react'
import HTMLTemplate from './shared/HTMLTemplate'

/**
 * @param {{
 *   formValues: import('../shared/FormValues').default
 * }} props
 */
export default function AdvisoryTab({ formValues }) {
  return (
    <section className="advisory">
      <HTMLTemplate document={formValues.doc} />
    </section>
  )
}
