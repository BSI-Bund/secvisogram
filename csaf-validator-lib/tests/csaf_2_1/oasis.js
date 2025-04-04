import { readFile } from 'node:fs/promises'
import { readFileSync } from 'node:fs'
import assert from 'node:assert/strict'
import * as informative from '../../csaf_2_1/informativeTests.js'
import * as optional from '../../csaf_2_1/optionalTests.js'
import * as mandatory from '../../csaf_2_1/mandatoryTests.js'

/*
  This is a list that includes all test numbers that are not yet implemented.
  Once all tests are implemented for CSAF 2.1 this should be deleted.
 */
const excluded = [
  '6.1.7',
  '6.1.9',
  '6.1.10',
  '6.1.11',
  '6.1.13',
  '6.1.14',
  '6.1.16',
  '6.1.36',
  '6.1.37',
  '6.1.38',
  '6.1.39',
  '6.1.40',
  '6.1.41',
  '6.1.42',
  '6.1.43',
  '6.1.44',
  '6.1.45',
  '6.1.46',
  '6.1.47',
  '6.1.48',
  '6.1.49',
  '6.2.6',
  '6.2.11',
  '6.2.19',
  '6.2.21',
  '6.2.22',
  '6.2.23',
  '6.2.24',
  '6.2.25',
  '6.2.26',
  '6.2.27',
  '6.2.28',
  '6.2.29',
  '6.2.30',
  '6.2.31',
  '6.2.32',
  '6.2.33',
  '6.2.34',
  '6.2.35',
  '6.3.1',
  '6.3.2',
  '6.3.4',
  '6.3.12',
  '6.3.13',
]

/** @typedef {import('../../lib/shared/types.js').DocumentTest} DocumentTest */

/** @typedef {Map<string, DocumentTest>} TestMap */

/**
 * @typedef {object} TestCases
 * @property {TestCase[]} tests
 */

/**
 * @typedef {object} TestCase
 * @property {string} id
 * @property {string} group
 * @property {TestSpec[]} [failures]
 * @property {TestSpec[]} [valid]
 */

/**
 * @typedef {object} TestSpec
 * @property {string} name
 * @property {boolean} valid
 */

const tests = new Map([
  [
    'informative',
    /** @type {TestMap} */ (new Map(Object.entries(informative))),
  ],
  ['optional', /** @type {TestMap} */ (new Map(Object.entries(optional)))],
  ['mandatory', /** @type {TestMap} */ (new Map(Object.entries(mandatory)))],
])

const testDataBaseUrl = new URL(
  '../../csaf/csaf_2.1/test/validator/data/',
  import.meta.url
)

const testCases = /** @type {TestCases} */ (
  JSON.parse(
    await readFile(new URL('testcases.json', testDataBaseUrl), 'utf-8')
  )
)

const testMap = parseTestCases()

for (const [group, t] of testMap) {
  describe(group, function () {
    for (const [testId, u] of t) {
      describe(testId, function () {
        for (const [type, testSpecs] of u) {
          describe(type, function () {
            for (const testSpec of testSpecs) {
              if (excluded.includes(testId)) continue

              it(testSpec.name, async () => {
                const test = tests
                  .get(group)
                  ?.get(`${group}Test_${testId.replace(/\./g, '_')}`)

                assert(test, 'test does not exist')

                const doc = JSON.parse(
                  readFileSync(new URL(testSpec.name, testDataBaseUrl), 'utf-8')
                )

                const result = await test(doc)

                if (group === 'mandatory') {
                  assert.equal(result.isValid, testSpec.valid)
                  assert.equal(
                    Boolean(result.errors?.length),
                    type === 'failures',
                    type === 'failures'
                      ? 'should have errors'
                      : `should not have errors, but had ${result.errors?.length}`
                  )
                } else {
                  assert.equal(result.isValid === undefined, testSpec.valid)

                  if (group === 'optional') {
                    assert.equal(
                      Boolean(result.warnings?.length),
                      type === 'failures',
                      type === 'failures'
                        ? 'should have warnings'
                        : `should not have warnings, but had ${result.warnings?.length}`
                    )
                  } else if (group === 'informative') {
                    assert.equal(
                      Boolean(result.infos?.length),
                      type === 'failures',
                      type === 'failures'
                        ? 'should have infos'
                        : `should not have infos, but had ${result.infos?.length}`
                    )
                  }
                }
              })
            }
          })
        }
      })
    }
  })
}

function parseTestCases() {
  /** @type {Map<string, Map<string, Map<'valid' | 'failures', TestSpec[]>>>} */
  const testData = new Map()
  for (const test of testCases.tests) {
    const valids = testData.get(test.group)?.get(test.id)?.get('valid') ?? []
    const failures =
      testData.get(test.group)?.get(test.id)?.get('failures') ?? []

    for (const valid of test.valid ?? []) {
      valids.push(valid)
    }
    for (const failure of test.failures ?? []) {
      failures.push(failure)
    }

    testData.set(
      test.group,
      new Map(testData.get(test.group)).set(
        test.id,
        new Map(testData.get(test.group)?.get(test.id))
          .set('valid', valids)
          .set('failures', failures)
      )
    )
  }

  return testData
}
