import React from 'react'

/**
 * @typedef {object} UserInfoContext
 * @property {boolean} isUserSignedIn
 * @property {string} user
 * @property {string} email
 * @property {string} preferredUsername
 * @property {string[]} groups
 */

/** @type {UserInfoContext} */
const defaultValue = {
  isUserSignedIn: false,
  user: '',
  email: '',
  preferredUsername: '',
  groups: [],
}

export default React.createContext(defaultValue)
