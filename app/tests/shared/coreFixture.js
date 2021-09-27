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

    // Fails "6.1.7 Multiple Scores with same Version per Product"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        product_tree: {
          full_product_names: [
            {
              product_id: 'CSAFPID-9080700',
              name: 'Product A',
            },
          ],
        },
        vulnerabilities: [
          {
            scores: [
              {
                products: ['CSAFPID-9080700'],
                cvss_v3: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
                  baseScore: 10,
                  baseSeverity: 'CRITICAL',
                },
              },
              {
                products: ['CSAFPID-9080700'],
                cvss_v3: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
              },
            ],
          },
        ],
      },
    },

    // Fails "6.1.7 Multiple Scores with same Version per Product"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        product_tree: {
          full_product_names: [
            {
              product_id: 'CSAFPID-9080700',
              name: 'Product A',
            },
          ],
        },
        vulnerabilities: [
          {
            scores: [
              {
                products: ['CSAFPID-9080700'],
                cvss_v2: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                  baseScore: 10,
                },
              },
              {
                products: ['CSAFPID-9080700'],
                cvss_v2: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  baseScore: 6.5,
                },
              },
            ],
          },
        ],
      },
    },

    // Passes "6.1.7 Multiple Scores with same Version per Product"
    {
      valid: true,
      content: {
        ...MINIMAL_DOC,
        product_tree: {
          full_product_names: [
            {
              product_id: 'CSAFPID-9080700',
              name: 'Product A',
            },
          ],
        },
        vulnerabilities: [
          {
            scores: [
              {
                products: ['CSAFPID-9080700'],
                cvss_v2: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                  baseScore: 10,
                },
              },
            ],
          },
          {
            scores: [
              {
                products: ['CSAFPID-9080700'],
                cvss_v2: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                  baseScore: 10,
                },
              },
            ],
          },
        ],
      },
    },

    // Passes "6.1.7 Multiple Scores with same Version per Product"
    {
      valid: true,
      content: {
        ...MINIMAL_DOC,
        product_tree: {
          full_product_names: [
            {
              product_id: 'CSAFPID-9080700',
              name: 'Product A',
            },
          ],
        },
        vulnerabilities: [
          {
            scores: [
              {
                products: ['CSAFPID-9080700'],
                cvss_v3: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
                  baseScore: 10,
                  baseSeverity: 'CRITICAL',
                },
              },
              {
                products: ['CSAFPID-9080700'],
                cvss_v3: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:H',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
              },
            ],
          },
        ],
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

    // Fails "6.1.23 Multiple Use of Same CVE"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        vulnerabilities: [
          {
            cve: 'CVE-2017-0145',
          },
          {
            cve: 'CVE-2017-0145',
          },
        ],
      },
    },

    // Fails "6.1.24 Definition in Involvements"
    {
      valid: false,
      content: {
        ...MINIMAL_DOC,
        vulnerabilities: [
          {
            involvements: [
              {
                date: '2021-04-23T10:00:00.000Z',
                party: 'vendor',
                status: 'in_progress',
              },
              {
                date: '2021-04-23T10:00:00.000Z',
                party: 'vendor',
                status: 'in_progress',
                summary:
                  'The vendor has released a mitigation and is working to fully resolve the issue.',
              },
            ],
          },
        ],
      },
    },
  ],
}
