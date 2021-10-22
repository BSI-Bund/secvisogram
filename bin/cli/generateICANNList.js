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
   * @type {Array<{ subtag: string; type: string; prefix?: string }>}
   */
  const subtags = []
  /** @type {{ subtag: string; type: string; prefix?: string } | null} */
  let buffer = null
  rl.on('line', (line) => {
    if (line.startsWith('%%')) {
      if (buffer) subtags.push(buffer)
      buffer = { type: '', subtag: '' }
    }
    if (buffer) {
      if (line.startsWith('Subtag: ')) {
        buffer.subtag = line.split(': ').slice(1).join(': ')
      }
      if (line.startsWith('Type: ')) {
        buffer.type = line.split(': ').slice(1).join(': ')
      }
      if (line.startsWith('Prefix: ')) {
        buffer.prefix = line.split(': ').slice(1).join(': ')
      }
    }
  }).on('close', () => {
    if (buffer) subtags.push(buffer)
    console.log(JSON.stringify({ subtags }, null, 2))
  })
}
