const fs = require('fs')
const readline = require('readline')

function generateIcannList() {
  const rl = readline.createInterface({
    input: fs.createReadStream('language-subtag-registry.txt'),
    output: process.stdout,
    terminal: false,
  })

  const log = fs.createWriteStream('subtags.json', { flags: 'a' })
  rl.on('line', (line) => {
    if (line.startsWith('Subtag: ')) {
      log.write(`{"subtag": "${line.substring(8)}"},\n`)
    }
  })
}

generateIcannList()
