/**
 * @typedef {Object} Doc
 * @property {Array<{
    names: string[]
    organizations: string[]
    summary: string
    urls: string []
  }>} acknowledgments
 */

/**
 * @param {{}} params
 */
export default async function createCore({}) {
  return {
    document: {
      /**
       * This method loads the data for editing the document.
       *
       * @todo Replace dummy with actual implementation
       */
      async edit() {
        return {
          doc: {
            acknowledgments: [
              { names: [''], organizations: [''], summary: '', urls: [''] },
            ],
          },
        }
      },

      /**
       * @param {{}} doc
       */
      async save({}) {},
    },
  }
}
