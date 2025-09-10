export default {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://docs.oasis-open.org/csaf/csaf/v2.1/schema/meta.json',
  $dynamicAnchor: 'meta',
  $vocabulary: {
    'https://json-schema.org/draft/2020-12/vocab/core': true,
    'https://json-schema.org/draft/2020-12/vocab/format-assertion': true,
  },
  allOf: [
    { $ref: 'https://json-schema.org/draft/2020-12/meta/core' },
    { $ref: 'https://json-schema.org/draft/2020-12/meta/format-assertion' },
  ],
}
