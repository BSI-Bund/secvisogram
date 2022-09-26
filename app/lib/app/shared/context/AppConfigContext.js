import React from 'react'

/**
 * @typedef {object} AppConfigContext
 * @property {boolean} loginAvailable
 * @property {string} loginUrl
 * @property {string} logoutUrl
 * @property {string} userInfoUrl
 * @property {string} validatorUrl
 * @property {string} keySave
 * @property {string} keyValidate
 * @property {string} keyDownload
 * @property {string} keyNew
 */

/** @type {AppConfigContext} */
const defaultValue = {
  loginAvailable: false,
  loginUrl: '',
  logoutUrl: '',
  userInfoUrl: '',
  validatorUrl: '',
  keySave: 'ctrl+s',
  keyValidate: 'ctrl+i',
  keyDownload: 'ctrl+d',
  keyNew: 'ctrl+o'
}

export default React.createContext(defaultValue)
