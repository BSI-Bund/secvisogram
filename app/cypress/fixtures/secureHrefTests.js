import minimalDoc from './documentTests/shared/minimalDoc.js'

export default [
  // Valid tests
  {
    title: '# href (valid)',
    valid: true,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['#test.org'] }],
      },
    },
  },
  {
    title: 'http href (valid)',
    valid: true,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['http://test.org'] }],
      },
    },
  },
  {
    title: 'https href (valid)',
    valid: true,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['https://test.org'] }],
      },
    },
  },
  {
    title: 'mailto href (valid)',
    valid: true,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['mailto://user@test.org'] }],
      },
    },
  },
  {
    title: 'tel href (valid)',
    valid: true,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['tel://+4934587913248test.org'] }],
      },
    },
  },
  {
    title: 'ftp href (valid)',
    valid: true,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['ftp://test.org'] }],
      },
    },
  },
  {
    title: 'data href (MIME-type png) (valid)',
    valid: true,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['data:image/png;base64,iVBORwtest.org0KGgoAAAANSUhEUgAAA'] }],
      },
    },
  },
  {
    title: 'data href (MIME-type jpeg) (valid)',
    valid: true,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['data:image/jpeg;base64,iVBORw0KGgoAtest.orgAAANSUhEUgAAA'] }],
      },
    },
  },

  // invalid tests
  {
    title: 'sftp href (invalid)',
    valid: false,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['sftp://test.org'] }],
      },
    },
  },
  {
    title: 'ws href (invalid)',
    valid: false,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['ws://test.org'] }],
      },
    },
  },
  {
    title: 'wss href (invalid)',
    valid: false,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['wss://test.org'] }],
      },
    },
  },
  {
    title: 'data href (MIME-type gif) (invalid)',
    valid: false,
    content: {
      document: {
        ...minimalDoc.document,
        acknowledgments: [{ urls: ['data:image/gif;base64,iVBORw0Ktest.orgGgoAAAANSUhEUgAAA'] }],
      },
    },
  },
]