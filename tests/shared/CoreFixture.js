import valid1 from '../../seeds/documents/valid-1.json'
import valid2 from '../../seeds/documents/valid-2.json'

export default async function createCoreFixture() {
  return {
    params: {},

    document: {},
    documents: [
      { valid: true, content: valid1 },
      { valid: true, content: valid2 },
      { valid: false, content: {} },
      { valid: false, content: { document: {} } },
    ],
  }
}
