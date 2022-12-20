import * as mandatory from './lib/mandatoryTests.js'
import * as optional from './lib/optionalTests.js'
import * as informative from './lib/informativeTests.js'
import * as schema from './lib/schemaTests.js'
import validate from './lib/validate.js'

const validTests =
  /** @type {import('./lib/shared/types.js').DocumentTest[]} */ (
    Object.values(mandatory)
  )
    .concat(Object.values(optional))
    .concat(Object.values(informative))
    .concat(Object.values(schema))

/**
 * @param {Array<import('./lib/shared/types.js').DocumentTest>} tests
 * @param {any} doc
 */
export default async function (tests, doc) {
  for (const test of tests) {
    if (!validTests.includes(test)) {
      throw new Error(
        'Execution of test functions not defined in the library is prohibited. See https://github.com/secvisogram/csaf-validator-lib#strict-mode for more details.'
      )
    }
  }

  return validate(tests, doc)
}
