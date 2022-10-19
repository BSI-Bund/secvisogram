import React from 'react'

/**
 * @typedef {object} AppConfigContext
 *
 * @property {boolean} loginAvailable
 * @property {string} loginUrl
 * @property {string} logoutUrl
 * @property {string} userInfoUrl
 * @property {string} validatorUrl
 * @property {KeyBindings} keyBindings
 */

/**
 * @typedef {object} KeyBindings
 *
 * @property {string} keySave
 * @property {string} keyValidate
 * @property {string} keyExport
 * @property {string} keyNew
 */

/** @type {AppConfigContext} */
const defaultValue = {
  loginAvailable: false,
  loginUrl: '',
  logoutUrl: '',
  userInfoUrl: '',
  validatorUrl: '',
  keyBindings: {
    keySave: 'ctrl+s',
    keyValidate: 'ctrl+alt+v',
    keyExport: 'ctrl+e',
    keyNew: 'ctrl+o'
  }
}

export default React.createContext(defaultValue)
