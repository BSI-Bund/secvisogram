import React from 'react'

export default React.createContext({
  doc: {},
  /** @type {(instancePath: string[], value: unknown) => void} */
  updateDoc: () => {},
  /** @type {{'productIds': () => Promise<void | { id: string; name: string; }[]>, 'groupIds': () => Promise<void | { id: string; name: string; }[]>}}*/
  collectIds: {
    productIds: () => Promise.resolve(undefined),
    groupIds: () => Promise.resolve(undefined),
  },
  errors: /** @type import('../../shared/types').TypedValidationError[] */ ([]),
})
