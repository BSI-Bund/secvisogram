import Ajv from 'ajv'
import { expect } from 'chai'
import createCore from '../lib/shared/Core'
import { DocumentEntity } from '../lib/shared/Core/entities'
import fixture from './Core/coreFixture'
import documentTests from './Core/documentTests'

suite('Core', () => {
  const core = createCore()

  suite('documentTests', () => {
    documentTests.forEach((documentTest, i) => {
      test(documentTest.title ?? `Test #${i + 1}`, async () => {
        const result = await core.document.validate({
          document: documentTest.content,
          strict: false,
        })
        expect(result.isValid).to.equal(documentTest.valid)
        if (typeof documentTest.expectedNumberOfErrors === 'number') {
          expect(
            result.errors.length,
            'Document has the correct number of errors'
          ).to.equal(documentTest.expectedNumberOfErrors)
        }
        if (documentTest.valid) {
          expect(result.errors).to.have.lengthOf(0)
        } else {
          expect(result.errors).have.length.greaterThan(0)
        }
      })
    })
  })

  suite('DocumentService', () => {
    test('The document can be validated against the JSON-schema', async () => {
      for (const document of fixture.documents) {
        const result = await core.document.validate({
          document: document.content,
          strict: false,
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
        const result = await core.document.strip({
          document: document.content,
        })

        expect(result.document).to.deep.equal(document.strippedVersion)
      }
    })
  })

  suite('DocumentEntity', () => {
    test('When stripping a json document properties with errors are removed', () => {
      const schemaValidator = new Ajv({ allErrors: true }).compile({
        type: 'object',
        properties: { title: { type: 'string' } },
        required: ['title'],
      })
      const documentEntity = new DocumentEntity({ schemaValidator })

      const result = documentEntity.strip({ document: { title: 4 } })

      expect(result.document).to.deep.equal({})
      expect(result.strippedPaths).to.deep.equal([
        { instancePath: '/title', error: true, message: 'must be string' },
      ])
    })

    test('When stripping a json document empty properties are removed', () => {
      const schemaValidator = new Ajv({ allErrors: true }).compile({
        type: 'object',
        properties: { title: { type: 'string' } },
      })
      const documentEntity = new DocumentEntity({ schemaValidator })

      const result = documentEntity.strip({ document: { title: '' } })

      expect(result.document).to.deep.equal({})
      expect(result.strippedPaths).to.deep.equal([
        { instancePath: '/title', error: false, message: 'value was empty' },
      ])
    })
  })
})
