import { expect } from 'chai'
import HTMLTemplate from '../../../lib/app/SecvisogramPage/View/shared/HTMLTemplate.js'
import DocumentEntity from '../../../lib/app/shared/Core/entities/DocumentEntity.js'
import secureHrefTests from '../../fixtures/secureHrefTests.js'

describe('secureHrefTests', () => {
  secureHrefTests.forEach((test, i) => {
    it(test.title ?? `Test #${i + 1}`, () => {
      const preview = new DocumentEntity().preview({ document: test.content })
      const html = HTMLTemplate(preview)
      const hasHref = html.match(/<a href=".*test\.org.*">.*<\/a>/)
      expect(hasHref !== null).to.equal(test.valid)
    })
  })
})