#!/usr/bin/env node

import { createReadStream } from 'node:fs'
import { writeFile } from 'node:fs/promises'
import prettier from 'prettier'
import readline from 'readline'

// The registry file can be downloaded from https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry

const [, , REGISTRY_FILE] = process.argv
const OUTPUT_FILE = 'lib/shared/bcpLanguageTagChecker/subtags.js'

const rl = readline.createInterface({
  input: createReadStream(REGISTRY_FILE),
  output: process.stdout,
  terminal: false,
})

const subtags = await new Promise((resolve) => {
  /**
   * @type {Array<{ subtag: string; type: string; prefix: string[] }>}
   */
  const subtags = []
  /** @type {{ subtag: string; type: string; prefix: string[]; scope: string | null } | null} */
  let buffer = null
  rl.on('line', (line) => {
    if (line.startsWith('%%')) {
      if (buffer) subtags.push(buffer)
      buffer = { type: '', subtag: '', prefix: [], scope: null }
    }
    if (buffer) {
      if (line.startsWith('Subtag: ')) {
        buffer.subtag = line.split(': ').slice(1).join(': ')
      }
      if (line.startsWith('Type: ')) {
        buffer.type = line.split(': ').slice(1).join(': ')
      }
      if (line.startsWith('Prefix: ')) {
        buffer.prefix.push(line.split(': ').slice(1).join(': '))
      }
      if (line.startsWith('Scope: ')) {
        buffer.scope = line.split(': ').slice(1).join(': ')
      }
      if (line === 'Description: Private use') {
        buffer.scope = 'private-use'
      }
    }
  }).on('close', async () => {
    if (buffer) subtags.push(buffer)
    resolve(subtags)
  })
})

await writeFile(
  OUTPUT_FILE,
  prettier.format(
    `export default /** @type {const} */ (${JSON.stringify({ subtags })})`,
    {
      ...(await prettier.resolveConfig(OUTPUT_FILE)),
      filepath: OUTPUT_FILE,
    }
  )
)
