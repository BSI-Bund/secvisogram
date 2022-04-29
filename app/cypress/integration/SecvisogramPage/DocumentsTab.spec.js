import { getData } from '../../../lib/app/SecvisogramPage/DocumentsTab/service.js'
import { getAdvisories } from '../../fixtures/cmsBackendData.js'
import testsSample from '../../fixtures/samples/cmsBackendData/tests.js'

describe('SecvisogramPage / DocumentsTab / service', function () {
  it('can fetch documents from the csaf cms backend', function () {
    cy.intercept('/api/2.0/advisories/', getAdvisories(testsSample))

    cy.then(async () => {
      const data = await getData()

      expect(data.advisories).to.deep.equal(getAdvisories(testsSample))
    })
  })
})
