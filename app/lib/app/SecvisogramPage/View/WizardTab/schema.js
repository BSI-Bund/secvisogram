/** @typedef {import('./shared/types').Property} Property */
export default {
  key: '',
  fullName: [],
  title: 'Common Security Advisory Framework',
  description:
    'Representation of security advisory information as a JSON document.',
  addMenuItemsForChildObjects: true,
  metaData: { addMenuItemsForChildObjects: true },
  type: 'OBJECT',
  metaInfo: {
    propertyList: [
      {
        key: 'document',
        fullName: ['document'],
        title: 'Document level meta-data',
        description:
          'Captures the meta-data about this document describing a particular set of security advisories.',
        metaData: {
          userDocumentation: {
            specification: 'docs/user/document-spec.en.md',
            usage: 'docs/user/document-usage.en.md',
          },
          i18n: { title: 'DocumentTitle', description: 'DocumentDescription' },
          relevanceLevels: {
            csafBase: 'mandatory',
            csafSecurityIncidentResponse: 'mandatory',
            csafInformationalAdvisory: 'mandatory',
            csafSecurityAdvisory: 'mandatory',
            csafVex: 'mandatory',
          },
        },
        type: 'OBJECT',
        metaInfo: {
          propertyList: [
            {
              key: 'acknowledgments',
              fullName: ['document', 'acknowledgments'],
              title: 'List of acknowledgments',
              description: 'Contains a list of acknowledgment elements.',
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/document/acknowledgments-spec.en.md',
                  usage: 'docs/user/document/acknowledgments-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'optional',
                  csafSecurityIncidentResponse: 'optional',
                  csafInformationalAdvisory: 'optional',
                  csafSecurityAdvisory: 'best_practice',
                  csafVex: 'want_to_have',
                },
                i18n: {
                  title: 'DocumentAcknowledgmentsTitle',
                  description: 'DocumentAcknowledgmentsDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['document', 'acknowledgments'],
                  title: 'Acknowledgment',
                  description:
                    'Acknowledges contributions by describing those that contributed.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/types/acknowledgments/acknowledgment-spec.en.md',
                      usage:
                        'docs/user/types/acknowledgments/acknowledgment-usage.en.md',
                    },
                    i18n: {
                      title: 'AcknowledgmentsItemsTitle',
                      description: 'AcknowledgmentsItemsDescription',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'names',
                        fullName: ['document', 'acknowledgments', 'names'],
                        title: 'List of acknowledged names',
                        description:
                          'Contains the names of contributors being recognized.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: ['document', 'acknowledgments', 'names'],
                            title: 'Name of the contributor',
                            description:
                              'Contains the name of a single contributor being recognized.',
                            minLength: 1,
                            examples: [
                              'Albert Einstein',
                              'Johann Sebastian Bach',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'organization',
                        fullName: [
                          'document',
                          'acknowledgments',
                          'organization',
                        ],
                        title: 'Contributing organization',
                        description:
                          'Contains the name of a contributing organization being recognized.',
                        minLength: 1,
                        examples: ['CISA', 'Google Project Zero', 'Talos'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'summary',
                        fullName: ['document', 'acknowledgments', 'summary'],
                        title: 'Summary of the acknowledgment',
                        description:
                          'SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties.',
                        minLength: 1,
                        examples: [
                          'First analysis of Coordinated Multi-Stream Attack (CMSA)',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'urls',
                        fullName: ['document', 'acknowledgments', 'urls'],
                        title: 'List of URLs',
                        description:
                          'Specifies a list of URLs or location of the reference to be acknowledged.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: ['document', 'acknowledgments', 'urls'],
                            title: 'URL of acknowledgment',
                            description:
                              'Contains the URL or location of the reference to be acknowledged.',
                            metaInfo: {},
                            type: 'URI',
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'aggregate_severity',
              fullName: ['document', 'aggregate_severity'],
              title: 'Aggregate severity',
              description:
                "Is a vehicle that is provided by the document producer to convey the urgency and criticality with which the one or more vulnerabilities reported should be addressed. It is a document-level metric and applied to the document as a whole — not any specific vulnerability. The range of values in this field is defined according to the document producer's policies and procedures.",
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/document/aggregate_severity-spec.en.md',
                  usage: 'docs/user/document/aggregate_severity-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'optional',
                  csafSecurityIncidentResponse: 'want_to_have',
                  csafInformationalAdvisory: 'want_to_have',
                  csafSecurityAdvisory: 'best_practice',
                  csafVex: 'want_to_have',
                },
                i18n: {
                  title: 'DocumentAggregateSeverityTitle',
                  description: 'DocumentAggregateSeverityDescription',
                },
              },
              type: 'OBJECT',
              metaInfo: {
                propertyList: [
                  {
                    key: 'namespace',
                    fullName: ['document', 'aggregate_severity', 'namespace'],
                    title: 'Namespace of aggregate severity',
                    description: 'Points to the namespace so referenced.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/aggregate_severity/namespace-spec.en.md',
                        usage:
                          'docs/user/document/aggregate_severity/namespace-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'optional',
                        csafSecurityIncidentResponse: 'nice_to_know',
                        csafInformationalAdvisory: 'nice_to_know',
                        csafSecurityAdvisory: 'want_to_have',
                        csafVex: 'nice_to_know',
                      },
                      i18n: {
                        title: 'DocumentAggregateSeverityNamespaceTitle',
                        description:
                          'DocumentAggregateSeverityNamespaceDescription',
                      },
                    },
                    metaInfo: {},
                    type: 'URI',
                  },
                  {
                    key: 'text',
                    fullName: ['document', 'aggregate_severity', 'text'],
                    title: 'Text of aggregate severity',
                    description:
                      'Provides a severity which is independent of - and in addition to - any other standard metric for determining the impact or severity of a given vulnerability (such as CVSS).',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/aggregate_severity/text-spec.en.md',
                        usage:
                          'docs/user/document/aggregate_severity/text-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'optional',
                        csafSecurityIncidentResponse: 'want_to_have',
                        csafInformationalAdvisory: 'want_to_have',
                        csafSecurityAdvisory: 'best_practice',
                        csafVex: 'want_to_have',
                      },
                      i18n: {
                        title: 'DocumentAggregateSeverityTextTitle',
                        description: 'DocumentAggregateSeverityTextDescription',
                      },
                      uiType: 'STRING_MULTI_LINE',
                    },
                    minLength: 1,
                    examples: ['Critical', 'Important', 'Moderate'],
                    metaInfo: {},
                    type: 'STRING',
                  },
                ],
              },
            },
            {
              key: 'category',
              fullName: ['document', 'category'],
              title: 'Document category',
              description:
                'Defines a short canonical name, chosen by the document producer, which will inform the end user as to the category of document.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/category-spec.en.md',
                  usage: 'docs/user/document/category-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'mandatory',
                  csafSecurityIncidentResponse: 'mandatory',
                  csafInformationalAdvisory: 'mandatory',
                  csafSecurityAdvisory: 'mandatory',
                  csafVex: 'mandatory',
                },
                i18n: {
                  title: 'DocumentCategoryTitle',
                  description: 'DocumentCategoryDescription',
                },
                uiType: 'STRING_ENUM',
              },
              minLength: 1,
              examples: [
                'csaf_base',
                'csaf_security_advisory',
                'csaf_vex',
                'Example Company Security Notice',
              ],
              pattern: '^[^\\s\\-_\\.](.*[^\\s\\-_\\.])?$',
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'csaf_version',
              fullName: ['document', 'csaf_version'],
              title: 'CSAF version',
              description:
                'Gives the version of the CSAF specification which the document was generated for.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/csaf_version-spec.en.md',
                  usage: 'docs/user/document/csaf_version-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'mandatory',
                  csafSecurityIncidentResponse: 'mandatory',
                  csafInformationalAdvisory: 'mandatory',
                  csafSecurityAdvisory: 'mandatory',
                  csafVex: 'mandatory',
                },
                i18n: {
                  title: 'DocumentCsafVersionTitle',
                  description: 'DocumentCsafVersionDescription',
                },
                uiType: 'STRING_ENUM',
              },
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'distribution',
              fullName: ['document', 'distribution'],
              title: 'Rules for sharing document',
              description:
                'Describe any constraints on how this document might be shared.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/distribution-spec.en.md',
                  usage: 'docs/user/document/distribution-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'want_to_have',
                  csafSecurityIncidentResponse: 'best_practice',
                  csafInformationalAdvisory: 'best_practice',
                  csafSecurityAdvisory: 'best_practice',
                  csafVex: 'want_to_have',
                },
                i18n: {
                  title: 'DocumentDistributionTitle',
                  description: 'DocumentDistributionDescription',
                },
              },
              type: 'OBJECT',
              metaInfo: {
                propertyList: [
                  {
                    key: 'text',
                    fullName: ['document', 'distribution', 'text'],
                    title: 'Textual description',
                    description:
                      'Provides a textual description of additional constraints.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/distribution/text-spec.en.md',
                        usage:
                          'docs/user/document/distribution/text-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'nice_to_know',
                        csafSecurityIncidentResponse: 'nice_to_know',
                        csafInformationalAdvisory: 'nice_to_know',
                        csafSecurityAdvisory: 'nice_to_know',
                        csafVex: 'nice_to_know',
                      },
                      i18n: {
                        title: 'DocumentDistributionTextTitle',
                        description: 'DocumentDistributionTextDescription',
                      },
                      uiType: 'STRING_MULTI_LINE',
                    },
                    minLength: 1,
                    examples: [
                      'Copyright 2021, Example Company, All Rights Reserved.',
                      'Distribute freely.',
                      'Share only on a need-to-know-basis only.',
                    ],
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'tlp',
                    fullName: ['document', 'distribution', 'tlp'],
                    title: 'Traffic Light Protocol (TLP)',
                    description:
                      'Provides details about the TLP classification of the document.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/distribution/tlp-spec.en.md',
                        usage:
                          'docs/user/document/distribution/tlp-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'want_to_have',
                        csafSecurityIncidentResponse: 'want_to_have',
                        csafInformationalAdvisory: 'want_to_have',
                        csafSecurityAdvisory: 'best_practice',
                        csafVex: 'want_to_have',
                      },
                      i18n: {
                        title: 'DocumentDistributionTlpTitle',
                        description: 'DocumentDistributionTlpDescription',
                      },
                    },
                    type: 'OBJECT',
                    metaInfo: {
                      propertyList: [
                        {
                          key: 'label',
                          fullName: [
                            'document',
                            'distribution',
                            'tlp',
                            'label',
                          ],
                          title: 'Label of TLP',
                          description:
                            'Provides the TLP label of the document.',
                          metaData: {
                            userDocumentation: {
                              specification:
                                'docs/user/document/distribution/tlp/label-spec.en.md',
                              usage:
                                'docs/user/document/distribution/tlp/label-usage.en.md',
                            },
                            relevanceLevels: {
                              csafBase: 'mandatory',
                              csafSecurityIncidentResponse: 'mandatory',
                              csafInformationalAdvisory: 'mandatory',
                              csafSecurityAdvisory: 'mandatory',
                              csafVex: 'mandatory',
                            },
                            i18n: {
                              title: 'DocumentDistributionTlpLabelTitle',
                              description:
                                'DocumentDistributionTlpLabelDescription',
                            },
                            uiType: 'STRING_ENUM',
                          },
                          metaInfo: {},
                          type: 'STRING',
                        },
                        {
                          key: 'url',
                          fullName: ['document', 'distribution', 'tlp', 'url'],
                          title: 'URL of TLP version',
                          description:
                            'Provides a URL where to find the textual description of the TLP version which is used in this document. Default is the URL to the definition by FIRST.',
                          metaData: {
                            userDocumentation: {
                              specification:
                                'docs/user/document/distribution/tlp/url-spec.en.md',
                              usage:
                                'docs/user/document/distribution/tlp/url-usage.en.md',
                            },
                            relevanceLevels: {
                              csafBase: 'nice_to_know',
                              csafSecurityIncidentResponse: 'nice_to_know',
                              csafInformationalAdvisory: 'nice_to_know',
                              csafSecurityAdvisory: 'want_to_have',
                              csafVex: 'nice_to_know',
                            },
                            i18n: {
                              title: 'DocumentDistributionTlpUrlTitle',
                              description:
                                'DocumentDistributionTlpUrlDescription',
                            },
                          },
                          examples: [
                            'https://www.us-cert.gov/tlp',
                            'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Kritis/Merkblatt_TLP.pdf',
                          ],
                          metaInfo: {},
                          type: 'URI',
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              key: 'lang',
              fullName: ['document', 'lang'],
              title: 'Language type',
              description:
                'Identifies a language, corresponding to IETF BCP 47 / RFC 5646. See IETF language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/lang-spec.en.md',
                  usage: 'docs/user/document/lang-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'nice_to_know',
                  csafSecurityIncidentResponse: 'nice_to_know',
                  csafInformationalAdvisory: 'nice_to_know',
                  csafSecurityAdvisory: 'want_to_have',
                  csafVex: 'want_to_have',
                },
                i18n: {
                  title: 'DocumentLangTitle',
                  description: 'DocumentLangDescription',
                },
              },
              examples: ['de', 'en', 'fr', 'frc', 'jp'],
              pattern:
                '^(([A-Za-z]{2,3}(-[A-Za-z]{3}(-[A-Za-z]{3}){0,2})?|[A-Za-z]{4,8})(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-[A-WY-Za-wy-z0-9](-[A-Za-z0-9]{2,8})+)*(-[Xx](-[A-Za-z0-9]{1,8})+)?|[Xx](-[A-Za-z0-9]{1,8})+|[Ii]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ii]-[Mm][Ii][Nn][Gg][Oo])$',
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'notes',
              fullName: ['document', 'notes'],
              title: 'List of notes',
              description:
                'Contains notes which are specific to the current context.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/notes-spec.en.md',
                  usage: 'docs/user/document/notes-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'want_to_have',
                  csafSecurityIncidentResponse: 'mandatory',
                  csafInformationalAdvisory: 'mandatory',
                  csafSecurityAdvisory: 'best_practice',
                  csafVex: 'want_to_have',
                },
                i18n: {
                  title: 'DocumentNotesTitle',
                  description: 'DocumentNotesDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['document', 'notes'],
                  title: 'Note',
                  description:
                    'Is a place to put all manner of text blobs related to the current context.',
                  metaData: {
                    userDocumentation: {
                      specification: 'docs/user/types/notes/note-spec.en.md',
                      usage: 'docs/user/types/notes/note-usage.en.md',
                    },
                    i18n: {
                      title: 'NotesItemsTitle',
                      description: 'NotesItemsDescription',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'audience',
                        fullName: ['document', 'notes', 'audience'],
                        title: 'Audience of note',
                        description: 'Indicates who is intended to read it.',
                        minLength: 1,
                        examples: [
                          'all',
                          'executives',
                          'operational management and system administrators',
                          'safety engineers',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'category',
                        fullName: ['document', 'notes', 'category'],
                        title: 'Note category',
                        description:
                          'Contains the information of what kind of note this is.',
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'text',
                        fullName: ['document', 'notes', 'text'],
                        title: 'Note content',
                        description:
                          'Holds the content of the note. Content varies depending on type.',
                        minLength: 1,
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'title',
                        fullName: ['document', 'notes', 'title'],
                        title: 'Title of note',
                        description:
                          'Provides a concise description of what is contained in the text of the note.',
                        minLength: 1,
                        examples: [
                          'Details',
                          'Executive summary',
                          'Technical summary',
                          'Impact on safety systems',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'publisher',
              fullName: ['document', 'publisher'],
              title: 'Publisher',
              description:
                'Provides information about the publisher of the document.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/publisher-spec.en.md',
                  usage: 'docs/user/document/publisher-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'mandatory',
                  csafSecurityIncidentResponse: 'mandatory',
                  csafInformationalAdvisory: 'mandatory',
                  csafSecurityAdvisory: 'mandatory',
                  csafVex: 'mandatory',
                },
                i18n: {
                  title: 'DocumentPublisherTitle',
                  description: 'DocumentPublisherDescription',
                },
              },
              type: 'OBJECT',
              metaInfo: {
                propertyList: [
                  {
                    key: 'category',
                    fullName: ['document', 'publisher', 'category'],
                    title: 'Category of publisher',
                    description:
                      'Provides information about the category of publisher releasing the document.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/category-spec.en.md',
                        usage:
                          'docs/user/document/publisher/category-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'mandatory',
                        csafSecurityIncidentResponse: 'mandatory',
                        csafInformationalAdvisory: 'mandatory',
                        csafSecurityAdvisory: 'mandatory',
                        csafVex: 'mandatory',
                      },
                      i18n: {
                        title: 'DocumentPublisherCategoryTitle',
                        description: 'DocumentPublisherCategoryDescription',
                      },
                      uiType: 'STRING_ENUM',
                    },
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'contact_details',
                    fullName: ['document', 'publisher', 'contact_details'],
                    title: 'Contact details',
                    description:
                      'Information on how to contact the publisher, possibly including details such as web sites, email addresses, phone numbers, and postal mail addresses.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/contact_details-spec.en.md',
                        usage:
                          'docs/user/document/publisher/contact_details-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'want_to_have',
                        csafSecurityIncidentResponse: 'want_to_have',
                        csafInformationalAdvisory: 'want_to_have',
                        csafSecurityAdvisory: 'best_practice',
                        csafVex: 'best_practice',
                      },
                      i18n: {
                        title: 'DocumentPublisherContactDetailsTitle',
                        description:
                          'DocumentPublisherContactDetailsDescription',
                      },
                      uiType: 'STRING_MULTI_LINE',
                    },
                    minLength: 1,
                    examples: [
                      'Example Company can be reached at contact_us@example.com, or via our website at https://www.example.com/contact.',
                    ],
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'issuing_authority',
                    fullName: ['document', 'publisher', 'issuing_authority'],
                    title: 'Issuing authority',
                    description:
                      "Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations.",
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/issuing_authority-spec.en.md',
                        usage:
                          'docs/user/document/publisher/issuing_authority-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'nice_to_know',
                        csafSecurityIncidentResponse: 'nice_to_know',
                        csafInformationalAdvisory: 'nice_to_know',
                        csafSecurityAdvisory: 'want_to_have',
                        csafVex: 'want_to_have',
                      },
                      i18n: {
                        title: 'DocumentPublisherIssuingAuthorityTitle',
                        description:
                          'DocumentPublisherIssuingAuthorityDescription',
                      },
                      uiType: 'STRING_MULTI_LINE',
                    },
                    minLength: 1,
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'name',
                    fullName: ['document', 'publisher', 'name'],
                    title: 'Name of publisher',
                    description: 'Contains the name of the issuing party.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/name-spec.en.md',
                        usage: 'docs/user/document/publisher/name-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'mandatory',
                        csafSecurityIncidentResponse: 'mandatory',
                        csafInformationalAdvisory: 'mandatory',
                        csafSecurityAdvisory: 'mandatory',
                        csafVex: 'mandatory',
                      },
                      i18n: {
                        title: 'DocumentPublisherNameTitle',
                        description: 'DocumentPublisherNameDescription',
                      },
                    },
                    minLength: 1,
                    examples: ['BSI', 'Cisco PSIRT', 'Siemens ProductCERT'],
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'namespace',
                    fullName: ['document', 'publisher', 'namespace'],
                    title: 'Namespace of publisher',
                    description:
                      'Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/publisher/namespace-spec.en.md',
                        usage:
                          'docs/user/document/publisher/namespace-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'mandatory',
                        csafSecurityIncidentResponse: 'mandatory',
                        csafInformationalAdvisory: 'mandatory',
                        csafSecurityAdvisory: 'mandatory',
                        csafVex: 'mandatory',
                      },
                      i18n: {
                        title: 'DocumentPublisherNamespaceTitle',
                        description: 'DocumentPublisherNamespaceDescription',
                      },
                    },
                    examples: ['https://csaf.io', 'https://www.example.com'],
                    metaInfo: {},
                    type: 'URI',
                  },
                ],
              },
            },
            {
              key: 'references',
              fullName: ['document', 'references'],
              title: 'List of references',
              description: 'Holds a list of references.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/references-spec.en.md',
                  usage: 'docs/user/document/references-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'want_to_have',
                  csafSecurityIncidentResponse: 'mandatory',
                  csafInformationalAdvisory: 'mandatory',
                  csafSecurityAdvisory: 'best_practice',
                  csafVex: 'best_practice',
                },
                i18n: {
                  title: 'DocumentReferencesTitle',
                  description: 'DocumentReferencesDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['document', 'references'],
                  title: 'Reference',
                  description:
                    'Holds any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/types/references/reference-spec.en.md',
                      usage: 'docs/user/types/references/reference-usage.en.md',
                    },
                    i18n: {
                      title: 'ReferencesItemsTitle',
                      description: 'ReferencesItemsDescription',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'category',
                        fullName: ['document', 'references', 'category'],
                        title: 'Category of reference',
                        description:
                          'Indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource.',
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'summary',
                        fullName: ['document', 'references', 'summary'],
                        title: 'Summary of the reference',
                        description: 'Indicates what this reference refers to.',
                        minLength: 1,
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'url',
                        fullName: ['document', 'references', 'url'],
                        title: 'URL of reference',
                        description: 'Provides the URL for the reference.',
                        metaInfo: {},
                        type: 'URI',
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'source_lang',
              fullName: ['document', 'source_lang'],
              title: 'Language type',
              description:
                'Identifies a language, corresponding to IETF BCP 47 / RFC 5646. See IETF language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/source_lang-spec.en.md',
                  usage: 'docs/user/document/source_lang-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'nice_to_know',
                  csafSecurityIncidentResponse: 'nice_to_know',
                  csafInformationalAdvisory: 'nice_to_know',
                  csafSecurityAdvisory: 'nice_to_know',
                  csafVex: 'nice_to_know',
                },
                i18n: {
                  title: 'DocumentSourceLangTitle',
                  description: 'DocumentSourceLangDescription',
                },
              },
              examples: ['de', 'en', 'fr', 'frc', 'jp'],
              pattern:
                '^(([A-Za-z]{2,3}(-[A-Za-z]{3}(-[A-Za-z]{3}){0,2})?|[A-Za-z]{4,8})(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-[A-WY-Za-wy-z0-9](-[A-Za-z0-9]{2,8})+)*(-[Xx](-[A-Za-z0-9]{1,8})+)?|[Xx](-[A-Za-z0-9]{1,8})+|[Ii]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ii]-[Mm][Ii][Nn][Gg][Oo])$',
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'title',
              fullName: ['document', 'title'],
              title: 'Title of this document',
              description:
                'This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/title-spec.en.md',
                  usage: 'docs/user/document/title-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'mandatory',
                  csafSecurityIncidentResponse: 'mandatory',
                  csafInformationalAdvisory: 'mandatory',
                  csafSecurityAdvisory: 'mandatory',
                  csafVex: 'mandatory',
                },
                i18n: {
                  title: 'DocumentTitleTitle',
                  description: 'DocumentTitleDescription',
                },
              },
              minLength: 1,
              examples: [
                'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
                'Example Company Cross-Site-Scripting Vulnerability in Example Generator',
              ],
              metaInfo: {},
              type: 'STRING',
            },
            {
              key: 'tracking',
              fullName: ['document', 'tracking'],
              title: 'Tracking',
              description:
                'Is a container designated to hold all management attributes necessary to track a CSAF document as a whole.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/document/tracking-spec.en.md',
                  usage: 'docs/user/document/tracking-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'mandatory',
                  csafSecurityIncidentResponse: 'mandatory',
                  csafInformationalAdvisory: 'mandatory',
                  csafSecurityAdvisory: 'mandatory',
                  csafVex: 'mandatory',
                },
                i18n: {
                  title: 'DocumentTrackingTitle',
                  description: 'DocumentTrackingDescription',
                },
              },
              type: 'OBJECT',
              metaInfo: {
                propertyList: [
                  {
                    key: 'aliases',
                    fullName: ['document', 'tracking', 'aliases'],
                    title: 'Aliases',
                    description:
                      'Contains a list of alternate names for the same document.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/aliases-spec.en.md',
                        usage:
                          'docs/user/document/tracking/aliases-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'optional',
                        csafSecurityIncidentResponse: 'nice_to_know',
                        csafInformationalAdvisory: 'nice_to_know',
                        csafSecurityAdvisory: 'nice_to_know',
                        csafVex: 'nice_to_know',
                      },
                      i18n: {
                        title: 'DocumentTrackingAliasesTitle',
                        description: 'DocumentTrackingAliasesDescription',
                      },
                    },
                    type: 'ARRAY',
                    metaInfo: {
                      arrayType: {
                        key: '',
                        fullName: ['document', 'tracking', 'aliases'],
                        title: 'Alternate name',
                        description:
                          'Specifies a non-empty string that represents a distinct optional alternative ID used to refer to the document.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/document/tracking/aliases/alias-spec.en.md',
                            usage:
                              'docs/user/document/tracking/aliases/alias-usage.en.md',
                          },
                          i18n: {
                            title: 'DocumentTrackingAliasesItemsTitle',
                            description:
                              'DocumentTrackingAliasesItemsDescription',
                          },
                        },
                        minLength: 1,
                        examples: ['CVE-2019-12345'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                    },
                  },
                  {
                    key: 'current_release_date',
                    fullName: ['document', 'tracking', 'current_release_date'],
                    title: 'Current release date',
                    description:
                      'The date when the current revision of this document was released',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/current_release_date-spec.en.md',
                        usage:
                          'docs/user/document/tracking/current_release_date-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'mandatory',
                        csafSecurityIncidentResponse: 'mandatory',
                        csafInformationalAdvisory: 'mandatory',
                        csafSecurityAdvisory: 'mandatory',
                        csafVex: 'mandatory',
                      },
                      i18n: {
                        title: 'DocumentTrackingCurrentReleaseDateTitle',
                        description:
                          'DocumentTrackingCurrentReleaseDateDescription',
                      },
                    },
                    metaInfo: {},
                    type: 'DATETIME',
                  },
                  {
                    key: 'generator',
                    fullName: ['document', 'tracking', 'generator'],
                    title: 'Document generator',
                    description:
                      'Is a container to hold all elements related to the generation of the document. These items will reference when the document was actually created, including the date it was generated and the entity that generated it.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/generator-spec.en.md',
                        usage:
                          'docs/user/document/tracking/generator-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'nice_to_know',
                        csafSecurityIncidentResponse: 'nice_to_know',
                        csafInformationalAdvisory: 'nice_to_know',
                        csafSecurityAdvisory: 'nice_to_know',
                        csafVex: 'nice_to_know',
                      },
                      i18n: {
                        title: 'DocumentTrackingGeneratorTitle',
                        description: 'DocumentTrackingGeneratorDescription',
                      },
                    },
                    type: 'OBJECT',
                    metaInfo: {
                      propertyList: [
                        {
                          key: 'date',
                          fullName: [
                            'document',
                            'tracking',
                            'generator',
                            'date',
                          ],
                          title: 'Date of document generation',
                          description:
                            'This SHOULD be the current date that the document was generated. Because documents are often generated internally by a document producer and exist for a nonzero amount of time before being released, this field MAY be different from the Initial Release Date and Current Release Date.',
                          metaData: {
                            userDocumentation: {
                              specification:
                                'docs/user/document/tracking/generator/date-spec.en.md',
                              usage:
                                'docs/user/document/tracking/generator/date-usage.en.md',
                            },
                            relevanceLevels: {
                              csafBase: 'nice_to_know',
                              csafSecurityIncidentResponse: 'nice_to_know',
                              csafInformationalAdvisory: 'nice_to_know',
                              csafSecurityAdvisory: 'nice_to_know',
                              csafVex: 'nice_to_know',
                            },
                            i18n: {
                              title: 'DocumentTrackingGeneratorDateTitle',
                              description:
                                'DocumentTrackingGeneratorDateDescription',
                            },
                          },
                          metaInfo: {},
                          type: 'DATETIME',
                        },
                        {
                          key: 'engine',
                          fullName: [
                            'document',
                            'tracking',
                            'generator',
                            'engine',
                          ],
                          title: 'Engine of document generation',
                          description:
                            'Contains information about the engine that generated the CSAF document.',
                          metaData: {
                            userDocumentation: {
                              specification:
                                'docs/user/document/tracking/generator/engine-spec.en.md',
                              usage:
                                'docs/user/document/tracking/generator/engine-usage.en.md',
                            },
                            relevanceLevels: {
                              csafBase: 'mandatory',
                              csafSecurityIncidentResponse: 'mandatory',
                              csafInformationalAdvisory: 'mandatory',
                              csafSecurityAdvisory: 'mandatory',
                              csafVex: 'mandatory',
                            },
                            i18n: {
                              title: 'DocumentTrackingGeneratorEngineTitle',
                              description:
                                'DocumentTrackingGeneratorEngineDescription',
                            },
                          },
                          type: 'OBJECT',
                          metaInfo: {
                            propertyList: [
                              {
                                key: 'name',
                                fullName: [
                                  'document',
                                  'tracking',
                                  'generator',
                                  'engine',
                                  'name',
                                ],
                                title: 'Engine name',
                                description:
                                  'Represents the name of the engine that generated the CSAF document.',
                                metaData: {
                                  userDocumentation: {
                                    specification:
                                      'docs/user/document/tracking/generator/engine/name-spec.en.md',
                                    usage:
                                      'docs/user/document/tracking/generator/engine/name-usage.en.md',
                                  },
                                  relevanceLevels: {
                                    csafBase: 'mandatory',
                                    csafSecurityIncidentResponse: 'mandatory',
                                    csafInformationalAdvisory: 'mandatory',
                                    csafSecurityAdvisory: 'mandatory',
                                    csafVex: 'mandatory',
                                  },
                                  i18n: {
                                    title:
                                      'DocumentTrackingGeneratorEngineNameTitle',
                                    description:
                                      'DocumentTrackingGeneratorEngineNameDescription',
                                  },
                                  disable: {
                                    ifStandaloneMode: false,
                                    ifServerMode: true,
                                  },
                                },
                                minLength: 1,
                                examples: [
                                  'Red Hat rhsa-to-cvrf',
                                  'Secvisogram',
                                  'TVCE',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                              {
                                key: 'version',
                                fullName: [
                                  'document',
                                  'tracking',
                                  'generator',
                                  'engine',
                                  'version',
                                ],
                                title: 'Engine version',
                                description:
                                  'Contains the version of the engine that generated the CSAF document.',
                                metaData: {
                                  userDocumentation: {
                                    specification:
                                      'docs/user/document/tracking/generator/engine/version-spec.en.md',
                                    usage:
                                      'docs/user/document/tracking/generator/engine/version-usage.en.md',
                                  },
                                  relevanceLevels: {
                                    csafBase: 'want_to_have',
                                    csafSecurityIncidentResponse:
                                      'want_to_have',
                                    csafInformationalAdvisory: 'want_to_have',
                                    csafSecurityAdvisory: 'want_to_have',
                                    csafVex: 'want_to_have',
                                  },
                                  i18n: {
                                    title:
                                      'DocumentTrackingGeneratorEngineVersionTitle',
                                    description:
                                      'DocumentTrackingGeneratorEngineVersionDescription',
                                  },
                                  disable: {
                                    ifStandaloneMode: false,
                                    ifServerMode: true,
                                  },
                                },
                                minLength: 1,
                                examples: [
                                  '0.6.0',
                                  '1.0.0-beta+exp.sha.a1c44f85',
                                  '2',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            ],
                          },
                        },
                      ],
                    },
                  },
                  {
                    key: 'id',
                    fullName: ['document', 'tracking', 'id'],
                    title: 'Unique identifier for the document',
                    description:
                      'The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/id-spec.en.md',
                        usage: 'docs/user/document/tracking/id-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'mandatory',
                        csafSecurityIncidentResponse: 'mandatory',
                        csafInformationalAdvisory: 'mandatory',
                        csafSecurityAdvisory: 'mandatory',
                        csafVex: 'mandatory',
                      },
                      i18n: {
                        title: 'DocumentTrackingIdTitle',
                        description: 'DocumentTrackingIdDescription',
                      },
                      disable: { ifStandaloneMode: false, ifServerMode: true },
                    },
                    minLength: 1,
                    examples: [
                      'Example Company - 2019-YH3234',
                      'RHBA-2019:0024',
                      'cisco-sa-20190513-secureboot',
                    ],
                    pattern: '^[\\S](.*[\\S])?$',
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'initial_release_date',
                    fullName: ['document', 'tracking', 'initial_release_date'],
                    title: 'Initial release date',
                    description:
                      'The date when this document was first published.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/initial_release_date-spec.en.md',
                        usage:
                          'docs/user/document/tracking/initial_release_date-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'mandatory',
                        csafSecurityIncidentResponse: 'mandatory',
                        csafInformationalAdvisory: 'mandatory',
                        csafSecurityAdvisory: 'mandatory',
                        csafVex: 'mandatory',
                      },
                      i18n: {
                        title: 'DocumentTrackingInitialReleaseDateTitle',
                        description:
                          'DocumentTrackingInitialReleaseDateDescription',
                      },
                    },
                    metaInfo: {},
                    type: 'DATETIME',
                  },
                  {
                    key: 'revision_history',
                    fullName: ['document', 'tracking', 'revision_history'],
                    title: 'Revision history',
                    description:
                      'Holds one revision item for each version of the CSAF document, including the initial one.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/revision_history-spec.en.md',
                        usage:
                          'docs/user/document/tracking/revision_history-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'mandatory',
                        csafSecurityIncidentResponse: 'mandatory',
                        csafInformationalAdvisory: 'mandatory',
                        csafSecurityAdvisory: 'mandatory',
                        csafVex: 'mandatory',
                      },
                      i18n: {
                        title: 'DocumentTrackingRevisionHistoryTitle',
                        description:
                          'DocumentTrackingRevisionHistoryDescription',
                      },
                      uiType: 'ARRAY_REVISION_HISTORY',
                    },
                    type: 'ARRAY',
                    metaInfo: {
                      arrayType: {
                        key: '',
                        fullName: ['document', 'tracking', 'revision_history'],
                        title: 'Revision',
                        description:
                          'Contains all the information elements required to track the evolution of a CSAF document.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/document/tracking/revision_history/revision-spec.en.md',
                            usage:
                              'docs/user/document/tracking/revision_history/revision-usage.en.md',
                          },
                          i18n: {
                            title: 'DocumentTrackingRevisionHistoryItemsTitle',
                            description:
                              'DocumentTrackingRevisionHistoryItemsDescription',
                          },
                        },
                        type: 'OBJECT',
                        metaInfo: {
                          propertyList: [
                            {
                              key: 'date',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'date',
                              ],
                              title: 'Date of the revision',
                              description: 'The date of the revision entry',
                              metaInfo: {},
                              type: 'DATETIME',
                            },
                            {
                              key: 'legacy_version',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'legacy_version',
                              ],
                              title: 'Legacy version of the revision',
                              description:
                                'Contains the version string used in an existing document with the same content.',
                              minLength: 1,
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'number',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'number',
                              ],
                              title: 'Version',
                              description:
                                'Specifies a version string to denote clearly the evolution of the content of the document. Format must be either integer or semantic versioning.',
                              examples: [
                                '1',
                                '4',
                                '0.9.0',
                                '1.4.3',
                                '2.40.0+21AF26D3',
                              ],
                              pattern:
                                '^(0|[1-9][0-9]*)$|^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$',
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'summary',
                              fullName: [
                                'document',
                                'tracking',
                                'revision_history',
                                'summary',
                              ],
                              title: 'Summary of the revision',
                              description:
                                'Holds a single non-empty string representing a short description of the changes.',
                              minLength: 1,
                              examples: ['Initial version.'],
                              metaInfo: {},
                              type: 'STRING',
                            },
                          ],
                        },
                      },
                    },
                  },
                  {
                    key: 'status',
                    fullName: ['document', 'tracking', 'status'],
                    title: 'Document status',
                    description: 'Defines the draft status of the document.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/status-spec.en.md',
                        usage: 'docs/user/document/tracking/status-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'mandatory',
                        csafSecurityIncidentResponse: 'mandatory',
                        csafInformationalAdvisory: 'mandatory',
                        csafSecurityAdvisory: 'mandatory',
                        csafVex: 'mandatory',
                      },
                      i18n: {
                        title: 'DocumentTrackingStatusTitle',
                        description: 'DocumentTrackingStatusDescription',
                      },
                      uiType: 'STRING_ENUM',
                    },
                    metaInfo: {},
                    type: 'STRING',
                  },
                  {
                    key: 'version',
                    fullName: ['document', 'tracking', 'version'],
                    title: 'Version',
                    description:
                      'Specifies a version string to denote clearly the evolution of the content of the document. Format must be either integer or semantic versioning.',
                    metaData: {
                      userDocumentation: {
                        specification:
                          'docs/user/document/tracking/version-spec.en.md',
                        usage:
                          'docs/user/document/tracking/version-usage.en.md',
                      },
                      relevanceLevels: {
                        csafBase: 'mandatory',
                        csafSecurityIncidentResponse: 'mandatory',
                        csafInformationalAdvisory: 'mandatory',
                        csafSecurityAdvisory: 'mandatory',
                        csafVex: 'mandatory',
                      },
                      i18n: {
                        title: 'VersionTitle',
                        description: 'VersionDescription',
                      },
                    },
                    examples: ['1', '4', '0.9.0', '1.4.3', '2.40.0+21AF26D3'],
                    pattern:
                      '^(0|[1-9][0-9]*)$|^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$',
                    metaInfo: {},
                    type: 'STRING',
                  },
                ],
              },
            },
          ],
        },
      },
      {
        key: 'product_tree',
        fullName: ['product_tree'],
        title: 'Product tree',
        description:
          'Is a container for all fully qualified product names that can be referenced elsewhere in the document.',
        metaData: {
          userDocumentation: {
            specification: 'docs/user/product_tree-spec.en.md',
            usage: 'docs/user/product_tree-usage.en.md',
          },
          relevanceLevels: {
            csafBase: 'want_to_have',
            csafSecurityIncidentResponse: 'nice_to_know',
            csafInformationalAdvisory: 'want_to_have',
            csafSecurityAdvisory: 'mandatory',
            csafVex: 'mandatory',
          },
          i18n: {
            title: 'ProductTreeTitle',
            description: 'ProductTreeDescription',
          },
        },
        type: 'OBJECT',
        metaInfo: {
          propertyList: [
            {
              key: 'branches',
              fullName: ['product_tree', 'branches'],
              title: 'List of branches',
              description:
                'Contains branch elements as children of the current element.',
              metaData: {
                userDocumentation: {
                  specification: 'docs/user/product_tree/branches-spec.en.md',
                  usage: 'docs/user/product_tree/branches-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'want_to_have',
                  csafSecurityIncidentResponse: 'want_to_have',
                  csafInformationalAdvisory: 'want_to_have',
                  csafSecurityAdvisory: 'best_practice',
                  csafVex: 'best_practice',
                },
                i18n: {
                  title: 'BranchesTitle',
                  description: 'BranchesDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'branches'],
                  title: 'Branch',
                  description:
                    'Is a part of the hierarchical structure of the product tree.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/types/branches/branch-spec.en.md',
                      usage: 'docs/user/types/branches/branch-usage.en.md',
                    },
                    i18n: {
                      title: 'BranchesItemsTitle',
                      description: 'BranchesItemsDescription',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'branches',
                        fullName: ['product_tree', 'branches'],
                        title: 'List of branches',
                        description:
                          'Contains branch elements as children of the current element.',
                        metaData: {
                          userDocumentation: {
                            specification:
                              'docs/user/product_tree/branches-spec.en.md',
                            usage:
                              'docs/user/product_tree/branches-usage.en.md',
                          },
                          relevanceLevels: {
                            csafBase: 'want_to_have',
                            csafSecurityIncidentResponse: 'want_to_have',
                            csafInformationalAdvisory: 'want_to_have',
                            csafSecurityAdvisory: 'best_practice',
                            csafVex: 'best_practice',
                          },
                          i18n: {
                            title: 'BranchesTitle',
                            description: 'BranchesDescription',
                          },
                        },
                        metaInfo: {},
                        type: 'RECURSION',
                      },
                      {
                        key: 'category',
                        fullName: ['product_tree', 'branches', 'category'],
                        title: 'Category of the branch',
                        description:
                          'Describes the characteristics of the labeled branch.',
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'name',
                        fullName: ['product_tree', 'branches', 'name'],
                        title: 'Name of the branch',
                        description:
                          "Contains the canonical descriptor or 'friendly name' of the branch.",
                        minLength: 1,
                        examples: [
                          '10',
                          '365',
                          'Microsoft',
                          'Office',
                          'PCS 7',
                          'SIMATIC',
                          'Siemens',
                          'Windows',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'product',
                        fullName: ['product_tree', 'branches', 'product'],
                        title: 'Full product name',
                        description:
                          'Specifies information about the product and assigns the product_id.',
                        type: 'OBJECT',
                        metaInfo: {
                          propertyList: [
                            {
                              key: 'name',
                              fullName: [
                                'product_tree',
                                'branches',
                                'product',
                                'name',
                              ],
                              title: 'Textual description of the product',
                              description:
                                'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
                              minLength: 1,
                              examples: [
                                'Cisco AnyConnect Secure Mobility Client 2.3.185',
                                'Microsoft Host Integration Server 2006 Service Pack 1',
                              ],
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'product_id',
                              fullName: [
                                'product_tree',
                                'branches',
                                'product',
                                'product_id',
                              ],
                              title: 'Reference token for product instance',
                              description:
                                'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'product_identification_helper',
                              fullName: [
                                'product_tree',
                                'branches',
                                'product',
                                'product_identification_helper',
                              ],
                              title: 'Helper to identify the product',
                              description:
                                'Provides at least one method which aids in identifying the product in an asset database.',
                              type: 'OBJECT',
                              metaInfo: {
                                propertyList: [
                                  {
                                    key: 'cpe',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'cpe',
                                    ],
                                    title:
                                      'Common Platform Enumeration representation',
                                    description:
                                      'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
                                    minLength: 5,
                                    pattern:
                                      '^(cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6})$',
                                    metaInfo: {},
                                    type: 'STRING',
                                  },
                                  {
                                    key: 'hashes',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'hashes',
                                    ],
                                    title: 'List of hashes',
                                    description:
                                      'Contains a list of cryptographic hashes usable to identify files.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'hashes',
                                        ],
                                        title: 'Cryptographic hashes',
                                        description:
                                          'Contains all information to identify a file based on its cryptographic hash values.',
                                        type: 'OBJECT',
                                        metaInfo: {
                                          propertyList: [
                                            {
                                              key: 'file_hashes',
                                              fullName: [
                                                'product_tree',
                                                'branches',
                                                'product',
                                                'product_identification_helper',
                                                'hashes',
                                                'file_hashes',
                                              ],
                                              title: 'List of file hashes',
                                              description:
                                                'Contains a list of cryptographic hashes for this file.',
                                              type: 'ARRAY',
                                              metaInfo: {
                                                arrayType: {
                                                  key: '',
                                                  fullName: [
                                                    'product_tree',
                                                    'branches',
                                                    'product',
                                                    'product_identification_helper',
                                                    'hashes',
                                                    'file_hashes',
                                                  ],
                                                  title: 'File hash',
                                                  description:
                                                    'Contains one hash value and algorithm of the file to be identified.',
                                                  type: 'OBJECT',
                                                  metaInfo: {
                                                    propertyList: [
                                                      {
                                                        key: 'algorithm',
                                                        fullName: [
                                                          'product_tree',
                                                          'branches',
                                                          'product',
                                                          'product_identification_helper',
                                                          'hashes',
                                                          'file_hashes',
                                                          'algorithm',
                                                        ],
                                                        title:
                                                          'Algorithm of the cryptographic hash',
                                                        description:
                                                          'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                                                        minLength: 1,
                                                        examples: [
                                                          'blake2b512',
                                                          'sha256',
                                                          'sha3-512',
                                                          'sha384',
                                                          'sha512',
                                                        ],
                                                        metaInfo: {},
                                                        type: 'STRING',
                                                      },
                                                      {
                                                        key: 'value',
                                                        fullName: [
                                                          'product_tree',
                                                          'branches',
                                                          'product',
                                                          'product_identification_helper',
                                                          'hashes',
                                                          'file_hashes',
                                                          'value',
                                                        ],
                                                        title:
                                                          'Value of the cryptographic hash',
                                                        description:
                                                          'Contains the cryptographic hash value in hexadecimal representation.',
                                                        minLength: 32,
                                                        examples: [
                                                          '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                                                          '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                                                          '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                                                        ],
                                                        pattern:
                                                          '^[0-9a-fA-F]{32,}$',
                                                        metaInfo: {},
                                                        type: 'STRING',
                                                      },
                                                    ],
                                                  },
                                                },
                                              },
                                            },
                                            {
                                              key: 'filename',
                                              fullName: [
                                                'product_tree',
                                                'branches',
                                                'product',
                                                'product_identification_helper',
                                                'hashes',
                                                'filename',
                                              ],
                                              title: 'Filename',
                                              description:
                                                'Contains the name of the file which is identified by the hash values.',
                                              minLength: 1,
                                              examples: [
                                                'WINWORD.EXE',
                                                'msotadddin.dll',
                                                'sudoers.so',
                                              ],
                                              metaInfo: {},
                                              type: 'STRING',
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'model_numbers',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'model_numbers',
                                    ],
                                    title: 'List of models',
                                    description:
                                      'Contains a list of full or abbreviated (partial) model numbers.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'model_numbers',
                                        ],
                                        title: 'Model number',
                                        description:
                                          'Contains a full or abbreviated (partial) model number of the component to identify.',
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    },
                                  },
                                  {
                                    key: 'purl',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'purl',
                                    ],
                                    title: 'package URL representation',
                                    description:
                                      'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
                                    minLength: 7,
                                    pattern:
                                      '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+',
                                    metaInfo: {},
                                    type: 'URI',
                                  },
                                  {
                                    key: 'sbom_urls',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'sbom_urls',
                                    ],
                                    title: 'List of SBOM URLs',
                                    description:
                                      'Contains a list of URLs where SBOMs for this product can be retrieved.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'sbom_urls',
                                        ],
                                        title: 'SBOM URL',
                                        description:
                                          'Contains a URL of one SBOM for this product.',
                                        metaInfo: {},
                                        type: 'URI',
                                      },
                                    },
                                  },
                                  {
                                    key: 'serial_numbers',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'serial_numbers',
                                    ],
                                    title: 'List of serial numbers',
                                    description:
                                      'Contains a list of full or abbreviated (partial) serial numbers.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'serial_numbers',
                                        ],
                                        title: 'Serial number',
                                        description:
                                          'Contains a full or abbreviated (partial) serial number of the component to identify.',
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    },
                                  },
                                  {
                                    key: 'skus',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'skus',
                                    ],
                                    title: 'List of stock keeping units',
                                    description:
                                      'Contains a list of full or abbreviated (partial) stock keeping units.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'skus',
                                        ],
                                        title: 'Stock keeping unit',
                                        description:
                                          'Contains a full or abbreviated (partial) stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    },
                                  },
                                  {
                                    key: 'x_generic_uris',
                                    fullName: [
                                      'product_tree',
                                      'branches',
                                      'product',
                                      'product_identification_helper',
                                      'x_generic_uris',
                                    ],
                                    title: 'List of generic URIs',
                                    description:
                                      'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'branches',
                                          'product',
                                          'product_identification_helper',
                                          'x_generic_uris',
                                        ],
                                        title: 'Generic URI',
                                        description:
                                          'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                                        type: 'OBJECT',
                                        metaInfo: {
                                          propertyList: [
                                            {
                                              key: 'namespace',
                                              fullName: [
                                                'product_tree',
                                                'branches',
                                                'product',
                                                'product_identification_helper',
                                                'x_generic_uris',
                                                'namespace',
                                              ],
                                              title:
                                                'Namespace of the generic URI',
                                              description:
                                                'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                                              metaInfo: {},
                                              type: 'URI',
                                            },
                                            {
                                              key: 'uri',
                                              fullName: [
                                                'product_tree',
                                                'branches',
                                                'product',
                                                'product_identification_helper',
                                                'x_generic_uris',
                                                'uri',
                                              ],
                                              title: 'URI',
                                              description:
                                                'Contains the identifier itself.',
                                              metaInfo: {},
                                              type: 'URI',
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'full_product_names',
              fullName: ['product_tree', 'full_product_names'],
              title: 'List of full product names',
              description: 'Contains a list of full product names.',
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/product_tree/full_product_names-spec.en.md',
                  usage:
                    'docs/user/product_tree/full_product_names-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'nice_to_know',
                  csafSecurityIncidentResponse: 'nice_to_know',
                  csafInformationalAdvisory: 'nice_to_know',
                  csafSecurityAdvisory: 'nice_to_know',
                  csafVex: 'nice_to_know',
                },
                i18n: {
                  title: 'ProductTreeFullProductNamesTitle',
                  description: 'ProductTreeFullProductNamesDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'full_product_names'],
                  title: 'Full product name',
                  description:
                    'Specifies information about the product and assigns the product_id.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/types/full_product_name-spec.en.md',
                      usage: 'docs/user/types/full_product_name-usage.en.md',
                    },
                    i18n: {
                      title: 'FullProductNameTitle',
                      description: 'FullProductNameDescription',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'name',
                        fullName: [
                          'product_tree',
                          'full_product_names',
                          'name',
                        ],
                        title: 'Textual description of the product',
                        description:
                          'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
                        minLength: 1,
                        examples: [
                          'Cisco AnyConnect Secure Mobility Client 2.3.185',
                          'Microsoft Host Integration Server 2006 Service Pack 1',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'product_id',
                        fullName: [
                          'product_tree',
                          'full_product_names',
                          'product_id',
                        ],
                        title: 'Reference token for product instance',
                        description:
                          'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                        minLength: 1,
                        examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'product_identification_helper',
                        fullName: [
                          'product_tree',
                          'full_product_names',
                          'product_identification_helper',
                        ],
                        title: 'Helper to identify the product',
                        description:
                          'Provides at least one method which aids in identifying the product in an asset database.',
                        type: 'OBJECT',
                        metaInfo: {
                          propertyList: [
                            {
                              key: 'cpe',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'cpe',
                              ],
                              title:
                                'Common Platform Enumeration representation',
                              description:
                                'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
                              minLength: 5,
                              pattern:
                                '^(cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6})$',
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'hashes',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'hashes',
                              ],
                              title: 'List of hashes',
                              description:
                                'Contains a list of cryptographic hashes usable to identify files.',
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'hashes',
                                  ],
                                  title: 'Cryptographic hashes',
                                  description:
                                    'Contains all information to identify a file based on its cryptographic hash values.',
                                  type: 'OBJECT',
                                  metaInfo: {
                                    propertyList: [
                                      {
                                        key: 'file_hashes',
                                        fullName: [
                                          'product_tree',
                                          'full_product_names',
                                          'product_identification_helper',
                                          'hashes',
                                          'file_hashes',
                                        ],
                                        title: 'List of file hashes',
                                        description:
                                          'Contains a list of cryptographic hashes for this file.',
                                        type: 'ARRAY',
                                        metaInfo: {
                                          arrayType: {
                                            key: '',
                                            fullName: [
                                              'product_tree',
                                              'full_product_names',
                                              'product_identification_helper',
                                              'hashes',
                                              'file_hashes',
                                            ],
                                            title: 'File hash',
                                            description:
                                              'Contains one hash value and algorithm of the file to be identified.',
                                            type: 'OBJECT',
                                            metaInfo: {
                                              propertyList: [
                                                {
                                                  key: 'algorithm',
                                                  fullName: [
                                                    'product_tree',
                                                    'full_product_names',
                                                    'product_identification_helper',
                                                    'hashes',
                                                    'file_hashes',
                                                    'algorithm',
                                                  ],
                                                  title:
                                                    'Algorithm of the cryptographic hash',
                                                  description:
                                                    'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                                                  minLength: 1,
                                                  examples: [
                                                    'blake2b512',
                                                    'sha256',
                                                    'sha3-512',
                                                    'sha384',
                                                    'sha512',
                                                  ],
                                                  metaInfo: {},
                                                  type: 'STRING',
                                                },
                                                {
                                                  key: 'value',
                                                  fullName: [
                                                    'product_tree',
                                                    'full_product_names',
                                                    'product_identification_helper',
                                                    'hashes',
                                                    'file_hashes',
                                                    'value',
                                                  ],
                                                  title:
                                                    'Value of the cryptographic hash',
                                                  description:
                                                    'Contains the cryptographic hash value in hexadecimal representation.',
                                                  minLength: 32,
                                                  examples: [
                                                    '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                                                    '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                                                    '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                                                  ],
                                                  pattern: '^[0-9a-fA-F]{32,}$',
                                                  metaInfo: {},
                                                  type: 'STRING',
                                                },
                                              ],
                                            },
                                          },
                                        },
                                      },
                                      {
                                        key: 'filename',
                                        fullName: [
                                          'product_tree',
                                          'full_product_names',
                                          'product_identification_helper',
                                          'hashes',
                                          'filename',
                                        ],
                                        title: 'Filename',
                                        description:
                                          'Contains the name of the file which is identified by the hash values.',
                                        minLength: 1,
                                        examples: [
                                          'WINWORD.EXE',
                                          'msotadddin.dll',
                                          'sudoers.so',
                                        ],
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    ],
                                  },
                                },
                              },
                            },
                            {
                              key: 'model_numbers',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'model_numbers',
                              ],
                              title: 'List of models',
                              description:
                                'Contains a list of full or abbreviated (partial) model numbers.',
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'model_numbers',
                                  ],
                                  title: 'Model number',
                                  description:
                                    'Contains a full or abbreviated (partial) model number of the component to identify.',
                                  minLength: 1,
                                  metaInfo: {},
                                  type: 'STRING',
                                },
                              },
                            },
                            {
                              key: 'purl',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'purl',
                              ],
                              title: 'package URL representation',
                              description:
                                'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
                              minLength: 7,
                              pattern:
                                '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+',
                              metaInfo: {},
                              type: 'URI',
                            },
                            {
                              key: 'sbom_urls',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'sbom_urls',
                              ],
                              title: 'List of SBOM URLs',
                              description:
                                'Contains a list of URLs where SBOMs for this product can be retrieved.',
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'sbom_urls',
                                  ],
                                  title: 'SBOM URL',
                                  description:
                                    'Contains a URL of one SBOM for this product.',
                                  metaInfo: {},
                                  type: 'URI',
                                },
                              },
                            },
                            {
                              key: 'serial_numbers',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'serial_numbers',
                              ],
                              title: 'List of serial numbers',
                              description:
                                'Contains a list of full or abbreviated (partial) serial numbers.',
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'serial_numbers',
                                  ],
                                  title: 'Serial number',
                                  description:
                                    'Contains a full or abbreviated (partial) serial number of the component to identify.',
                                  minLength: 1,
                                  metaInfo: {},
                                  type: 'STRING',
                                },
                              },
                            },
                            {
                              key: 'skus',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'skus',
                              ],
                              title: 'List of stock keeping units',
                              description:
                                'Contains a list of full or abbreviated (partial) stock keeping units.',
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'skus',
                                  ],
                                  title: 'Stock keeping unit',
                                  description:
                                    'Contains a full or abbreviated (partial) stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                                  minLength: 1,
                                  metaInfo: {},
                                  type: 'STRING',
                                },
                              },
                            },
                            {
                              key: 'x_generic_uris',
                              fullName: [
                                'product_tree',
                                'full_product_names',
                                'product_identification_helper',
                                'x_generic_uris',
                              ],
                              title: 'List of generic URIs',
                              description:
                                'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
                              type: 'ARRAY',
                              metaInfo: {
                                arrayType: {
                                  key: '',
                                  fullName: [
                                    'product_tree',
                                    'full_product_names',
                                    'product_identification_helper',
                                    'x_generic_uris',
                                  ],
                                  title: 'Generic URI',
                                  description:
                                    'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                                  type: 'OBJECT',
                                  metaInfo: {
                                    propertyList: [
                                      {
                                        key: 'namespace',
                                        fullName: [
                                          'product_tree',
                                          'full_product_names',
                                          'product_identification_helper',
                                          'x_generic_uris',
                                          'namespace',
                                        ],
                                        title: 'Namespace of the generic URI',
                                        description:
                                          'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                                        metaInfo: {},
                                        type: 'URI',
                                      },
                                      {
                                        key: 'uri',
                                        fullName: [
                                          'product_tree',
                                          'full_product_names',
                                          'product_identification_helper',
                                          'x_generic_uris',
                                          'uri',
                                        ],
                                        title: 'URI',
                                        description:
                                          'Contains the identifier itself.',
                                        metaInfo: {},
                                        type: 'URI',
                                      },
                                    ],
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'product_groups',
              fullName: ['product_tree', 'product_groups'],
              title: 'List of product groups',
              description: 'Contains a list of product groups.',
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/product_tree/product_groups-spec.en.md',
                  usage: 'docs/user/product_tree/product_groups-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'optional',
                  csafSecurityIncidentResponse: 'optional',
                  csafInformationalAdvisory: 'optional',
                  csafSecurityAdvisory: 'nice_to_know',
                  csafVex: 'optional',
                },
                i18n: {
                  title: 'ProductTreeProductGroupsTitle',
                  description: 'ProductTreeProductGroupsDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'product_groups'],
                  title: 'Product group',
                  description:
                    'Defines a new logical group of products that can then be referred to in other parts of the document to address a group of products with a single identifier.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/product_tree/product_groups/product_group-spec.en.md',
                      usage:
                        'docs/user/product_tree/product_groups/product_group-usage.en.md',
                    },
                    i18n: {
                      title: 'ProductTreeProductGroupsItemsTitle',
                      description: 'ProductTreeProductGroupsItemsDescription',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'group_id',
                        fullName: [
                          'product_tree',
                          'product_groups',
                          'group_id',
                        ],
                        title: 'Reference token for product group instance',
                        description:
                          'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                        minLength: 1,
                        examples: [
                          'CSAFGID-0001',
                          'CSAFGID-0002',
                          'CSAFGID-0020',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'product_ids',
                        fullName: [
                          'product_tree',
                          'product_groups',
                          'product_ids',
                        ],
                        title: 'List of Product IDs',
                        description:
                          'Lists the product_ids of those products which known as one group in the document.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'product_tree',
                              'product_groups',
                              'product_ids',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'summary',
                        fullName: ['product_tree', 'product_groups', 'summary'],
                        title: 'Summary of the product group',
                        description:
                          'Gives a short, optional description of the group.',
                        minLength: 1,
                        examples: [
                          'Products supporting Modbus.',
                          'The x64 versions of the operating system.',
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                    ],
                  },
                },
              },
            },
            {
              key: 'relationships',
              fullName: ['product_tree', 'relationships'],
              title: 'List of relationships',
              description: 'Contains a list of relationships.',
              metaData: {
                userDocumentation: {
                  specification:
                    'docs/user/product_tree/relationships-spec.en.md',
                  usage: 'docs/user/product_tree/relationships-usage.en.md',
                },
                relevanceLevels: {
                  csafBase: 'optional',
                  csafSecurityIncidentResponse: 'optional',
                  csafInformationalAdvisory: 'optional',
                  csafSecurityAdvisory: 'want_to_have',
                  csafVex: 'want_to_have',
                },
                i18n: {
                  title: 'ProductTreeRelationshipsTitle',
                  description: 'ProductTreeRelationshipsDescription',
                },
              },
              type: 'ARRAY',
              metaInfo: {
                arrayType: {
                  key: '',
                  fullName: ['product_tree', 'relationships'],
                  title: 'Relationship',
                  description:
                    'Establishes a link between two existing full_product_name_t elements, allowing the document producer to define a combination of two products that form a new full_product_name entry.',
                  metaData: {
                    userDocumentation: {
                      specification:
                        'docs/user/product_tree/relationships/relationship-spec.en.md',
                      usage:
                        'docs/user/product_tree/relationships/relationship-usage.en.md',
                    },
                    i18n: {
                      title: 'ProductTreeRelationshipsItemsTitle',
                      description: 'ProductTreeRelationshipsItemsDescription',
                    },
                  },
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'category',
                        fullName: ['product_tree', 'relationships', 'category'],
                        title: 'Relationship category',
                        description:
                          'Defines the category of relationship for the referenced component.',
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'full_product_name',
                        fullName: [
                          'product_tree',
                          'relationships',
                          'full_product_name',
                        ],
                        title: 'Full product name',
                        description:
                          'Specifies information about the product and assigns the product_id.',
                        type: 'OBJECT',
                        metaInfo: {
                          propertyList: [
                            {
                              key: 'name',
                              fullName: [
                                'product_tree',
                                'relationships',
                                'full_product_name',
                                'name',
                              ],
                              title: 'Textual description of the product',
                              description:
                                'The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
                              minLength: 1,
                              examples: [
                                'Cisco AnyConnect Secure Mobility Client 2.3.185',
                                'Microsoft Host Integration Server 2006 Service Pack 1',
                              ],
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'product_id',
                              fullName: [
                                'product_tree',
                                'relationships',
                                'full_product_name',
                                'product_id',
                              ],
                              title: 'Reference token for product instance',
                              description:
                                'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                              minLength: 1,
                              examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                              metaInfo: {},
                              type: 'STRING',
                            },
                            {
                              key: 'product_identification_helper',
                              fullName: [
                                'product_tree',
                                'relationships',
                                'full_product_name',
                                'product_identification_helper',
                              ],
                              title: 'Helper to identify the product',
                              description:
                                'Provides at least one method which aids in identifying the product in an asset database.',
                              type: 'OBJECT',
                              metaInfo: {
                                propertyList: [
                                  {
                                    key: 'cpe',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'cpe',
                                    ],
                                    title:
                                      'Common Platform Enumeration representation',
                                    description:
                                      'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
                                    minLength: 5,
                                    pattern:
                                      '^(cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6})$',
                                    metaInfo: {},
                                    type: 'STRING',
                                  },
                                  {
                                    key: 'hashes',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'hashes',
                                    ],
                                    title: 'List of hashes',
                                    description:
                                      'Contains a list of cryptographic hashes usable to identify files.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'hashes',
                                        ],
                                        title: 'Cryptographic hashes',
                                        description:
                                          'Contains all information to identify a file based on its cryptographic hash values.',
                                        type: 'OBJECT',
                                        metaInfo: {
                                          propertyList: [
                                            {
                                              key: 'file_hashes',
                                              fullName: [
                                                'product_tree',
                                                'relationships',
                                                'full_product_name',
                                                'product_identification_helper',
                                                'hashes',
                                                'file_hashes',
                                              ],
                                              title: 'List of file hashes',
                                              description:
                                                'Contains a list of cryptographic hashes for this file.',
                                              type: 'ARRAY',
                                              metaInfo: {
                                                arrayType: {
                                                  key: '',
                                                  fullName: [
                                                    'product_tree',
                                                    'relationships',
                                                    'full_product_name',
                                                    'product_identification_helper',
                                                    'hashes',
                                                    'file_hashes',
                                                  ],
                                                  title: 'File hash',
                                                  description:
                                                    'Contains one hash value and algorithm of the file to be identified.',
                                                  type: 'OBJECT',
                                                  metaInfo: {
                                                    propertyList: [
                                                      {
                                                        key: 'algorithm',
                                                        fullName: [
                                                          'product_tree',
                                                          'relationships',
                                                          'full_product_name',
                                                          'product_identification_helper',
                                                          'hashes',
                                                          'file_hashes',
                                                          'algorithm',
                                                        ],
                                                        title:
                                                          'Algorithm of the cryptographic hash',
                                                        description:
                                                          'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                                                        minLength: 1,
                                                        examples: [
                                                          'blake2b512',
                                                          'sha256',
                                                          'sha3-512',
                                                          'sha384',
                                                          'sha512',
                                                        ],
                                                        metaInfo: {},
                                                        type: 'STRING',
                                                      },
                                                      {
                                                        key: 'value',
                                                        fullName: [
                                                          'product_tree',
                                                          'relationships',
                                                          'full_product_name',
                                                          'product_identification_helper',
                                                          'hashes',
                                                          'file_hashes',
                                                          'value',
                                                        ],
                                                        title:
                                                          'Value of the cryptographic hash',
                                                        description:
                                                          'Contains the cryptographic hash value in hexadecimal representation.',
                                                        minLength: 32,
                                                        examples: [
                                                          '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                                                          '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                                                          '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                                                        ],
                                                        pattern:
                                                          '^[0-9a-fA-F]{32,}$',
                                                        metaInfo: {},
                                                        type: 'STRING',
                                                      },
                                                    ],
                                                  },
                                                },
                                              },
                                            },
                                            {
                                              key: 'filename',
                                              fullName: [
                                                'product_tree',
                                                'relationships',
                                                'full_product_name',
                                                'product_identification_helper',
                                                'hashes',
                                                'filename',
                                              ],
                                              title: 'Filename',
                                              description:
                                                'Contains the name of the file which is identified by the hash values.',
                                              minLength: 1,
                                              examples: [
                                                'WINWORD.EXE',
                                                'msotadddin.dll',
                                                'sudoers.so',
                                              ],
                                              metaInfo: {},
                                              type: 'STRING',
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                  {
                                    key: 'model_numbers',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'model_numbers',
                                    ],
                                    title: 'List of models',
                                    description:
                                      'Contains a list of full or abbreviated (partial) model numbers.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'model_numbers',
                                        ],
                                        title: 'Model number',
                                        description:
                                          'Contains a full or abbreviated (partial) model number of the component to identify.',
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    },
                                  },
                                  {
                                    key: 'purl',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'purl',
                                    ],
                                    title: 'package URL representation',
                                    description:
                                      'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
                                    minLength: 7,
                                    pattern:
                                      '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*/.+',
                                    metaInfo: {},
                                    type: 'URI',
                                  },
                                  {
                                    key: 'sbom_urls',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'sbom_urls',
                                    ],
                                    title: 'List of SBOM URLs',
                                    description:
                                      'Contains a list of URLs where SBOMs for this product can be retrieved.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'sbom_urls',
                                        ],
                                        title: 'SBOM URL',
                                        description:
                                          'Contains a URL of one SBOM for this product.',
                                        metaInfo: {},
                                        type: 'URI',
                                      },
                                    },
                                  },
                                  {
                                    key: 'serial_numbers',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'serial_numbers',
                                    ],
                                    title: 'List of serial numbers',
                                    description:
                                      'Contains a list of full or abbreviated (partial) serial numbers.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'serial_numbers',
                                        ],
                                        title: 'Serial number',
                                        description:
                                          'Contains a full or abbreviated (partial) serial number of the component to identify.',
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    },
                                  },
                                  {
                                    key: 'skus',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'skus',
                                    ],
                                    title: 'List of stock keeping units',
                                    description:
                                      'Contains a list of full or abbreviated (partial) stock keeping units.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'skus',
                                        ],
                                        title: 'Stock keeping unit',
                                        description:
                                          'Contains a full or abbreviated (partial) stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                                        minLength: 1,
                                        metaInfo: {},
                                        type: 'STRING',
                                      },
                                    },
                                  },
                                  {
                                    key: 'x_generic_uris',
                                    fullName: [
                                      'product_tree',
                                      'relationships',
                                      'full_product_name',
                                      'product_identification_helper',
                                      'x_generic_uris',
                                    ],
                                    title: 'List of generic URIs',
                                    description:
                                      'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
                                    type: 'ARRAY',
                                    metaInfo: {
                                      arrayType: {
                                        key: '',
                                        fullName: [
                                          'product_tree',
                                          'relationships',
                                          'full_product_name',
                                          'product_identification_helper',
                                          'x_generic_uris',
                                        ],
                                        title: 'Generic URI',
                                        description:
                                          'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                                        type: 'OBJECT',
                                        metaInfo: {
                                          propertyList: [
                                            {
                                              key: 'namespace',
                                              fullName: [
                                                'product_tree',
                                                'relationships',
                                                'full_product_name',
                                                'product_identification_helper',
                                                'x_generic_uris',
                                                'namespace',
                                              ],
                                              title:
                                                'Namespace of the generic URI',
                                              description:
                                                'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                                              metaInfo: {},
                                              type: 'URI',
                                            },
                                            {
                                              key: 'uri',
                                              fullName: [
                                                'product_tree',
                                                'relationships',
                                                'full_product_name',
                                                'product_identification_helper',
                                                'x_generic_uris',
                                                'uri',
                                              ],
                                              title: 'URI',
                                              description:
                                                'Contains the identifier itself.',
                                              metaInfo: {},
                                              type: 'URI',
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                      {
                        key: 'product_reference',
                        fullName: [
                          'product_tree',
                          'relationships',
                          'product_reference',
                        ],
                        title: 'Reference token for product instance',
                        description:
                          'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                        minLength: 1,
                        examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'relates_to_product_reference',
                        fullName: [
                          'product_tree',
                          'relationships',
                          'relates_to_product_reference',
                        ],
                        title: 'Reference token for product instance',
                        description:
                          'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                        minLength: 1,
                        examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                        metaInfo: {},
                        type: 'STRING',
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
      {
        key: 'vulnerabilities',
        fullName: ['vulnerabilities'],
        title: 'Vulnerabilities',
        description:
          'Represents a list of all relevant vulnerability information items.',
        metaData: {
          userDocumentation: {
            specification: 'docs/user/vulnerabilities-spec.en.md',
            usage: 'docs/user/vulnerabilities-usage.en.md',
          },
          relevanceLevels: {
            csafBase: 'want_to_have',
            csafSecurityIncidentResponse: 'nice_to_know',
            csafInformationalAdvisory: 'excluded',
            csafSecurityAdvisory: 'mandatory',
            csafVex: 'mandatory',
          },
          i18n: {
            title: 'VulnerabilitiesTitle',
            description: 'VulnerabilitiesDescription',
          },
        },
        type: 'ARRAY',
        metaInfo: {
          arrayType: {
            key: '',
            fullName: ['vulnerabilities'],
            title: 'Vulnerability',
            description:
              'Is a container for the aggregation of all fields that are related to a single vulnerability in the document.',
            metaData: {
              userDocumentation: {
                specification:
                  'docs/user/vulnerabilities/vulnerability-spec.en.md',
                usage: 'docs/user/vulnerabilities/vulnerability-usage.en.md',
              },
              relevanceLevels: { csafInformationalAdvisory: 'excluded' },
              i18n: {
                title: 'VulnerabilitiesItemsTitle',
                description: 'VulnerabilitiesItemsDescription',
              },
            },
            type: 'OBJECT',
            metaInfo: {
              propertyList: [
                {
                  key: 'acknowledgments',
                  fullName: ['vulnerabilities', 'acknowledgments'],
                  title: 'List of acknowledgments',
                  description: 'Contains a list of acknowledgment elements.',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'acknowledgments'],
                      title: 'Acknowledgment',
                      description:
                        'Acknowledges contributions by describing those that contributed.',
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'names',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'names',
                            ],
                            title: 'List of acknowledged names',
                            description:
                              'Contains the names of contributors being recognized.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'acknowledgments',
                                  'names',
                                ],
                                title: 'Name of the contributor',
                                description:
                                  'Contains the name of a single contributor being recognized.',
                                minLength: 1,
                                examples: [
                                  'Albert Einstein',
                                  'Johann Sebastian Bach',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'organization',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'organization',
                            ],
                            title: 'Contributing organization',
                            description:
                              'Contains the name of a contributing organization being recognized.',
                            minLength: 1,
                            examples: ['CISA', 'Google Project Zero', 'Talos'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'summary',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'summary',
                            ],
                            title: 'Summary of the acknowledgment',
                            description:
                              'SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties.',
                            minLength: 1,
                            examples: [
                              'First analysis of Coordinated Multi-Stream Attack (CMSA)',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'urls',
                            fullName: [
                              'vulnerabilities',
                              'acknowledgments',
                              'urls',
                            ],
                            title: 'List of URLs',
                            description:
                              'Specifies a list of URLs or location of the reference to be acknowledged.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'acknowledgments',
                                  'urls',
                                ],
                                title: 'URL of acknowledgment',
                                description:
                                  'Contains the URL or location of the reference to be acknowledged.',
                                metaInfo: {},
                                type: 'URI',
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'cve',
                  fullName: ['vulnerabilities', 'cve'],
                  title: 'CVE',
                  description:
                    'Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability.',
                  pattern: '^CVE-[0-9]{4}-[0-9]{4,}$',
                  metaInfo: {},
                  type: 'STRING',
                },
                {
                  key: 'cwe',
                  fullName: ['vulnerabilities', 'cwe'],
                  title: 'CWE',
                  description:
                    'Holds the MITRE standard Common Weakness Enumeration (CWE) for the weakness associated.',
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'id',
                        fullName: ['vulnerabilities', 'cwe', 'id'],
                        title: 'Weakness ID',
                        description:
                          'Holds the ID for the weakness associated.',
                        examples: ['CWE-22', 'CWE-352', 'CWE-79'],
                        pattern: '^CWE-[1-9]\\d{0,5}$',
                        metaInfo: {},
                        type: 'STRING',
                      },
                      {
                        key: 'name',
                        fullName: ['vulnerabilities', 'cwe', 'name'],
                        title: 'Weakness name',
                        description:
                          'Holds the full name of the weakness as given in the CWE specification.',
                        minLength: 1,
                        examples: [
                          'Cross-Site Request Forgery (CSRF)',
                          "Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                          "Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
                        ],
                        metaInfo: {},
                        type: 'STRING',
                      },
                    ],
                  },
                },
                {
                  key: 'discovery_date',
                  fullName: ['vulnerabilities', 'discovery_date'],
                  title: 'Discovery date',
                  description:
                    'Holds the date and time the vulnerability was originally discovered.',
                  metaInfo: {},
                  type: 'DATETIME',
                },
                {
                  key: 'flags',
                  fullName: ['vulnerabilities', 'flags'],
                  title: 'List of flags',
                  description: 'Contains a list of machine readable flags.',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'flags'],
                      title: 'Flag',
                      description:
                        'Contains product specific information in regard to this vulnerability as a single machine readable flag.',
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'date',
                            fullName: ['vulnerabilities', 'flags', 'date'],
                            title: 'Date of the flag',
                            description:
                              'Contains the date when assessment was done or the flag was assigned.',
                            metaInfo: {},
                            type: 'DATETIME',
                          },
                          {
                            key: 'group_ids',
                            fullName: ['vulnerabilities', 'flags', 'group_ids'],
                            title: 'List of product_group_ids',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'flags',
                                  'group_ids',
                                ],
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                minLength: 1,
                                examples: [
                                  'CSAFGID-0001',
                                  'CSAFGID-0002',
                                  'CSAFGID-0020',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'label',
                            fullName: ['vulnerabilities', 'flags', 'label'],
                            title: 'Label of the flag',
                            description:
                              'Specifies the machine readable label.',
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'flags',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'flags',
                                  'product_ids',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'ids',
                  fullName: ['vulnerabilities', 'ids'],
                  title: 'List of IDs',
                  description:
                    'Represents a list of unique labels or tracking IDs for the vulnerability (if such information exists).',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'ids'],
                      title: 'ID',
                      description:
                        'Contains a single unique label or tracking ID for the vulnerability.',
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'system_name',
                            fullName: ['vulnerabilities', 'ids', 'system_name'],
                            title: 'System name',
                            description:
                              'Indicates the name of the vulnerability tracking or numbering system.',
                            minLength: 1,
                            examples: ['Cisco Bug ID', 'GitHub Issue'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'text',
                            fullName: ['vulnerabilities', 'ids', 'text'],
                            title: 'Text',
                            description:
                              'Is unique label or tracking ID for the vulnerability (if such information exists).',
                            minLength: 1,
                            examples: ['CSCso66472', 'oasis-tcs/csaf#210'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'involvements',
                  fullName: ['vulnerabilities', 'involvements'],
                  title: 'List of involvements',
                  description: 'Contains a list of involvements.',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'involvements'],
                      title: 'Involvement',
                      description:
                        'Is a container, that allows the document producers to comment on the level of involvement (or engagement) of themselves or third parties in the vulnerability identification, scoping, and remediation process.',
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'date',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'date',
                            ],
                            title: 'Date of involvement',
                            description:
                              'Holds the date and time of the involvement entry.',
                            metaInfo: {},
                            type: 'DATETIME',
                          },
                          {
                            key: 'party',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'party',
                            ],
                            title: 'Party category',
                            description:
                              'Defines the category of the involved party.',
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'status',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'status',
                            ],
                            title: 'Party status',
                            description:
                              'Defines contact status of the involved party.',
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'summary',
                            fullName: [
                              'vulnerabilities',
                              'involvements',
                              'summary',
                            ],
                            title: 'Summary of the involvement',
                            description:
                              'Contains additional context regarding what is going on.',
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'notes',
                  fullName: ['vulnerabilities', 'notes'],
                  title: 'List of notes',
                  description:
                    'Contains notes which are specific to the current context.',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'notes'],
                      title: 'Note',
                      description:
                        'Is a place to put all manner of text blobs related to the current context.',
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'audience',
                            fullName: ['vulnerabilities', 'notes', 'audience'],
                            title: 'Audience of note',
                            description:
                              'Indicates who is intended to read it.',
                            minLength: 1,
                            examples: [
                              'all',
                              'executives',
                              'operational management and system administrators',
                              'safety engineers',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'category',
                            fullName: ['vulnerabilities', 'notes', 'category'],
                            title: 'Note category',
                            description:
                              'Contains the information of what kind of note this is.',
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'text',
                            fullName: ['vulnerabilities', 'notes', 'text'],
                            title: 'Note content',
                            description:
                              'Holds the content of the note. Content varies depending on type.',
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'title',
                            fullName: ['vulnerabilities', 'notes', 'title'],
                            title: 'Title of note',
                            description:
                              'Provides a concise description of what is contained in the text of the note.',
                            minLength: 1,
                            examples: [
                              'Details',
                              'Executive summary',
                              'Technical summary',
                              'Impact on safety systems',
                            ],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'product_status',
                  fullName: ['vulnerabilities', 'product_status'],
                  title: 'Product status',
                  description:
                    'Contains different lists of product_ids which provide details on the status of the referenced product related to the current vulnerability. ',
                  type: 'OBJECT',
                  metaInfo: {
                    propertyList: [
                      {
                        key: 'first_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'first_affected',
                        ],
                        title: 'List of product_ids',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'first_affected',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'first_fixed',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'first_fixed',
                        ],
                        title: 'List of product_ids',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'first_fixed',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'fixed',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'fixed',
                        ],
                        title: 'List of product_ids',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'fixed',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'known_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'known_affected',
                        ],
                        title: 'List of product_ids',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'known_affected',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'known_not_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'known_not_affected',
                        ],
                        title: 'List of product_ids',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'known_not_affected',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'last_affected',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'last_affected',
                        ],
                        title: 'List of product_ids',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'last_affected',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'recommended',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'recommended',
                        ],
                        title: 'List of product_ids',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'recommended',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                      {
                        key: 'under_investigation',
                        fullName: [
                          'vulnerabilities',
                          'product_status',
                          'under_investigation',
                        ],
                        title: 'List of product_ids',
                        description:
                          'Specifies a list of product_ids to give context to the parent item.',
                        type: 'ARRAY',
                        metaInfo: {
                          arrayType: {
                            key: '',
                            fullName: [
                              'vulnerabilities',
                              'product_status',
                              'under_investigation',
                            ],
                            title: 'Reference token for product instance',
                            description:
                              'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                            minLength: 1,
                            examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                            metaInfo: {},
                            type: 'STRING',
                          },
                        },
                      },
                    ],
                  },
                },
                {
                  key: 'references',
                  fullName: ['vulnerabilities', 'references'],
                  title: 'List of references',
                  description: 'Holds a list of references.',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'references'],
                      title: 'Reference',
                      description:
                        'Holds any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer.',
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'category',
                            fullName: [
                              'vulnerabilities',
                              'references',
                              'category',
                            ],
                            title: 'Category of reference',
                            description:
                              'Indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource.',
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'summary',
                            fullName: [
                              'vulnerabilities',
                              'references',
                              'summary',
                            ],
                            title: 'Summary of the reference',
                            description:
                              'Indicates what this reference refers to.',
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'url',
                            fullName: ['vulnerabilities', 'references', 'url'],
                            title: 'URL of reference',
                            description: 'Provides the URL for the reference.',
                            metaInfo: {},
                            type: 'URI',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'release_date',
                  fullName: ['vulnerabilities', 'release_date'],
                  title: 'Release date',
                  description:
                    'Holds the date and time the vulnerability was originally released into the wild.',
                  metaInfo: {},
                  type: 'DATETIME',
                },
                {
                  key: 'remediations',
                  fullName: ['vulnerabilities', 'remediations'],
                  title: 'List of remediations',
                  description: 'Contains a list of remediations.',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'remediations'],
                      title: 'Remediation',
                      description:
                        'Specifies details on how to handle (and presumably, fix) a vulnerability.',
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'category',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'category',
                            ],
                            title: 'Category of the remediation',
                            description:
                              'Specifies the category which this remediation belongs to.',
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'date',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'date',
                            ],
                            title: 'Date of the remediation',
                            description:
                              'Contains the date from which the remediation is available.',
                            metaInfo: {},
                            type: 'DATETIME',
                          },
                          {
                            key: 'details',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'details',
                            ],
                            title: 'Details of the remediation',
                            description:
                              'Contains a thorough human-readable discussion of the remediation.',
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'entitlements',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'entitlements',
                            ],
                            title: 'List of entitlements',
                            description: 'Contains a list of entitlements.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'remediations',
                                  'entitlements',
                                ],
                                title: 'Entitlement of the remediation',
                                description:
                                  'Contains any possible vendor-defined constraints for obtaining fixed software or hardware that fully resolves the vulnerability.',
                                minLength: 1,
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'group_ids',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'group_ids',
                            ],
                            title: 'List of product_group_ids',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'remediations',
                                  'group_ids',
                                ],
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                minLength: 1,
                                examples: [
                                  'CSAFGID-0001',
                                  'CSAFGID-0002',
                                  'CSAFGID-0020',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'remediations',
                                  'product_ids',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'restart_required',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'restart_required',
                            ],
                            title: 'Restart required by remediation',
                            description:
                              'Provides information on category of restart is required by this remediation to become effective.',
                            type: 'OBJECT',
                            metaInfo: {
                              propertyList: [
                                {
                                  key: 'category',
                                  fullName: [
                                    'vulnerabilities',
                                    'remediations',
                                    'restart_required',
                                    'category',
                                  ],
                                  title: 'Category of restart',
                                  description:
                                    'Specifies what category of restart is required by this remediation to become effective.',
                                  metaInfo: {},
                                  type: 'STRING',
                                },
                                {
                                  key: 'details',
                                  fullName: [
                                    'vulnerabilities',
                                    'remediations',
                                    'restart_required',
                                    'details',
                                  ],
                                  title: 'Additional restart information',
                                  description:
                                    'Provides additional information for the restart. This can include details on procedures, scope or impact.',
                                  minLength: 1,
                                  metaInfo: {},
                                  type: 'STRING',
                                },
                              ],
                            },
                          },
                          {
                            key: 'url',
                            fullName: [
                              'vulnerabilities',
                              'remediations',
                              'url',
                            ],
                            title: 'URL to the remediation',
                            description:
                              'Contains the URL where to obtain the remediation.',
                            metaInfo: {},
                            type: 'URI',
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'scores',
                  fullName: ['vulnerabilities', 'scores'],
                  title: 'List of scores',
                  description:
                    'Contains score objects for the current vulnerability.',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'scores'],
                      title: 'Score',
                      description:
                        'Specifies information about (at least one) score of the vulnerability and for which products the given value applies.',
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'cvss_v2',
                            fullName: ['vulnerabilities', 'scores', 'cvss_v2'],
                            type: 'OBJECT',
                            metaInfo: { propertyList: [] },
                          },
                          {
                            key: 'cvss_v3',
                            fullName: ['vulnerabilities', 'scores', 'cvss_v3'],
                            type: 'OBJECT',
                            metaInfo: { propertyList: [] },
                          },
                          {
                            key: 'products',
                            fullName: ['vulnerabilities', 'scores', 'products'],
                            title: 'List of product_ids',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'scores',
                                  'products',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'threats',
                  fullName: ['vulnerabilities', 'threats'],
                  title: 'List of threats',
                  description:
                    'Contains information about a vulnerability that can change with time.',
                  type: 'ARRAY',
                  metaInfo: {
                    arrayType: {
                      key: '',
                      fullName: ['vulnerabilities', 'threats'],
                      title: 'Threat',
                      description:
                        'Contains the vulnerability kinetic information. This information can change as the vulnerability ages and new information becomes available.',
                      type: 'OBJECT',
                      metaInfo: {
                        propertyList: [
                          {
                            key: 'category',
                            fullName: [
                              'vulnerabilities',
                              'threats',
                              'category',
                            ],
                            title: 'Category of the threat',
                            description:
                              'Categorizes the threat according to the rules of the specification.',
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'date',
                            fullName: ['vulnerabilities', 'threats', 'date'],
                            title: 'Date of the threat',
                            description:
                              'Contains the date when the assessment was done or the threat appeared.',
                            metaInfo: {},
                            type: 'DATETIME',
                          },
                          {
                            key: 'details',
                            fullName: ['vulnerabilities', 'threats', 'details'],
                            title: 'Details of the threat',
                            description:
                              'Represents a thorough human-readable discussion of the threat.',
                            minLength: 1,
                            metaInfo: {},
                            type: 'STRING',
                          },
                          {
                            key: 'group_ids',
                            fullName: [
                              'vulnerabilities',
                              'threats',
                              'group_ids',
                            ],
                            title: 'List of product_group_ids',
                            description:
                              'Specifies a list of product_group_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'threats',
                                  'group_ids',
                                ],
                                title:
                                  'Reference token for product group instance',
                                description:
                                  'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
                                minLength: 1,
                                examples: [
                                  'CSAFGID-0001',
                                  'CSAFGID-0002',
                                  'CSAFGID-0020',
                                ],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                          {
                            key: 'product_ids',
                            fullName: [
                              'vulnerabilities',
                              'threats',
                              'product_ids',
                            ],
                            title: 'List of product_ids',
                            description:
                              'Specifies a list of product_ids to give context to the parent item.',
                            type: 'ARRAY',
                            metaInfo: {
                              arrayType: {
                                key: '',
                                fullName: [
                                  'vulnerabilities',
                                  'threats',
                                  'product_ids',
                                ],
                                title: 'Reference token for product instance',
                                description:
                                  'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
                                minLength: 1,
                                examples: ['CSAFPID-0004', 'CSAFPID-0008'],
                                metaInfo: {},
                                type: 'STRING',
                              },
                            },
                          },
                        ],
                      },
                    },
                  },
                },
                {
                  key: 'title',
                  fullName: ['vulnerabilities', 'title'],
                  title: 'Title',
                  description:
                    'Gives the document producer the ability to apply a canonical name or title to the vulnerability.',
                  minLength: 1,
                  metaInfo: {},
                  type: 'STRING',
                },
              ],
            },
          },
        },
      },
    ],
  },
}
