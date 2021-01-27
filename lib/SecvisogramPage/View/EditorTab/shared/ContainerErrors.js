import React from 'react'

/**
 * @param {{
    validationErrors: import('../../../../shared/validationTypes').ValidationError[]
  }} props
 */
export default function ContainerErrors({ validationErrors }) {
  return validationErrors.length ? (
    <section className="pb-3 text-red-500">
      <h1>Error(s):</h1>
      {validationErrors.map((validationError, index) => (
        <div key={index} className="text-sm">
          {validationError.message.charAt(0).toUpperCase() +
            validationError.message.slice(1)}
        </div>
      ))}
    </section>
  ) : null
}
