import React from 'react'

export default React.createContext({
  applicationError: /** @type {{ message: string } | null} */ (null),
  handleError(/** @type {{ message: string } | null} */ error) {
    throw error
  },
})
