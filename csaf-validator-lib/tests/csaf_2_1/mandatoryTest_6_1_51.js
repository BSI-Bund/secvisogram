import assert from 'node:assert/strict'
import { mandatoryTest_6_1_51 } from '../../csaf_2_1/mandatoryTests/mandatoryTest_6_1_51.js'

describe('mandatoryTest_6_1_51', function () {
  it('only runs on relevant documents', function () {
    assert.equal(mandatoryTest_6_1_51({ document: 'mydoc' }).isValid, true)
  })

  it('skips status draft', function () {
    assert.equal(
      mandatoryTest_6_1_51({
        document: {
          tracking: {
            revision_history: [],
            status: 'draft',
          },
        },
        vulnerabilities: [],
      }).isValid,
      true
    )
  })

  it('skips empty revision_history object', function () {
    assert.equal(
      mandatoryTest_6_1_51({
        document: {
          tracking: {
            revision_history: [
              {}, // should be ignored
              { date: '2024-01-24T10:00:00.000Z' },
            ],
            status: 'final',
          },
        },
        vulnerabilities: [
          {
            metrics: [
              {
                content: {
                  epss: {
                    timestamp: '2024-01-24T12:34:56.789Z',
                  },
                },
              },
            ],
          },
        ],
      }).isValid,
      false
    )
  })

  it('skips empty vulnerability object', function () {
    assert.equal(
      mandatoryTest_6_1_51({
        document: {
          tracking: {
            revision_history: [{ date: '2024-01-24T10:00:00.000Z' }],
            status: 'final',
          },
        },
        vulnerabilities: [
          {}, // should be ignored
          {
            metrics: [
              {
                content: {
                  epss: {
                    timestamp: '2024-01-24T12:34:56.789Z',
                  },
                },
              },
            ],
          },
        ],
      }).isValid,
      false
    )
  })

  it('skips empty metrics object', function () {
    assert.equal(
      mandatoryTest_6_1_51({
        document: {
          tracking: {
            revision_history: [{ date: '2024-01-24T10:00:00.000Z' }],
            status: 'final',
          },
        },
        vulnerabilities: [
          {
            metrics: [
              {}, // should be ignored
              {
                content: {
                  epss: {
                    timestamp: '2024-01-24T12:34:56.789Z',
                  },
                },
              },
            ],
          },
        ],
      }).isValid,
      false
    )
  })

  it('skips empty epss object', function () {
    assert.equal(
      mandatoryTest_6_1_51({
        document: {
          tracking: {
            revision_history: [{ date: '2024-01-24T10:00:00.000Z' }],
            status: 'final',
          },
        },
        vulnerabilities: [
          {
            metrics: [
              {
                content: {
                  epss: {}, // should be ignored
                },
              },
              {
                content: {
                  epss: {
                    timestamp: '2024-01-24T12:34:56.789Z',
                  },
                },
              },
            ],
          },
        ],
      }).isValid,
      false
    )
  })
})
