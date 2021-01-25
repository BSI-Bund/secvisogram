import { expect } from 'chai'
import createCoreFixture from './shared/CoreFixture'

suite('Core', () => {
  const fixture = createCoreFixture()

  setup(() => fixture.setup())
  teardown(() => fixture.teardown())

  suite('DocumentService', () => {
    test('The document can be validated against the JSON-schema', async () => {
      for (const document of fixture.documents) {
        const result = await fixture.core.document.validate({
          document: document.content,
        })
        expect(result.isValid).to.equal(document.valid)
        if (document.valid) {
          expect(result.errors).to.have.lengthOf(0)
        } else {
          expect(result.errors).have.length.greaterThan(0)
        }
      }
    })

    test('The document can be minified using the CSAF-strip algorithm', async () => {
      for (const document of fixture.documents) {
        if (document.strippedVersion === undefined) continue
        const result = await fixture.core.document.strip({
          document: document.content,
        })

        expect(result).to.deep.equal(document.strippedVersion)
      }
    })
  })
})
