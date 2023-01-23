/// <reference types="cypress" />

import createFileName from '../../lib/shared/createFileName'
import pruneEmpty from '../../lib/app/shared/pruneEmpty.js'
import isPropertyRelevant from '../../lib/app/SecvisogramPage/shared/isPropertyRelevant.js'

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

  context('pruneEmpty.js', function () {
    const testData = [
      [{}, {}],
      [{ a: 1 }, { a: 1 }],
      [{ a: 'bcd' }, { a: 'bcd' }],
      [{ a: '' }, {}],
      [{ a: {} }, {}],
      [{ a: { b: { c: {} } } }, {}],
      [{ a: { b: { c: { d: 123 } } } }, { a: { b: { c: { d: 123 } } } }],
      // special cases for arrays with elements identified as empty
      [{ a: [{}] }, { a: [{}] }],
      [{ a: [''] }, { a: [''] }],
    ]
    testData.forEach((data) => {
      const input = data[0]
      const expectedOutput = data[1]
      it('should prune the input to expected output', function () {
        expect(pruneEmpty(input)).to.deep.eq(expectedOutput)
      })
    })
  })

  context('isPropertyRelevant.js', function () {
    const relevanceLevels = [
      'mandatory',
      'best_practice',
      'want_to_have',
      'nice_to_know',
      'optional',
      'excluded',
    ]
    const property = {
      metaData: {
        relevanceLevels: {
          csaf_base: 'mandatory',
          csaf_security_incident_response: 'best_practice',
          csaf_informational_advisory: 'want_to_have',
          csaf_security_advisory: 'nice_to_know',
          csaf_vex: 'optional',
        },
      },
    }

    const testData = [
      [
        {
          relevanceLevels,
          category: 'csaf_base',
          property,
          selectedRelevanceLevel: 'mandatory',
        },
        true,
      ],
      [
        {
          relevanceLevels,
          category: 'csaf_base',
          property,
          selectedRelevanceLevel: 'optional',
        },
        true,
      ],
      [
        {
          relevanceLevels,
          category: 'csaf_security_incident_response',
          property,
          selectedRelevanceLevel: 'mandatory',
        },
        false,
      ],
      [
        {
          relevanceLevels,
          category: 'csaf_security_incident_response',
          property,
          selectedRelevanceLevel: 'best_practice',
        },
        true,
      ],
      [
        {
          relevanceLevels,
          category: undefined,
          property,
          selectedRelevanceLevel: 'mandatory',
        },
        true,
      ],
    ]
    testData.forEach((data) => {
      const input = data[0]
      const expectedOutput = data[1]
      it('should correctly identify if field is relevant', function () {
        // @ts-ignore
        expect(isPropertyRelevant(input)).to.eq(expectedOutput)
      })
    })
  })
})
