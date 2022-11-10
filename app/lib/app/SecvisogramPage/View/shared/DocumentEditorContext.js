import React from 'react'

export default React.createContext({
  doc: {},
  /** @type {(instancePath: string[], value: unknown) => void} */
  updateDoc: () => {},
  errors: /** @type import('../../shared/types').TypedValidationError[] */ ([]),
})
