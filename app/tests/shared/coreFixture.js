import valid1 from '../../seeds/documents/valid-1.json'
import valid2 from '../../seeds/documents/valid-2.json'

const MINIMAL_DOC = {
  document: {
    category: 'Test Report',
    csaf_version: '2.0',
    title: 'Minimal valid',
    publisher: {
      category: 'other',
      name: 'Secvisogram Automated Tester',
      namespace: 'https://github.com/secvisogram/secvisogram',
    },
    tracking: {
      current_release_date: '2021-01-14T00:00:00.000Z',
      id: '1',
      initial_release_date: '2021-01-14T00:00:00.000Z',
      revision_history: [
        {
          number: '1',
          date: '2021-01-14T00:00:00.000Z',
          summary: 'Summary',
        },
      ],
      status: 'draft',
      version: '1',
    },
  },
}

/**
 * @typedef {T extends Promise<infer R> ? R : unknown} Unpromisify
 * @template T
 */

export default {
  document: {},
  documents: [
    { valid: true, content: valid1, strippedVersion: valid1 },
    { valid: true, content: valid2, strippedVersion: valid2 },
    { valid: false, content: {}, strippedVersion: {} },
    {
      valid: false,
      content: {
        document: {
          category: 'Test Report',
          csaf_version: '2.0',
          title: 'Minimal valid',
          publisher: {
            category: 'other',
            name: 'Secvisogram Automated Tester',
            namespace: 'https://github.com/secvisogram/secvisogram',
          },
          tracking: {
            current_release_date: '2021-01-14T00:00:00.000Z',
            id: '1',
            initial_release_date: '2021-01-14T00:00:00.000Z',
            revision_history: [
              {
                date: '2021-01-14T00:00:00.000Z',
                summary: 'Summary',
              },
            ],
            status: 'draft',
            version: '1',
          },
        },
      },
      strippedVersion: {},
    },
    {
      valid: true,
      content: {
        ...MINIMAL_DOC,
        emptyAdditionalStringProp: '',
      },
      strippedVersion: {
        ...MINIMAL_DOC,
      },
    },
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          lang: 'XX',
        },
      },
      strippedVersion: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
        },
      },
    },
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          source_lang: 'XX',
        },
      },
      strippedVersion: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
        },
      },
    },
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        vulnerabilities: [
          {
            cwe: {
              id: 'CWE-1005',
              name: "Sensitive Cookie Without 'HttpOnly' Flag",
            },
          },
        ],
      },
      strippedVersion: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
        },
      },
    },
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        vulnerabilities: [
          {
            cwe: {
              id: 'CWE-1007',
              name: "Sensitive Cookie Without 'HttpOnly' Flag",
            },
          },
        ],
      },
      strippedVersion: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
        },
      },
    },
    {
      valid: false,
      content: {
        document: {
          category: 'Test Report',
          csaf_version: '2.0',
          title: 'Minimal valid',
          publisher: {
            category: 'other',
            name: 'Secvisogram Automated Tester',
            namespace: 'https://github.com/secvisogram/secvisogram',
          },
          tracking: {
            current_release_date: '2021-01-14T00:00:00.000Z',
            id: '1',
            initial_release_date: '2021-01-14T00:00:00.000Z',
            revision_history: [
              {
                number: '1',
                date: '2021-01-14T00:00:00.000Z',
                summary: 'Summary',
              },
            ],
            status: 'draft',
            version: '1',
          },
          acknowledgments: [],
          vulnerabilities: null,
          someOtherProp: {},
        },
      },
      strippedVersion: {
        document: {
          category: 'Test Report',
          csaf_version: '2.0',
          title: 'Minimal valid',
          publisher: {
            category: 'other',
            name: 'Secvisogram Automated Tester',
            namespace: 'https://github.com/secvisogram/secvisogram',
          },
          tracking: {
            current_release_date: '2021-01-14T00:00:00.000Z',
            id: '1',
            initial_release_date: '2021-01-14T00:00:00.000Z',
            revision_history: [
              {
                number: '1',
                date: '2021-01-14T00:00:00.000Z',
                summary: 'Summary',
              },
            ],
            status: 'draft',
            version: '1',
          },
        },
      },
    },
    {
      valid: false,
      content: {
        aggregate_severity: {
          namespace:
            'https://access.redhat.com/security/updates/classification/',
          text: 'Moderate',
        },
      },
      strippedVersion: {},
    },

    // Fails "6.1.16 Released Revision History"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                number: '2',
                date: '2021-01-14T00:00:00.000Z',
                summary: 'Summary',
              },
            ],
            version: '1',
          },
        },
      },
    },

    // Passes "6.1.16 Released Revision History"
    {
      valid: true,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                number: '2.0.0+123',
                date: '2021-01-14T00:00:00.000Z',
                summary: 'Summary',
              },
            ],
            version: '2.0.0+234',
          },
        },
      },
    },

    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                number: '0.1.0',
                date: '2021-01-14T00:00:00.000Z',
                summary: 'Summary',
              },
            ],
            status: 'final',
            version: '0.1.0',
          },
        },
      },
    },

    // Fails "6.1.18 Released Revision History"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                date: '2021-05-17T10:00:00.000Z',
                number: '0',
                summary: 'First draft',
              },
              {
                date: '2021-07-21T10:00:00.000Z',
                number: '1',
                summary: 'Initial version.',
              },
            ],
            status: 'final',
            version: '1',
          },
        },
      },
    },

    // Fails "6.1.18 Released Revision History"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                date: '2021-05-17T10:00:00.000Z',
                number: '0.1.0',
                summary: 'First draft',
              },
              {
                date: '2021-07-21T10:00:00.000Z',
                number: '1.0.0',
                summary: 'Initial version.',
              },
            ],
            status: 'final',
            version: '1.0.0',
          },
        },
      },
    },

    // Fails "6.1.18 Released Revision History"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                date: '2021-05-17T10:00:00.000Z',
                number: '0',
                summary: 'First draft',
              },
              {
                date: '2021-07-21T10:00:00.000Z',
                number: '1',
                summary: 'Initial version.',
              },
            ],
            status: 'interim',
            version: '1',
          },
        },
      },
    },

    // Fails "6.1.19 Revision History Entries for Pre-release Versions"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                date: '2021-04-23T10:00:00.000Z',
                number: '1.0.0-rc',
                summary: 'Release Candidate for initial version.',
              },
              {
                date: '2021-04-23T11:00:00.000Z',
                number: '1.0.0',
                summary: 'Initial version.',
              },
            ],
            version: '1.0.0',
            status: 'draft',
          },
        },
      },
    },

    // Fails "6.1.20 Non-draft Document Version"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                date: '2021-04-23T10:00:00.000Z',
                number: '1.0.0-rc',
                summary: 'Release Candidate for initial version.',
              },
            ],
            version: '1.0.0-rc',
            status: 'final',
          },
        },
      },
    },

    // Fails "6.1.20 Non-draft Document Version"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                date: '2021-04-23T10:00:00.000Z',
                number: '1.0.0-rc',
                summary: 'Release Candidate for initial version.',
              },
            ],
            version: '1.0.0-rc',
            status: 'interim',
          },
        },
      },
    },

    // Fails "6.1.22 Multiple Definition in Revision History"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                date: '2021-07-20T10:00:00.000Z',
                number: '1',
                summary: 'Initial version.',
              },
              {
                date: '2021-07-21T10:00:00.000Z',
                number: '1',
                summary: 'Some other changes.',
              },
            ],
            version: '1',
          },
        },
      },
    },

    // Fails "6.1.22 Multiple Definition in Revision History"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        document: {
          ...MINIMAL_DOC.document,
          tracking: {
            ...MINIMAL_DOC.document.tracking,
            revision_history: [
              {
                date: '2021-07-20T10:00:00.000Z',
                number: '1.0.0',
                summary: 'Initial version.',
              },
              {
                date: '2021-07-21T10:00:00.000Z',
                number: '1.0.0',
                summary: 'Some other changes.',
              },
            ],
            version: '1.0.0',
          },
        },
      },
    },
  ],
}
