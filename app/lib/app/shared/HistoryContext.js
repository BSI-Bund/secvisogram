import React from 'react'

/**
 * @typedef {object} Context
 * @property {Location} location
 * @property {any} state
 * @property {History['pushState']} pushState
 */

/** @type {Context} */
const defaultValue = {
  location: window.location,
  state: null,
  pushState: window.history.pushState.bind(window.history),
}

export default React.createContext(defaultValue)
