import React from 'react'

/**
 * @typedef {object} HistoryContext
 * @property {Location} location
 * @property {any} state
 * @property {History['pushState']} pushState
 */

/** @type {HistoryContext} */
const defaultValue = {
  location: window.location,
  state: null,
  pushState: window.history.pushState.bind(window.history),
}

export default React.createContext(defaultValue)
