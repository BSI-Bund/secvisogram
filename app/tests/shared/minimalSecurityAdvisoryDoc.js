import minimalDoc from './shared/minimalDoc'

export default {
  ...minimalDoc,
  document: {
    ...minimalDoc.document,
    category: 'security_advisory',
  },
  product_tree: {
    full_product_names: [
      {
        product_id: 'CSAFPID-0001',
        name: 'Some sample product',
      },
    ],
  },
}
