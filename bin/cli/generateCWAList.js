const fs = require('fs')
const xml2js = require('xml2js')

/**
 * @typedef {{ ID: string; Name: string }} Weakness
 * @typedef {{Weaknesses: {Weakness: Array<Weakness>}}} Weaknesses
 */

/**
 * @param {{ cwec: string }} params
 */
module.exports = function generateCWAList({ cwec }) {
  const parser = new xml2js.Parser({
    explicitArray: false,
    mergeAttrs: true,
    explicitRoot: false,
  })
  fs.readFile(cwec, function (...args) {
    parser.parseStringPromise(args[1]).then(function (result) {
      console.log('{ "weaknesses": [')
      result.Weaknesses.Weakness.map((/** @type {Weakness} */ weakness) => {
        console.log(`{"id": "CWE-${weakness.ID}", "name": "${weakness.Name}"},`)
      })
      console.log(']}')
    })
  })
}
