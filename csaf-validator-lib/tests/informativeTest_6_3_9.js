import { expect } from 'chai'
import informativeTest_6_3_9 from '../lib/informativeTests/informativeTest_6_3_9.js'
import readExampleFiles from './shared/readExampleFiles.js'

const failingExamples = await readExampleFiles(
  new URL('informativeTest_6_3_9/failing', import.meta.url)
)
const validExamples = await readExampleFiles(
  new URL('informativeTest_6_3_9/valid', import.meta.url)
)

describe('Informative test 6.3.9', function () {
  describe('failing examples', function () {
    for (const [title, failingExample] of failingExamples) {
      it(title, function () {
        const result = informativeTest_6_3_9(failingExample)

        expect(result.infos.length).to.be.greaterThan(0)
      })
    }
  })

  describe('valid examples', function () {
    for (const [title, validExample] of validExamples) {
      it(title, function () {
        const result = informativeTest_6_3_9(validExample)

        expect(result.infos.length).to.equal(0)
      })
    }
  })
})
