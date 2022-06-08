import React from 'react'

/**
 * @typedef {object} UserContext
 * @property {boolean} isUserSignedIn
 * @property {string} user
 * @property {string} email
 * @property {string} preferredUsername
 * @property {[]} groups
 */

/** @type {UserContext} */
const defaultValue = {
  isUserSignedIn: false,
  user: '',
  email: '',
  preferredUsername: '',
  groups: [],
}

export default React.createContext(defaultValue)
