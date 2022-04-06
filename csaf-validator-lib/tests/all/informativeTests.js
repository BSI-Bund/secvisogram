import { MockAgent } from 'undici'
import sortObjectKeys from '../../lib/shared/sortObjectKeys.js'
import minimalDoc from '../shared/minimalCSAFBaseDoc.js'

function mockAgent() {
  const mockAgent = new MockAgent()

  mockAgent
    .get('https://example.com')
    .intercept({
      method: 'HEAD',
      path: '/security/data/csaf/2021/my_thing__10.json',
    })
    .reply(200, 'Found')

  return mockAgent
}

export default [
  {
    title:
      'Informative test 6.3.1 detects use of cvss v2 as the only scoring system',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
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
          cve: 'CVE-1234-4321',
          cwe: {
            id: 'CWE-1004',
            name: "Sensitive Cookie Without 'HttpOnly' Flag",
          },
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
    }),
    mockAgent,
    expectedNumberOfInfos: 1,
  },

  {
    title: 'Informative test 6.3.2 detects use of cvss v3.0',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
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
          cve: 'CVE-1234-4321',
          cwe: {
            id: 'CWE-1004',
            name: "Sensitive Cookie Without 'HttpOnly' Flag",
          },
          scores: [
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
    }),
    mockAgent,
    expectedNumberOfInfos: 1,
  },

  {
    title: 'Informative test 6.3.3 detects missing cve',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      vulnerabilities: [
        {
          title: 'BlueKeep',
          cwe: {
            id: 'CWE-1004',
            name: "Sensitive Cookie Without 'HttpOnly' Flag",
          },
        },
      ],
    }),
    mockAgent,
    expectedNumberOfInfos: 1,
  },

  {
    title: 'Informative test 6.3.3 detects missing cwe',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      vulnerabilities: [
        {
          cve: 'CVE-2019-0708',
          title: 'BlueKeep',
        },
      ],
    }),
    mockAgent,
    expectedNumberOfInfos: 1,
  },

  {
    title: 'Informative test 6.3.5 detects use of short hash',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      product_tree: {
        full_product_names: [
          {
            name: 'Product A',
            product_id: 'CSAFPID-9080700',
            product_identification_helper: {
              hashes: [
                {
                  file_hashes: [
                    {
                      algorithm: 'md4',
                      value: '3202b50e2e5b2fcd75e284c3d9d5f8d6',
                    },
                  ],
                  filename: 'product_a.so',
                },
              ],
            },
          },
        ],
        relationships: [
          {
            full_product_name: {
              name: 'Foo',
              product_id: 'CSAFPID-0001',
            },
            product_reference: 'CSAFPID-9080700',
            category: 'default_component_of',
            relates_to_product_reference: 'CSAFPID-9080700',
          },
        ],
      },
    }),
    mockAgent,
    expectedNumberOfInfos: 1,
  },

  {
    title:
      'Informative test 6.3.6 detects use of non-self referencing urls failing to resolve',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      document: {
        ...minimalDoc.document,
        references: [
          ...minimalDoc.document.references,
          {
            summary:
              'A URL that does not resolve with HTTP status code in the interval between (including) 200 and (excluding) 400.',
            url: 'https://example.invalid',
          },
        ],
      },
    }),
    mockAgent() {
      const m = mockAgent()

      m.get('https://example.invalid')
        .intercept({ method: 'HEAD', path: '/' })
        .reply(404, 'Not Found')

      return m
    },
    expectedNumberOfInfos: 1,
  },

  {
    title:
      'Informative test 6.3.7 detects use of self referencing urls failing to resolve',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      document: {
        ...minimalDoc.document,
        references: [
          {
            category: 'self',
            summary: 'A non-canonical URL.',
            url: 'https://example.com/security/data/csaf/2021/my_thing__10.json',
          },
        ],
        tracking: {
          ...minimalDoc.document.tracking,
          id: 'My-Thing-.10',
        },
      },
    }),
    mockAgent() {
      const mockAgent = new MockAgent()

      mockAgent
        .get('https://example.com')
        .intercept({
          method: 'HEAD',
          path: '/security/data/csaf/2021/my_thing__10.json',
        })
        .reply(404, 'Not Found')

      return mockAgent
    },
    expectedNumberOfInfos: 1,
  },
]
