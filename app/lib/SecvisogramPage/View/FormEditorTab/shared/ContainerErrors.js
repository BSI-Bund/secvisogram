import React from 'react'

/**
 * @param {{
    validationErrors: import('../../../../shared/validationTypes').ValidationError[]
  }} props
 */
export default function ContainerErrors({ validationErrors }) {
  return validationErrors.length ? (
    <section className="pb-4 text-red-500">
      {validationErrors.map((validationError, index) => (
        <div key={index} className="text-sm">
          {validationError.message.charAt(0).toUpperCase() +
            validationError.message.slice(1)}
        </div>
      ))}
    </section>
  ) : null
}
