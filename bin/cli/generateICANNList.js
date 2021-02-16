const fs = require('fs')
const readline = require('readline')

/**
 * @param {{ registry: string }} params
 */
module.exports = function generateIcannList({ registry }) {
  const rl = readline.createInterface({
    input: fs.createReadStream(registry),
    output: process.stdout,
    terminal: false,
  })

  /**
   * @type {Array<{ subtag: string }>}
   */
  const subtags = []
  rl.on('line', (line) => {
    if (line.startsWith('Subtag: ')) {
      subtags.push({ subtag: line.substring(8) })
    }
  }).on('close', () => {
    console.log(JSON.stringify(subtags, null, 2))
  })
}
