import React from 'react'

/**
 * @param {{
    validationErrors: import('../../../shared/types').ValidationError[]
  }} props
 */
export default function AttributeErrors({ validationErrors }) {
  return validationErrors.length ? (
    <>
      {validationErrors.map((validationError, index) => (
        <div key={index} className="text-sm text-red-500">
          {validationError.message.charAt(0).toUpperCase() +
            validationError.message.slice(1)}
        </div>
      ))}
    </>
  ) : null
}
