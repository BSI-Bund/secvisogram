import { readdir, readFile } from 'fs/promises'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

/**
 * @param {URL} url
 */
export default async function readExampleFiles(url) {
  const examplesDir = fileURLToPath(url)

  const dirEntries = await readdir(examplesDir)
  const examples = await Promise.all(
    dirEntries
      .filter((d) => d.endsWith('.json'))
      .map((f) =>
        readFile(resolve(examplesDir, f), { encoding: 'utf-8' }).then((o) => [
          f,
          JSON.parse(o),
        ])
      )
  )
  return examples
}
