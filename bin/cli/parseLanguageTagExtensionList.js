const fs = require('fs')
const readline = require('readline')

/**
 * @param {{ registry: string }} params
 */
module.exports = function parseLanguageTagExtensionList({ registry }) {
  const rl = readline.createInterface({
    input: fs.createReadStream(registry),
    output: process.stdout,
    terminal: false,
  })

  /**
   * @type {Array<{ identifier: string }>}
   */
  const extensions = []
  /** @type {{ identifier: string } | null} */
  let buffer = null
  rl.on('line', (line) => {
    if (line.startsWith('%%')) {
      if (buffer) extensions.push(buffer)
      buffer = { identifier: '' }
    }
    if (buffer) {
      if (line.startsWith('Identifier: ')) {
        buffer.identifier = line.split(': ').slice(1).join(': ')
      }
    }
  }).on('close', () => {
    if (buffer && buffer.identifier) extensions.push(buffer)
    console.log(JSON.stringify(extensions, null, 2))
  })
}
