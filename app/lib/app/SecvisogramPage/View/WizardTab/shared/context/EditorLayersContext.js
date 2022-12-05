import React from 'react'

/**
 * @typedef {object} EditorLayersContext
 * @property {boolean} layer1
 * @property {(value: boolean) => void} setLayer1
 * @property {boolean} layer2
 * @property {(value: boolean) => void} setLayer2
 * @property {boolean} layer3
 * @property {(value: boolean) => void} setLayer3
 * @property {boolean} layer4
 * @property {(value: boolean) => void} setLayer4
 * @property {boolean} layer5
 * @property {(value: boolean) => void} setLayer5
 */

/** @type {EditorLayersContext} */
const defaultValue = {
  layer1: true, // mandatory
  setLayer1: () => {},
  layer2: true, // best_practice
  setLayer2: () => {},
  layer3: true, // want_to_have
  setLayer3: () => {},
  layer4: true, // nice_to_know
  setLayer4: () => {},
  layer5: true, // optional
  setLayer5: () => {},
}

export default React.createContext(defaultValue)
