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
 * @property {string} keyExportStripped
 * @property {string} keyExportNotStripped
 * @property {string} keyExportHtml
 * @property {string} keyExportPdf
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
    keyExport: 'ctrl+alt+e',
    keyNew: 'ctrl+o',
    keyExportStripped: 'ctrl+e',
    keyExportNotStripped: 'ctrl+shift+e',
    keyExportHtml: 'ctrl+p',
    keyExportPdf: 'ctrl+alt+p',
  },
}

export default React.createContext(defaultValue)
