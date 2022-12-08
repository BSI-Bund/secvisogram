import React from 'react'

export default React.createContext({
  selectedRelevanceLevel: /** @type {string} */ '',
  setSelectedRelevanceLevel: /** @type {(level: string) => void} */ (() => {}),
  relevanceLevels: /** @type { string[] } */ ([]),
})
