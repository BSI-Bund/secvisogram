/// <reference types="cypress" />

import createFileName from '../../lib/shared/createFileName'

describe('Unit Test Functions', function () {
  context('createFileName.js', function () {
    it('should default to csaf_2_0', function () {
      const fileName = createFileName({}, true, 'json')
      expect(fileName).to.eq('csaf_2_0.json')
    })

    it('should add the "_invalid" suffix', function () {
      const fileName = createFileName({}, false, 'json')
      expect(fileName).to.eq('csaf_2_0_invalid.json')
    })

    it('should use document.tracking.id as name', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'filename' } } },
        true,
        'json'
      )
      expect(fileName).to.eq('filename.json')
    })

    it('should add the given extension', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'filename' } } },
        true,
        'abcd'
      )
      expect(fileName).to.eq('filename.abcd')
    })

    it('should convert document.tracking.id to lowercase', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'FILENAME' } } },
        true,
        'json'
      )
      expect(fileName).to.eq('filename.json')
    })

    it('should replace special characters with underscore', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'file$name' } } },
        true,
        'json'
      )
      expect(fileName).to.eq('file_name.json')
    })

    it('should replace special characters with underscore in all places', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'f?i l§e$n!a#m=e' } } },
        true,
        'json'
      )
      expect(fileName).to.eq('f_i_l_e_n_a_m_e.json')
    })

    it('should replace multiple special characters with a single underscore', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'file#*$name' } } },
        true,
        'json'
      )
      expect(fileName).to.eq('file_name.json')
    })

    it('should not replace + and - characters with underscore', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'file+name-123' } } },
        true,
        'json'
      )
      expect(fileName).to.eq('file+name-123.json')
    })

    it('should not replace digits with underscore', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'file$name_123' } } },
        true,
        'json'
      )
      expect(fileName).to.eq('file_name_123.json')
    })

    it('should replace multiple underscores with a single one', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'filename_____123' } } },
        true,
        'json'
      )
      expect(fileName).to.eq('filename_123.json')
    })

    it('should combine all rules', function () {
      const fileName = createFileName(
        { document: { tracking: { id: 'FiLe$$$$$NaMe____1+2-3' } } },
        false,
        'json'
      )
      expect(fileName).to.eq('file_name_1+2-3_invalid.json')
    })
  })
})
