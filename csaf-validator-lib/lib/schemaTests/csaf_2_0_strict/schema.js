export default {
  $id: 'https://docs.oasis-open.org/csaf/csaf/v2.0/csaf_json_schema.json?strict',
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $defs: {
    acknowledgments_t: {
      description: 'Contains a list of acknowledgment elements.',
      items: {
        additionalProperties: false,
        description:
          'Acknowledges contributions by describing those that contributed.',
        minProperties: 1,
        properties: {
          names: {
            description: 'Contains the names of entities being recognized.',
            items: {
              description: 'Contains the name of a single person.',
              examples: ['Albert Einstein', 'Johann Sebastian Bach'],
              minLength: 1,
              title: 'Name of entity being recognized',
              type: 'string',
            },
            minItems: 1,
            title: 'List of acknowledged names',
            type: 'array',
          },
          organization: {
            description:
              'Contains the name of a contributing organization being recognized.',
            examples: ['CISA', 'Google Project Zero', 'Talos'],
            minLength: 1,
            title: 'Contributing organization',
            type: 'string',
          },
          summary: {
            description:
              'SHOULD represent any contextual details the document producers wish to make known about the acknowledgment or acknowledged parties.',
            examples: [
              'First analysis of Coordinated Multi-Stream Attack (CMSA)',
            ],
            minLength: 1,
            title: 'Summary of the acknowledgment',
            type: 'string',
          },
          urls: {
            description:
              'Specifies a list of URLs or location of the reference to be acknowledged.',
            items: {
              description:
                'Contains the URL or location of the reference to be acknowledged.',
              format: 'uri',
              title: 'URL of acknowledgment',
              type: 'string',
            },
            minItems: 1,
            title: 'List of URLs',
            type: 'array',
          },
        },
        title: 'Acknowledgment',
        type: 'object',
      },
      minItems: 1,
      title: 'List of acknowledgments',
      type: 'array',
    },
    branches_t: {
      description:
        'Contains branch elements as children of the current element.',
      items: {
        additionalProperties: false,
        description:
          'Is a part of the hierarchical structure of the product tree.',
        maxProperties: 3,
        minProperties: 3,
        properties: {
          branches: {
            $ref: '#/$defs/branches_t',
          },
          category: {
            description: 'Describes the characteristics of the labeled branch.',
            enum: [
              'architecture',
              'host_name',
              'language',
              'legacy',
              'patch_level',
              'product_family',
              'product_name',
              'product_version',
              'product_version_range',
              'service_pack',
              'specification',
              'vendor',
            ],
            title: 'Category of the branch',
            type: 'string',
          },
          name: {
            description:
              "Contains the canonical descriptor or 'friendly name' of the branch.",
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
            minLength: 1,
            title: 'Name of the branch',
            type: 'string',
          },
          product: {
            $ref: '#/$defs/full_product_name_t',
          },
        },
        required: ['category', 'name'],
        title: 'Branch',
        type: 'object',
      },
      minItems: 1,
      title: 'List of branches',
      type: 'array',
    },
    full_product_name_t: {
      additionalProperties: false,
      description:
        'Specifies information about the product and assigns the product_id.',
      properties: {
        name: {
          description:
            'The value should be the product\u2019s full canonical name, including version number and other attributes, as it would be used in a human-friendly document.',
          examples: [
            'Cisco AnyConnect Secure Mobility Client 2.3.185',
            'Microsoft Host Integration Server 2006 Service Pack 1',
          ],
          minLength: 1,
          title: 'Textual description of the product',
          type: 'string',
        },
        product_id: {
          $ref: '#/$defs/product_id_t',
        },
        product_identification_helper: {
          additionalProperties: false,
          description:
            'Provides at least one method which aids in identifying the product in an asset database.',
          minProperties: 1,
          properties: {
            cpe: {
              description:
                'The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification.',
              minLength: 5,
              pattern:
                '^((cpe:2\\.3:[aho\\*\\-](:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,\\/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){5}(:(([a-zA-Z]{2,3}(-([a-zA-Z]{2}|[0-9]{3}))?)|[\\*\\-]))(:(((\\?*|\\*?)([a-zA-Z0-9\\-\\._]|(\\\\[\\\\\\*\\?!"#\\$%&\'\\(\\)\\+,\\/:;<=>@\\[\\]\\^`\\{\\|\\}~]))+(\\?*|\\*?))|[\\*\\-])){4})|([c][pP][eE]:\\/[AHOaho]?(:[A-Za-z0-9\\._\\-~%]*){0,6}))$',
              title: 'Common Platform Enumeration representation',
              type: 'string',
            },
            hashes: {
              description:
                'Contains a list of cryptographic hashes usable to identify files.',
              items: {
                additionalProperties: false,
                description:
                  'Contains all information to identify a file based on its cryptographic hash values.',
                properties: {
                  file_hashes: {
                    description:
                      'Contains a list of cryptographic hashes for this file.',
                    items: {
                      additionalProperties: false,
                      description:
                        'Contains one hash value and algorithm of the file to be identified.',
                      properties: {
                        algorithm: {
                          default: 'sha256',
                          description:
                            'Contains the name of the cryptographic hash algorithm used to calculate the value.',
                          examples: [
                            'blake2b512',
                            'sha256',
                            'sha3-512',
                            'sha384',
                            'sha512',
                          ],
                          minLength: 1,
                          title: 'Algorithm of the cryptographic hash',
                          type: 'string',
                        },
                        value: {
                          description:
                            'Contains the cryptographic hash value in hexadecimal representation.',
                          examples: [
                            '37df33cb7464da5c7f077f4d56a32bc84987ec1d85b234537c1c1a4d4fc8d09dc29e2e762cb5203677bf849a2855a0283710f1f5fe1d6ce8d5ac85c645d0fcb3',
                            '4775203615d9534a8bfca96a93dc8b461a489f69124a130d786b42204f3341cc',
                            '9ea4c8200113d49d26505da0e02e2f49055dc078d1ad7a419b32e291c7afebbb84badfbd46dec42883bea0b2a1fa697c',
                          ],
                          minLength: 32,
                          pattern: '^[0-9a-fA-F]{32,}$',
                          title: 'Value of the cryptographic hash',
                          type: 'string',
                        },
                      },
                      required: ['algorithm', 'value'],
                      title: 'File hash',
                      type: 'object',
                    },
                    minItems: 1,
                    title: 'List of file hashes',
                    type: 'array',
                  },
                  filename: {
                    description:
                      'Contains the name of the file which is identified by the hash values.',
                    examples: ['WINWORD.EXE', 'msotadddin.dll', 'sudoers.so'],
                    minLength: 1,
                    title: 'Filename',
                    type: 'string',
                  },
                },
                required: ['file_hashes', 'filename'],
                title: 'Cryptographic hashes',
                type: 'object',
              },
              minItems: 1,
              title: 'List of hashes',
              type: 'array',
            },
            model_numbers: {
              description: 'Contains a list of parts, or full model numbers.',
              items: {
                description:
                  'Contains a part, or a full model number of the component to identify.',
                minLength: 1,
                title: 'Model number',
                type: 'string',
              },
              minItems: 1,
              title: 'List of models',
              type: 'array',
              uniqueItems: true,
            },
            purl: {
              description:
                'The package URL (purl) attribute refers to a method for reliably identifying and locating software packages external to this specification.',
              format: 'uri',
              minLength: 7,
              pattern: '^pkg:[A-Za-z\\.\\-\\+][A-Za-z0-9\\.\\-\\+]*\\/.+',
              title: 'package URL representation',
              type: 'string',
            },
            sbom_urls: {
              description:
                'Contains a list of URLs where SBOMs for this product can be retrieved.',
              items: {
                description: 'Contains a URL of one SBOM for this product.',
                format: 'uri',
                title: 'SBOM URL',
                type: 'string',
              },
              minItems: 1,
              title: 'List of SBOM URLs',
              type: 'array',
            },
            serial_numbers: {
              description: 'Contains a list of parts, or full serial numbers.',
              items: {
                description:
                  'Contains a part, or a full serial number of the component to identify.',
                minLength: 1,
                title: 'Serial number',
                type: 'string',
              },
              minItems: 1,
              title: 'List of serial numbers',
              type: 'array',
              uniqueItems: true,
            },
            skus: {
              description:
                'Contains a list of parts, or full stock keeping units.',
              items: {
                description:
                  'Contains a part, or a full stock keeping unit (SKU) which is used in the ordering process to identify the component.',
                minLength: 1,
                title: 'Stock keeping unit',
                type: 'string',
              },
              minItems: 1,
              title: 'List of stock keeping units',
              type: 'array',
            },
            x_generic_uris: {
              description:
                'Contains a list of identifiers which are either vendor-specific or derived from a standard not yet supported.',
              items: {
                additionalProperties: false,
                description:
                  'Provides a generic extension point for any identifier which is either vendor-specific or derived from a standard not yet supported.',
                properties: {
                  namespace: {
                    description:
                      'Refers to a URL which provides the name and knowledge about the specification used or is the namespace in which these values are valid.',
                    format: 'uri',
                    title: 'Namespace of the generic URI',
                    type: 'string',
                  },
                  uri: {
                    description: 'Contains the identifier itself.',
                    format: 'uri',
                    title: 'URI',
                    type: 'string',
                  },
                },
                required: ['namespace', 'uri'],
                title: 'Generic URI',
                type: 'object',
              },
              minItems: 1,
              title: 'List of generic URIs',
              type: 'array',
            },
          },
          title: 'Helper to identify the product',
          type: 'object',
        },
      },
      required: ['name', 'product_id'],
      title: 'Full product name',
      type: 'object',
    },
    lang_t: {
      description:
        'Identifies a language, corresponding to IETF BCP 47 / RFC 5646. See IETF language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry',
      examples: ['de', 'en', 'fr', 'frc', 'jp'],
      pattern:
        '^(([A-Za-z]{2,3}(-[A-Za-z]{3}(-[A-Za-z]{3}){0,2})?|[A-Za-z]{4,8})(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-[A-WY-Za-wy-z0-9](-[A-Za-z0-9]{2,8})+)*(-[Xx](-[A-Za-z0-9]{1,8})+)?|[Xx](-[A-Za-z0-9]{1,8})+|[Ii]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ii]-[Mm][Ii][Nn][Gg][Oo])$',
      title: 'Language type',
      type: 'string',
    },
    notes_t: {
      description: 'Contains notes which are specific to the current context.',
      items: {
        additionalProperties: false,
        description:
          'Is a place to put all manner of text blobs related to the current context.',
        properties: {
          audience: {
            description: 'Indicate who is intended to read it.',
            examples: [
              'all',
              'executives',
              'operational management and system administrators',
              'safety engineers',
            ],
            minLength: 1,
            title: 'Audience of note',
            type: 'string',
          },
          category: {
            description: 'Choice of what kind of note this is.',
            enum: [
              'description',
              'details',
              'faq',
              'general',
              'legal_disclaimer',
              'other',
              'summary',
            ],
            title: 'Note category',
            type: 'string',
          },
          text: {
            description:
              'The contents of the note. Content varies depending on type.',
            minLength: 1,
            title: 'Note contents',
            type: 'string',
          },
          title: {
            description:
              'Provides a concise description of what is contained in the text of the note.',
            examples: [
              'Details',
              'Executive summary',
              'Technical summary',
              'Impact on safety systems',
            ],
            minLength: 1,
            title: 'Title of note',
            type: 'string',
          },
        },
        required: ['category', 'text'],
        title: 'Note',
        type: 'object',
      },
      minItems: 1,
      title: 'List of notes',
      type: 'array',
    },
    product_group_id_t: {
      description:
        'Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document.',
      examples: ['CSAFGID-0001', 'CSAFGID-0002', 'CSAFGID-0020'],
      minLength: 1,
      title: 'Reference token for product group instance',
      type: 'string',
    },
    product_groups_t: {
      description:
        'Specifies a list of product_group_ids to give context to the parent item.',
      items: {
        $ref: '#/$defs/product_group_id_t',
      },
      minItems: 1,
      title: 'List of product_group_ids',
      type: 'array',
      uniqueItems: true,
    },
    product_id_t: {
      description:
        'Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document.',
      examples: ['CSAFPID-0004', 'CSAFPID-0008'],
      minLength: 1,
      title: 'Reference token for product instance',
      type: 'string',
    },
    products_t: {
      description:
        'Specifies a list of product_ids to give context to the parent item.',
      items: {
        $ref: '#/$defs/product_id_t',
      },
      minItems: 1,
      title: 'List of product_ids',
      type: 'array',
      uniqueItems: true,
    },
    references_t: {
      description: 'Holds a list of references.',
      items: {
        additionalProperties: false,
        description:
          'Holds any reference to conferences, papers, advisories, and other resources that are related and considered related to either a surrounding part of or the entire document and to be of value to the document consumer.',
        properties: {
          category: {
            default: 'external',
            description:
              'Indicates whether the reference points to the same document or vulnerability in focus (depending on scope) or to an external resource.',
            enum: ['external', 'self'],
            title: 'Category of reference',
            type: 'string',
          },
          summary: {
            description: 'Indicates what this reference refers to.',
            minLength: 1,
            title: 'Summary of the reference',
            type: 'string',
          },
          url: {
            description: 'Provides the URL for the reference.',
            format: 'uri',
            title: 'URL of reference',
            type: 'string',
          },
        },
        required: ['summary', 'url'],
        title: 'Reference',
        type: 'object',
      },
      minItems: 1,
      title: 'List of references',
      type: 'array',
    },
    version_t: {
      description:
        'Specifies a version string to denote clearly the evolution of the content of the document. Format must be either integer or semantic versioning.',
      examples: ['1', '4', '0.9.0', '1.4.3', '2.40.0+21AF26D3'],
      pattern:
        '^(0|[1-9][0-9]*)$|^((0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?)$',
      title: 'Version',
      type: 'string',
    },
  },
  additionalProperties: false,
  description:
    'Representation of security advisory information as a JSON document.',
  properties: {
    document: {
      additionalProperties: false,
      description:
        'Captures the meta-data about this document describing a particular set of security advisories.',
      properties: {
        acknowledgments: {
          $ref: '#/$defs/acknowledgments_t',
          description:
            'Contains a list of acknowledgment elements associated with the whole document.',
          title: 'Document acknowledgments',
        },
        aggregate_severity: {
          additionalProperties: false,
          description:
            "Is a vehicle that is provided by the document producer to convey the urgency and criticality with which the one or more vulnerabilities reported should be addressed. It is a document-level metric and applied to the document as a whole \u2014 not any specific vulnerability. The range of values in this field is defined according to the document producer's policies and procedures.",
          properties: {
            namespace: {
              description: 'Points to the namespace so referenced.',
              format: 'uri',
              title: 'Namespace of aggregate severity',
              type: 'string',
            },
            text: {
              description:
                'Provides a severity which is independent of - and in addition to - any other standard metric for determining the impact or severity of a given vulnerability (such as CVSS).',
              examples: ['Critical', 'Important', 'Moderate'],
              minLength: 1,
              title: 'Text of aggregate severity',
              type: 'string',
            },
          },
          required: ['text'],
          title: 'Aggregate severity',
          type: 'object',
        },
        category: {
          description:
            'Defines a short canonical name, chosen by the document producer, which will inform the end user as to the category of document.',
          examples: [
            'csaf_base',
            'csaf_security_advisory',
            'csaf_vex',
            'Example Company Security Notice',
          ],
          minLength: 1,
          pattern: '^[^\\s\\-_\\.](.*[^\\s\\-_\\.])?$',
          title: 'Document category',
          type: 'string',
        },
        csaf_version: {
          description:
            'Gives the version of the CSAF specification which the document was generated for.',
          enum: ['2.0'],
          title: 'CSAF version',
          type: 'string',
        },
        distribution: {
          additionalProperties: false,
          description:
            'Describe any constraints on how this document might be shared.',
          minProperties: 1,
          properties: {
            text: {
              description:
                'Provides a textual description of additional constraints.',
              examples: [
                'Copyright 2021, Example Company, All Rights Reserved.',
                'Distribute freely.',
                'Share only on a need-to-know-basis only.',
              ],
              minLength: 1,
              title: 'Textual description',
              type: 'string',
            },
            tlp: {
              additionalProperties: false,
              description:
                'Provides details about the TLP classification of the document.',
              properties: {
                label: {
                  description: 'Provides the TLP label of the document.',
                  enum: ['AMBER', 'GREEN', 'RED', 'WHITE'],
                  title: 'Label of TLP',
                  type: 'string',
                },
                url: {
                  default: 'https://www.first.org/tlp/',
                  description:
                    'Provides a URL where to find the textual description of the TLP version which is used in this document. Default is the URL to the definition by FIRST.',
                  examples: [
                    'https://www.us-cert.gov/tlp',
                    'https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Kritis/Merkblatt_TLP.pdf',
                  ],
                  format: 'uri',
                  title: 'URL of TLP version',
                  type: 'string',
                },
              },
              required: ['label'],
              title: 'Traffic Light Protocol (TLP)',
              type: 'object',
            },
          },
          title: 'Rules for sharing document',
          type: 'object',
        },
        lang: {
          $ref: '#/$defs/lang_t',
          description:
            'Identifies the language used by this document, corresponding to IETF BCP 47 / RFC 5646.',
          title: 'Document language',
        },
        notes: {
          $ref: '#/$defs/notes_t',
          description: 'Holds notes associated with the whole document.',
          title: 'Document notes',
        },
        publisher: {
          additionalProperties: false,
          description:
            'Provides information about the publisher of the document.',
          properties: {
            category: {
              description:
                'Provides information about the category of publisher releasing the document.',
              enum: [
                'coordinator',
                'discoverer',
                'other',
                'translator',
                'user',
                'vendor',
              ],
              title: 'Category of publisher',
              type: 'string',
            },
            contact_details: {
              description:
                'Information on how to contact the publisher, possibly including details such as web sites, email addresses, phone numbers, and postal mail addresses.',
              examples: [
                'Example Company can be reached at contact_us@example.com, or via our website at https://www.example.com/contact.',
              ],
              minLength: 1,
              title: 'Contact details',
              type: 'string',
            },
            issuing_authority: {
              description:
                "Provides information about the authority of the issuing party to release the document, in particular, the party's constituency and responsibilities or other obligations.",
              minLength: 1,
              title: 'Issuing authority',
              type: 'string',
            },
            name: {
              description: 'Contains the name of the issuing party.',
              examples: ['BSI', 'Cisco PSIRT', 'Siemens ProductCERT'],
              minLength: 1,
              title: 'Name of publisher',
              type: 'string',
            },
            namespace: {
              description:
                'Contains a URL which is under control of the issuing party and can be used as a globally unique identifier for that issuing party.',
              examples: ['https://csaf.io', 'https://www.example.com'],
              format: 'uri',
              title: 'Namespace of publisher',
              type: 'string',
            },
          },
          required: ['category', 'name', 'namespace'],
          title: 'Publisher',
          type: 'object',
        },
        references: {
          $ref: '#/$defs/references_t',
          description:
            'Holds a list of references associated with the whole document.',
          title: 'Document references',
        },
        source_lang: {
          $ref: '#/$defs/lang_t',
          description:
            'If this copy of the document is a translation then the value of this property describes from which language this document was translated.',
          title: 'Source language',
        },
        title: {
          description:
            'This SHOULD be a canonical name for the document, and sufficiently unique to distinguish it from similar documents.',
          examples: [
            'Cisco IPv6 Crafted Packet Denial of Service Vulnerability',
            'Example Company Cross-Site-Scripting Vulnerability in Example Generator',
          ],
          minLength: 1,
          title: 'Title of this document',
          type: 'string',
        },
        tracking: {
          additionalProperties: false,
          description:
            'Is a container designated to hold all management attributes necessary to track a CSAF document as a whole.',
          properties: {
            aliases: {
              description:
                'Contains a list of alternate names for the same document.',
              items: {
                description:
                  'Specifies a non-empty string that represents a distinct optional alternative ID used to refer to the document.',
                examples: ['CVE-2019-12345'],
                minLength: 1,
                title: 'Alternate name',
                type: 'string',
              },
              minItems: 1,
              title: 'Aliases',
              type: 'array',
              uniqueItems: true,
            },
            current_release_date: {
              description:
                'The date when the current revision of this document was released',
              format: 'date-time',
              title: 'Current release date',
              type: 'string',
            },
            generator: {
              additionalProperties: false,
              description:
                'Is a container to hold all elements related to the generation of the document. These items will reference when the document was actually created, including the date it was generated and the entity that generated it.',
              properties: {
                date: {
                  description:
                    'This SHOULD be the current date that the document was generated. Because documents are often generated internally by a document producer and exist for a nonzero amount of time before being released, this field MAY be different from the Initial Release Date and Current Release Date.',
                  format: 'date-time',
                  title: 'Date of document generation',
                  type: 'string',
                },
                engine: {
                  additionalProperties: false,
                  description:
                    'Contains information about the engine that generated the CSAF document.',
                  properties: {
                    name: {
                      description:
                        'Represents the name of the engine that generated the CSAF document.',
                      examples: ['Red Hat rhsa-to-cvrf', 'Secvisogram', 'TVCE'],
                      minLength: 1,
                      title: 'Engine name',
                      type: 'string',
                    },
                    version: {
                      description:
                        'Contains the version of the engine that generated the CSAF document.',
                      examples: ['0.6.0', '1.0.0-beta+exp.sha.a1c44f85', '2'],
                      minLength: 1,
                      title: 'Engine version',
                      type: 'string',
                    },
                  },
                  required: ['name'],
                  title: 'Engine of document generation',
                  type: 'object',
                },
              },
              required: ['engine'],
              title: 'Document generator',
              type: 'object',
            },
            id: {
              description:
                'The ID is a simple label that provides for a wide range of numbering values, types, and schemes. Its value SHOULD be assigned and maintained by the original document issuing authority.',
              examples: [
                'Example Company - 2019-YH3234',
                'RHBA-2019:0024',
                'cisco-sa-20190513-secureboot',
              ],
              minLength: 1,
              pattern: '^[\\S](.*[\\S])?$',
              title: 'Unique identifier for the document',
              type: 'string',
            },
            initial_release_date: {
              description: 'The date when this document was first published.',
              format: 'date-time',
              title: 'Initial release date',
              type: 'string',
            },
            revision_history: {
              description:
                'Holds one revision item for each version of the CSAF document, including the initial one.',
              items: {
                additionalProperties: false,
                description:
                  'Contains all the information elements required to track the evolution of a CSAF document.',
                properties: {
                  date: {
                    description: 'The date of the revision entry',
                    format: 'date-time',
                    title: 'Date of the revision',
                    type: 'string',
                  },
                  legacy_version: {
                    description:
                      'Contains the version string used in an existing document with the same content.',
                    minLength: 1,
                    title: 'Legacy version of the revision',
                    type: 'string',
                  },
                  number: {
                    $ref: '#/$defs/version_t',
                  },
                  summary: {
                    description:
                      'Holds a single non-empty string representing a short description of the changes.',
                    examples: ['Initial version.'],
                    minLength: 1,
                    title: 'Summary of the revision',
                    type: 'string',
                  },
                },
                required: ['date', 'number', 'summary'],
                title: 'Revision',
                type: 'object',
              },
              minItems: 1,
              title: 'Revision history',
              type: 'array',
            },
            status: {
              description: 'Defines the draft status of the document.',
              enum: ['draft', 'final', 'interim'],
              title: 'Document status',
              type: 'string',
            },
            version: {
              $ref: '#/$defs/version_t',
            },
          },
          required: [
            'current_release_date',
            'id',
            'initial_release_date',
            'revision_history',
            'status',
            'version',
          ],
          title: 'Tracking',
          type: 'object',
        },
      },
      required: ['category', 'csaf_version', 'publisher', 'title', 'tracking'],
      title: 'Document level meta-data',
      type: 'object',
    },
    product_tree: {
      additionalProperties: false,
      description:
        'Is a container for all fully qualified product names that can be referenced elsewhere in the document.',
      minProperties: 1,
      properties: {
        branches: {
          $ref: '#/$defs/branches_t',
        },
        full_product_names: {
          description: 'Contains a list of full product names.',
          items: {
            $ref: '#/$defs/full_product_name_t',
          },
          minItems: 1,
          title: 'List of full product names',
          type: 'array',
        },
        product_groups: {
          description: 'Contains a list of product groups.',
          items: {
            additionalProperties: false,
            description:
              'Defines a new logical group of products that can then be referred to in other parts of the document to address a group of products with a single identifier.',
            properties: {
              group_id: {
                $ref: '#/$defs/product_group_id_t',
              },
              product_ids: {
                description:
                  'Lists the product_ids of those products which known as one group in the document.',
                items: {
                  $ref: '#/$defs/product_id_t',
                },
                minItems: 2,
                title: 'List of Product IDs',
                type: 'array',
                uniqueItems: true,
              },
              summary: {
                description:
                  'Gives a short, optional description of the group.',
                examples: [
                  'Products supporting Modbus.',
                  'The x64 versions of the operating system.',
                ],
                minLength: 1,
                title: 'Summary of the product group',
                type: 'string',
              },
            },
            required: ['group_id', 'product_ids'],
            title: 'Product group',
            type: 'object',
          },
          minItems: 1,
          title: 'List of product groups',
          type: 'array',
        },
        relationships: {
          description: 'Contains a list of relationships.',
          items: {
            additionalProperties: false,
            description:
              'Establishes a link between two existing full_product_name_t elements, allowing the document producer to define a combination of two products that form a new full_product_name entry.',
            properties: {
              category: {
                description:
                  'Defines the category of relationship for the referenced component.',
                enum: [
                  'default_component_of',
                  'external_component_of',
                  'installed_on',
                  'installed_with',
                  'optional_component_of',
                ],
                title: 'Relationship category',
                type: 'string',
              },
              full_product_name: {
                $ref: '#/$defs/full_product_name_t',
              },
              product_reference: {
                $ref: '#/$defs/product_id_t',
                description:
                  'Holds a Product ID that refers to the Full Product Name element, which is referenced as the first element of the relationship.',
                title: 'Product reference',
              },
              relates_to_product_reference: {
                $ref: '#/$defs/product_id_t',
                description:
                  'Holds a Product ID that refers to the Full Product Name element, which is referenced as the second element of the relationship.',
                title: 'Relates to product reference',
              },
            },
            required: [
              'category',
              'full_product_name',
              'product_reference',
              'relates_to_product_reference',
            ],
            title: 'Relationship',
            type: 'object',
          },
          minItems: 1,
          title: 'List of relationships',
          type: 'array',
        },
      },
      title: 'Product tree',
      type: 'object',
    },
    vulnerabilities: {
      description:
        'Represents a list of all relevant vulnerability information items.',
      items: {
        additionalProperties: false,
        description:
          'Is a container for the aggregation of all fields that are related to a single vulnerability in the document.',
        minProperties: 1,
        properties: {
          acknowledgments: {
            $ref: '#/$defs/acknowledgments_t',
            description:
              'Contains a list of acknowledgment elements associated with this vulnerability item.',
            title: 'Vulnerability acknowledgments',
          },
          cve: {
            description:
              'Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability.',
            pattern: '^CVE-[0-9]{4}-[0-9]{4,}$',
            title: 'CVE',
            type: 'string',
          },
          cwe: {
            additionalProperties: false,
            description:
              'Holds the MITRE standard Common Weakness Enumeration (CWE) for the weakness associated.',
            properties: {
              id: {
                description: 'Holds the ID for the weakness associated.',
                examples: ['CWE-22', 'CWE-352', 'CWE-79'],
                pattern: '^CWE-[1-9]\\d{0,5}$',
                title: 'Weakness ID',
                type: 'string',
              },
              name: {
                description:
                  'Holds the full name of the weakness as given in the CWE specification.',
                examples: [
                  'Cross-Site Request Forgery (CSRF)',
                  "Improper Limitation of a Pathname to a Restricted Directory ('Path Traversal')",
                  "Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting')",
                ],
                minLength: 1,
                title: 'Weakness name',
                type: 'string',
              },
            },
            required: ['id', 'name'],
            title: 'CWE',
            type: 'object',
          },
          discovery_date: {
            description:
              'Holds the date and time the vulnerability was originally discovered.',
            format: 'date-time',
            title: 'Discovery date',
            type: 'string',
          },
          flags: {
            description: 'Contains a list of machine readable flags.',
            items: {
              additionalProperties: false,
              description:
                'Contains product specific information in regard to this vulnerability as a single machine readable flag.',
              properties: {
                date: {
                  description:
                    'Contains the date when assessment was done or the flag was assigned.',
                  format: 'date-time',
                  title: 'Date of the flag',
                  type: 'string',
                },
                group_ids: {
                  $ref: '#/$defs/product_groups_t',
                },
                label: {
                  description: 'Specifies the machine readable label.',
                  enum: [
                    'component_not_present',
                    'inline_mitigations_already_exist',
                    'vulnerable_code_cannot_be_controlled_by_adversary',
                    'vulnerable_code_not_in_execute_path',
                    'vulnerable_code_not_present',
                  ],
                  title: 'Label of the flag',
                  type: 'string',
                },
                product_ids: {
                  $ref: '#/$defs/products_t',
                },
              },
              required: ['label'],
              title: 'Flag',
              type: 'object',
            },
            minItems: 1,
            title: 'List of flags',
            type: 'array',
            uniqueItems: true,
          },
          ids: {
            description:
              'Represents a list of unique labels or tracking IDs for the vulnerability (if such information exists).',
            items: {
              additionalProperties: false,
              description:
                'Contains a single unique label or tracking ID for the vulnerability.',
              properties: {
                system_name: {
                  description:
                    'Indicates the name of the vulnerability tracking or numbering system.',
                  examples: ['Cisco Bug ID', 'GitHub Issue'],
                  minLength: 1,
                  title: 'System name',
                  type: 'string',
                },
                text: {
                  description:
                    'Is unique label or tracking ID for the vulnerability (if such information exists).',
                  examples: ['CSCso66472', 'oasis-tcs/csaf#210'],
                  minLength: 1,
                  title: 'Text',
                  type: 'string',
                },
              },
              required: ['system_name', 'text'],
              title: 'ID',
              type: 'object',
            },
            minItems: 1,
            title: 'List of IDs',
            type: 'array',
            uniqueItems: true,
          },
          involvements: {
            description: 'Contains a list of involvements.',
            items: {
              additionalProperties: false,
              description:
                'Is a container, that allows the document producers to comment on the level of involvement (or engagement) of themselves or third parties in the vulnerability identification, scoping, and remediation process.',
              properties: {
                date: {
                  description:
                    'Holds the date and time of the involvement entry.',
                  format: 'date-time',
                  title: 'Date of involvement',
                  type: 'string',
                },
                party: {
                  description: 'Defines the category of the involved party.',
                  enum: [
                    'coordinator',
                    'discoverer',
                    'other',
                    'user',
                    'vendor',
                  ],
                  title: 'Party category',
                  type: 'string',
                },
                status: {
                  description: 'Defines contact status of the involved party.',
                  enum: [
                    'completed',
                    'contact_attempted',
                    'disputed',
                    'in_progress',
                    'not_contacted',
                    'open',
                  ],
                  title: 'Party status',
                  type: 'string',
                },
                summary: {
                  description:
                    'Contains additional context regarding what is going on.',
                  minLength: 1,
                  title: 'Summary of the involvement',
                  type: 'string',
                },
              },
              required: ['party', 'status'],
              title: 'Involvement',
              type: 'object',
            },
            minItems: 1,
            title: 'List of involvements',
            type: 'array',
            uniqueItems: true,
          },
          notes: {
            $ref: '#/$defs/notes_t',
            description: 'Holds notes associated with this vulnerability item.',
            title: 'Vulnerability notes',
          },
          product_status: {
            additionalProperties: false,
            description:
              'Contains different lists of product_ids which provide details on the status of the referenced product related to the current vulnerability. ',
            minProperties: 1,
            properties: {
              first_affected: {
                $ref: '#/$defs/products_t',
                description:
                  'These are the first versions of the releases known to be affected by the vulnerability.',
                title: 'First affected',
              },
              first_fixed: {
                $ref: '#/$defs/products_t',
                description:
                  'These versions contain the first fix for the vulnerability but may not be the recommended fixed versions.',
                title: 'First fixed',
              },
              fixed: {
                $ref: '#/$defs/products_t',
                description:
                  'These versions contain a fix for the vulnerability but may not be the recommended fixed versions.',
                title: 'Fixed',
              },
              known_affected: {
                $ref: '#/$defs/products_t',
                description:
                  'These versions are known to be affected by the vulnerability.',
                title: 'Known affected',
              },
              known_not_affected: {
                $ref: '#/$defs/products_t',
                description:
                  'These versions are known not to be affected by the vulnerability.',
                title: 'Known not affected',
              },
              last_affected: {
                $ref: '#/$defs/products_t',
                description:
                  'These are the last versions in a release train known to be affected by the vulnerability. Subsequently released versions would contain a fix for the vulnerability.',
                title: 'Last affected',
              },
              recommended: {
                $ref: '#/$defs/products_t',
                description:
                  'These versions have a fix for the vulnerability and are the vendor-recommended versions for fixing the vulnerability.',
                title: 'Recommended',
              },
              under_investigation: {
                $ref: '#/$defs/products_t',
                description:
                  'It is not known yet whether these versions are or are not affected by the vulnerability. However, it is still under investigation - the result will be provided in a later release of the document.',
                title: 'Under investigation',
              },
            },
            title: 'Product status',
            type: 'object',
          },
          references: {
            $ref: '#/$defs/references_t',
            description:
              'Holds a list of references associated with this vulnerability item.',
            title: 'Vulnerability references',
          },
          release_date: {
            description:
              'Holds the date and time the vulnerability was originally released into the wild.',
            format: 'date-time',
            title: 'Release date',
            type: 'string',
          },
          remediations: {
            description: 'Contains a list of remediations.',
            items: {
              additionalProperties: false,
              description:
                'Specifies details on how to handle (and presumably, fix) a vulnerability.',
              properties: {
                category: {
                  description:
                    'Specifies the category which this remediation belongs to.',
                  enum: [
                    'mitigation',
                    'no_fix_planned',
                    'none_available',
                    'vendor_fix',
                    'workaround',
                  ],
                  title: 'Category of the remediation',
                  type: 'string',
                },
                date: {
                  description:
                    'Contains the date from which the remediation is available.',
                  format: 'date-time',
                  title: 'Date of the remediation',
                  type: 'string',
                },
                details: {
                  description:
                    'Contains a thorough human-readable discussion of the remediation.',
                  minLength: 1,
                  title: 'Details of the remediation',
                  type: 'string',
                },
                entitlements: {
                  description: 'Contains a list of entitlements.',
                  items: {
                    description:
                      'Contains any possible vendor-defined constraints for obtaining fixed software or hardware that fully resolves the vulnerability.',
                    minLength: 1,
                    title: 'Entitlement of the remediation',
                    type: 'string',
                  },
                  minItems: 1,
                  title: 'List of entitlements',
                  type: 'array',
                },
                group_ids: {
                  $ref: '#/$defs/product_groups_t',
                },
                product_ids: {
                  $ref: '#/$defs/products_t',
                },
                restart_required: {
                  additionalProperties: false,
                  description:
                    'Provides information on category of restart is required by this remediation to become effective.',
                  properties: {
                    category: {
                      description:
                        'Specifies what category of restart is required by this remediation to become effective.',
                      enum: [
                        'connected',
                        'dependencies',
                        'machine',
                        'none',
                        'parent',
                        'service',
                        'system',
                        'vulnerable_component',
                        'zone',
                      ],
                      title: 'Category of restart',
                      type: 'string',
                    },
                    details: {
                      description:
                        'Provides additional information for the restart. This can include details on procedures, scope or impact.',
                      minLength: 1,
                      title: 'Additional restart information',
                      type: 'string',
                    },
                  },
                  required: ['category'],
                  title: 'Restart required by remediation',
                  type: 'object',
                },
                url: {
                  description:
                    'Contains the URL where to obtain the remediation.',
                  format: 'uri',
                  title: 'URL to the remediation',
                  type: 'string',
                },
              },
              required: ['category', 'details'],
              title: 'Remediation',
              type: 'object',
            },
            minItems: 1,
            title: 'List of remediations',
            type: 'array',
          },
          scores: {
            description:
              'contains score objects for the current vulnerability.',
            items: {
              additionalProperties: false,
              description:
                'specifies information about (at least one) score of the vulnerability and for which products the given value applies.',
              minProperties: 2,
              properties: {
                cvss_v2: {
                  $ref: 'https://www.first.org/cvss/cvss-v2.0.json',
                },
                cvss_v3: {
                  oneOf: [
                    {
                      $ref: 'https://www.first.org/cvss/cvss-v3.0.json',
                    },
                    {
                      $ref: 'https://www.first.org/cvss/cvss-v3.1.json',
                    },
                  ],
                },
                products: {
                  $ref: '#/$defs/products_t',
                },
              },
              required: ['products'],
              title: 'Score',
              type: 'object',
            },
            minItems: 1,
            title: 'List of scores',
            type: 'array',
          },
          threats: {
            description:
              'Contains information about a vulnerability that can change with time.',
            items: {
              additionalProperties: false,
              description:
                'Contains the vulnerability kinetic information. This information can change as the vulnerability ages and new information becomes available.',
              properties: {
                category: {
                  description:
                    'Categorizes the threat according to the rules of the specification.',
                  enum: ['exploit_status', 'impact', 'target_set'],
                  title: 'Category of the threat',
                  type: 'string',
                },
                date: {
                  description:
                    'Contains the date when the assessment was done or the threat appeared.',
                  format: 'date-time',
                  title: 'Date of the threat',
                  type: 'string',
                },
                details: {
                  description:
                    'Represents a thorough human-readable discussion of the threat.',
                  minLength: 1,
                  title: 'Details of the threat',
                  type: 'string',
                },
                group_ids: {
                  $ref: '#/$defs/product_groups_t',
                },
                product_ids: {
                  $ref: '#/$defs/products_t',
                },
              },
              required: ['category', 'details'],
              title: 'Threat',
              type: 'object',
            },
            minItems: 1,
            title: 'List of threats',
            type: 'array',
          },
          title: {
            description:
              'Gives the document producer the ability to apply a canonical name or title to the vulnerability.',
            minLength: 1,
            title: 'Title',
            type: 'string',
          },
        },
        title: 'Vulnerability',
        type: 'object',
      },
      minItems: 1,
      title: 'Vulnerabilities',
      type: 'array',
    },
  },
  required: ['document'],
  title: 'Common Security Advisory Framework',
  type: 'object',
}
