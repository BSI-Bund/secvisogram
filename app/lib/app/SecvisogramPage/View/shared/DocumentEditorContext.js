import React from 'react'

export default React.createContext({
  /** @type {{document?: {category?: 'csaf_base' | 'csaf_security_incident_response' | 'csaf_informational_advisory' | 'csaf_security_advisory' }}} */
  doc: {},
  /** @type {(instancePath: string[], value: unknown) => void} */
  updateDoc: () => {},
  /** @type {(doc: any) => void} */
  replaceDoc: () => {},
  /** @type {{'productIds': () => Promise<void | { id: string; name: string; }[]>, 'groupIds': () => Promise<void | { id: string; name: string; }[]>}}*/
  collectIds: {
    productIds: () => Promise.resolve(undefined),
    groupIds: () => Promise.resolve(undefined),
  },
  errors: /** @type import('../../shared/types').TypedValidationError[] */ ([]),
})
