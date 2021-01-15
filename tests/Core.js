import { expect } from 'chai'
import createCore from '../lib/shared/Core'
import createCoreFixture from './shared/CoreFixture'

suite('Core', () => {
  suite('DocumentService', () => {
    test('The document can be loaded for editing', async () => {
      const coreFixture = await createCoreFixture()
      const core = await createCore(coreFixture.params)

      const result = await core.document.edit()

      expect(result).to.be.ok
    })

    test('The document can be saved', async () => {
      const coreFixture = await createCoreFixture()
      const core = await createCore(coreFixture.params)
      const doc = { ...coreFixture.document, foo: 'bar' }

      await core.document.save(doc)
    })

    test('The document can be validated against the JSON-schema', async () => {
      const coreFixture = await createCoreFixture()
      const core = await createCore(coreFixture.params)

      for (const document of coreFixture.documents) {
        const result = await core.document.validate({
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
  })
})
