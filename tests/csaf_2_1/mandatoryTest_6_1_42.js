import assert from 'node:assert/strict'
import { expect } from 'chai'

import {
  mandatoryTest_6_1_42,
  checkPurls,
} from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_42.js'

describe('mandatoryTest_6_1_42', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_42({ product_tree: 'mydoc' }).isValid, true)
  })

  it('test checkPurls', function () {
    expect(checkPurls([]), 'empty purl array').to.eql([])
    expect(checkPurls(['invalid']), 'invalid PURL').to.eql([])
    expect(
      checkPurls([
        'pkg:golang/google.golang.org/genproto#googleapis/api/annotations',
        'pkg:golang/google.golang.org/genproto#googleapis/api/test',
      ]),
      'only change in subpath'
    ).to.eql([])
    expect(
      checkPurls([
        'pkg:deb/debian/curl@7.50.3-1?arch=i386&distro=jessie',
        'pkg:deb/debian/curl@7.50.3-1?arch=i386&distro=buster',
      ]),
      'only change in qualifier'
    ).to.eql([])
    expect(
      checkPurls([
        'pkg:golang/google.golang.org/genproto#googleapis/api/annotations',
        'pkg:golang/google.golang.com/genproto#googleapis/api/annotations',
      ]),
      'change in namespace'
    ).to.eql([{ index: 1, purlParts: ['namespace'] }])
    expect(
      checkPurls([
        'pkg:golang/google.golang.org/genproto#googleapis/api/annotations',
        'pkg:npm/google.golang.org/genproto#googleapis/api/annotations',
      ]),
      'change in type'
    ).to.eql([{ index: 1, purlParts: ['type'] }])
    expect(
      checkPurls([
        'pkg:golang/google.golang.org/genproto#googleapis/api/annotations',
        'pkg:golang/google.golang.org/genproto2#googleapis/api/annotations',
      ]),
      'change in name'
    ).to.eql([{ index: 1, purlParts: ['name'] }])
    expect(
      checkPurls([
        'pkg:npm/%40angular/animation@12.3.1',
        'invalid',
        'pkg:npm/%40angular/animation@12.3.2',
        'pkg:golang/%40angular/animation@12.3.3',
      ]),
      'change in version and invalid PURL'
    ).to.eql([
      { index: 2, purlParts: ['version'] },
      { index: 3, purlParts: ['type', 'version'] },
    ])
  })
})
