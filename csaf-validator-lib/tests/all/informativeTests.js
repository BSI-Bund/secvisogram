import { MockAgent } from 'undici'
import sortObjectKeys from '../../lib/shared/sortObjectKeys.js'
import minimalDoc from '../shared/minimalCSAFBaseDoc.js'

function mockAgent() {
  const mockAgent = new MockAgent()
  mockAgent.disableNetConnect()

  mockAgent
    .get('https://example.com')
    .intercept({
      method: 'HEAD',
      path: '/security/data/csaf/2021/my-thing-_10.json',
    })
    .reply(200, 'Found')

  mockAgent
    .get('https://github.com')
    .intercept({ method: 'HEAD', path: '/secvisogram/secvisogram' })
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
            product_identification_helper: {
              hashes: [
                {
                  file_hashes: [
                    {
                      algorithm: 'sha256',
                      value:
                        '6ae24620ea9656230f49234efd0789356ae24620ea9656230f49234efd078935',
                    },
                  ],
                  filename: 'product_a.so',
                },
              ],
            },
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
            product_identification_helper: {
              hashes: [
                {
                  file_hashes: [
                    {
                      algorithm: 'sha256',
                      value:
                        '6ae24620ea9656230f49234efd0789356ae24620ea9656230f49234efd078935',
                    },
                  ],
                  filename: 'product_a.so',
                },
              ],
            },
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
              product_identification_helper: {
                hashes: [
                  {
                    file_hashes: [
                      {
                        algorithm: 'sha256',
                        value:
                          '6ae24620ea9656230f49234efd0789356ae24620ea9656230f49234efd078935',
                      },
                    ],
                    filename: 'product_a.so',
                  },
                ],
              },
            },
            product_reference: 'CSAFPID-9080700',
            category: 'default_component_of',
            relates_to_product_reference: 'CSAFPID-9080700',
          },
        ],
      },
      vulnerabilities: [
        {
          cve: 'CVE-2019-0708',
          cwe: {
            id: 'CWE-1004',
            name: "Sensitive Cookie Without 'HttpOnly' Flag",
          },
          product_status: {
            recommended: ['CSAFPID-0001'],
          },
        },
      ],
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
        acknowledgments: [
          {
            urls: ['https://example.invalid'],
          },
        ],
        aggregate_severity: {
          text: 'Moderate',
          namespace: 'https://example.invalid',
        },
        distribution: {
          tlp: {
            label: 'RED',
            url: 'https://example.invalid',
          },
        },
        publisher: {
          category: 'vendor',
          name: 'Example PUB',
          namespace: 'https://example.invalid',
        },
      },
      product_tree: {
        full_product_names: [
          {
            product_id: 'CSAFPID-0001',
            name: 'Some sample product',
            product_identification_helper: {
              hashes: [
                {
                  file_hashes: [
                    {
                      algorithm: 'sha256',
                      value:
                        '6ae24620ea9656230f49234efd0789356ae24620ea9656230f49234efd078935',
                    },
                  ],
                  filename: 'product_a.so',
                },
              ],
              sbom_urls: ['https://example.invalid'],
              x_generic_uris: [
                {
                  namespace: 'https://example.invalid',
                  uri: 'https://example.invalid',
                },
              ],
            },
          },
        ],
        branches: [
          {
            name: 'my branch',
            category: 'vendor',
            branches: [
              {
                name: 'Product Name',
                category: 'product_name',
                branches: [
                  {
                    name: 'Product Version',
                    category: 'product_version',
                    branches: [
                      {
                        name: 'my branch',
                        category: 'architecture',
                        product: {
                          name: 'Product A',
                          product_id: 'CSAFPID-9080700',
                          product_identification_helper: {
                            hashes: [
                              {
                                file_hashes: [
                                  {
                                    algorithm: 'sha256',
                                    value:
                                      '6ae24620ea9656230f49234efd0789356ae24620ea9656230f49234efd078935',
                                  },
                                ],
                                filename: 'product_a.so',
                              },
                            ],
                            sbom_urls: ['https://example.invalid'],
                            x_generic_uris: [
                              {
                                namespace: 'https://example.invalid',
                                uri: 'https://example.invalid',
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        relationships: [
          {
            full_product_name: {
              name: 'Foo',
              product_id: 'CSAFPID-0002',
              product_identification_helper: {
                sbom_urls: ['https://example.invalid'],
                x_generic_uris: [
                  {
                    namespace: 'https://example.invalid',
                    uri: 'https://example.invalid',
                  },
                ],
              },
            },
            product_reference: 'CSAFPID-0001',
            category: 'optional_component_of',
            relates_to_product_reference: 'CSAFPID-9080700',
          },
        ],
      },
      vulnerabilities: [
        {
          product_status: {
            fixed: ['CSAFPID-0001'],
          },
          cve: 'CVE-1111-11111',
          cwe: {
            id: 'CWE-1004',
            name: "Sensitive Cookie Without 'HttpOnly' Flag",
          },
        },
        {
          product_status: {
            fixed: ['CSAFPID-0002'],
          },
          cve: 'CVE-1111-22222',
          cwe: {
            id: 'CWE-1004',
            name: "Sensitive Cookie Without 'HttpOnly' Flag",
          },
          acknowledgments: [
            {
              urls: ['https://example.invalid'],
            },
          ],
          references: [
            {
              summary: 'Some reference',
              url: 'https://example.invalid',
              category: 'external',
            },
          ],
          remediations: [
            {
              category: 'workaround',
              details: 'Some remediation',
              product_ids: ['CSAFPID-0001'],
              url: 'https://example.invalid',
            },
          ],
        },
      ],
    }),
    mockAgent() {
      const m = mockAgent()

      for (let i = 0; i < 17; ++i) {
        m.get('https://example.invalid')
          .intercept({ method: 'HEAD', path: '/' })
          .reply(404, 'Not Found')
      }

      return m
    },
    expectedNumberOfInfos: 17,
  },

  {
    title: 'Informative test 6.3.6 accepts 302 redirect',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      document: {
        ...minimalDoc.document,
        references: [
          ...minimalDoc.document.references,
          {
            summary:
              'A URL that does not resolve with HTTP status code in the interval between (including) 200 and (excluding) 400.',
            url: 'https://example.valid',
          },
        ],
      },
    }),
    mockAgent() {
      const m = mockAgent()

      m.get('https://example.valid')
        .intercept({ method: 'HEAD', path: '/' })
        .reply(302, 'Found')

      return m
    },
    expectedNumberOfInfos: 0,
  },

  {
    title: 'Informative test 6.3.6 catches network errors',
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
    mockAgent,
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
            url: 'https://example.com/security/data/csaf/2021/my-thing-_11.json',
          },
        ],
        tracking: {
          ...minimalDoc.document.tracking,
          id: 'My-Thing-.11',
        },
      },
      vulnerabilities: [
        {
          cve: 'CVE-1111-11111',
          cwe: {
            id: 'CWE-1004',
            name: "Sensitive Cookie Without 'HttpOnly' Flag",
          },
          references: [
            {
              summary: 'A self reference',
              category: 'self',
              url: 'https://example.com/security/data/csaf/2021/my-thing-_11.json',
            },
          ],
        },
      ],
    }),
    mockAgent() {
      const m = mockAgent()

      for (let i = 0; i < 2; ++i) {
        m.get('https://example.com')
          .intercept({
            method: 'HEAD',
            path: '/security/data/csaf/2021/my-thing-_11.json',
          })
          .reply(404, 'Not Found')
      }

      return m
    },
    expectedNumberOfInfos: 2,
  },

  {
    title: 'Informative test 6.3.7 accepts 302 redirect',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      document: {
        ...minimalDoc.document,
        references: [
          {
            category: 'self',
            summary: 'A non-canonical URL.',
            url: 'https://example.com/security/data/csaf/2021/my-thing-_10.json',
          },
        ],
        tracking: {
          ...minimalDoc.document.tracking,
          id: 'My-Thing-.10',
        },
      },
    }),
    mockAgent() {
      const m = mockAgent()

      m.get('https://example.com')
        .intercept({
          method: 'HEAD',
          path: '/security/data/csaf/2021/my-thing-_10.json',
        })
        .reply(302, 'Found')

      return m
    },
    expectedNumberOfInfos: 0,
  },

  {
    title: 'Informative test 6.3.7 catches network errors',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      document: {
        ...minimalDoc.document,
        references: [
          {
            category: 'self',
            summary: 'A non-canonical URL.',
            url: 'https://example.invalid/security/data/csaf/2021/my-thing-_10.json',
          },
        ],
        tracking: {
          ...minimalDoc.document.tracking,
          id: 'My-Thing-.10',
        },
      },
    }),
    mockAgent,
    expectedNumberOfInfos: 1,
  },

  {
    title: 'Informative test 6.3.10 detects usage of product version range',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      product_tree: {
        branches: [
          {
            name: 'Vendor',
            category: 'vendor',
            branches: [
              {
                name: 'Product Name',
                category: 'product_name',
                branches: [
                  {
                    name: 'Product Version',
                    category: 'product_version',
                    branches: [
                      {
                        name: 'vers:a0/foo',
                        category: 'product_version_range',
                        product: {
                          name: 'Product A',
                          product_id: 'CSAFPID-9080700',
                          product_identification_helper: {
                            hashes: [
                              {
                                file_hashes: [
                                  {
                                    algorithm: 'sha256',
                                    value:
                                      '6ae24620ea9656230f49234efd0789356ae24620ea9656230f49234efd078935',
                                  },
                                ],
                                filename: 'product_a.so',
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      vulnerabilities: [
        {
          cve: 'CVE-1111-11111',
          cwe: {
            id: 'CWE-1004',
            name: "Sensitive Cookie Without 'HttpOnly' Flag",
          },
          notes: [
            {
              category: 'description',
              text: 'This is a sample note',
            },
          ],
          product_status: {
            fixed: ['CSAFPID-9080700'],
          },
        },
      ],
    }),
    mockAgent,
    expectedNumberOfInfos: 1,
  },

  {
    title: 'Informative test 6.3.11 detects usage of v as version indicator',
    content: sortObjectKeys(new Intl.Collator(), {
      ...minimalDoc,
      product_tree: {
        branches: [
          {
            name: 'Vendor',
            category: 'vendor',
            branches: [
              {
                name: 'Product Name',
                category: 'product_name',
                branches: [
                  {
                    name: 'Product Version',
                    category: 'product_version',
                    branches: [
                      {
                        category: 'product_version',
                        name: 'v4.2',
                        product: {
                          name: 'Product A',
                          product_id: 'CSAFPID-9080700',
                          product_identification_helper: {
                            hashes: [
                              {
                                file_hashes: [
                                  {
                                    algorithm: 'sha256',
                                    value:
                                      '6ae24620ea9656230f49234efd0789356ae24620ea9656230f49234efd078935',
                                  },
                                ],
                                filename: 'product_a.so',
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      vulnerabilities: [
        {
          cve: 'CVE-1111-11111',
          cwe: {
            id: 'CWE-1004',
            name: "Sensitive Cookie Without 'HttpOnly' Flag",
          },
          notes: [
            {
              category: 'description',
              text: 'This is a sample note',
            },
          ],
          product_status: {
            fixed: ['CSAFPID-9080700'],
          },
        },
      ],
    }),
    mockAgent,
    expectedNumberOfInfos: 1,
  },
]
