import minimalDoc from './shared/minimalDoc.js'

export default {
  ...minimalDoc,
  document: {
    ...minimalDoc.document,
    category: 'csaf_security_advisory',
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
        },
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
    },
  ],
}
