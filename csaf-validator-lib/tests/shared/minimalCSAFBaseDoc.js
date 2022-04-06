import sortObjectKeys from '../../lib/shared/sortObjectKeys.js'
import minimalDoc from './shared/minimalDoc.js'

export default /** @type {typeof minimalDoc} */ (
  sortObjectKeys(new Intl.Collator(), {
    ...minimalDoc,
    document: {
      ...minimalDoc.document,
      category: 'generic_csaf',
    },
  })
)
