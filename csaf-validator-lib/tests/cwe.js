import { expect } from 'chai'
import * as cwe from '../cwe.js'
import cweCatalogue from '../lib/shared/cwec.js'

describe('cwe', function () {
  it('exports all cwe weaknesses', function () {
    expect(cwe.weaknesses).to.deep.equal(cweCatalogue.weaknesses)
  })
})
