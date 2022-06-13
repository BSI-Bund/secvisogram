import minimalDoc from './shared/minimalDoc.js'

export default {
  ...minimalDoc,
  document: {
    ...minimalDoc.document,
    category: 'csaf_vex',
  },
  product_tree: {
    full_product_names: [
      {
        product_id: 'CSAFPID-0001',
        name: 'Some sample product',
      },
    ],
  },
  vulnerabilities: [
    {
      notes: [
        {
          category: 'description',
          text: 'This is a sample note',
        },
      ],
      product_status: {
        fixed: ['CSAFPID-0001'],
      },
      cve: 'CVE-0000-1111',
    },
  ],
}
