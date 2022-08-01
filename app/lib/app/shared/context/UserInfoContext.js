import React from 'react'

/**
 * @typedef {object} UserInfoContext
 * @property {string} user
 * @property {string} email
 * @property {string} preferredUsername
 * @property {string[] | null} groups
 */

export default React.createContext(/** @type {UserInfoContext | null} */ (null))
