import React from 'react'

/**
 * @typedef {object} AppConfigContext
 * @property {boolean} loginAvailable
 * @property {string} loginUrl
 * @property {string} logoutUrl
 * @property {string} userInfoUrl
 * @property {string} validatorUrl
 */

/** @type {AppConfigContext} */
const defaultValue = {
  loginAvailable: false,
  loginUrl: '',
  logoutUrl: '',
  userInfoUrl: '',
  validatorUrl: '',
}

export default React.createContext(defaultValue)
