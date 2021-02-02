import createCore from '../../lib/shared/Core'
import valid1 from '../../seeds/documents/valid-1.json'
import valid2 from '../../seeds/documents/valid-2.json'

const MINIMAL_DOC = {
  document: {
    csaf_version: '2.0',
    title: 'Minimal valid',
    publisher: {
      type: 'other',
    },
    type: 'Test Report',
    tracking: {
      current_release_date: '2021-01-14T00:00:00.000Z',
      id: '1',
      initial_release_date: '2021-01-14T00:00:00.000Z',
      revision_history: [
        {
          number: '1',
          date: '2021-01-14T00:00:00.000Z',
          summary: 'Summary',
        },
      ],
      status: 'draft',
      version: '1',
    },
  },
}

/**
 * @typedef {T extends Promise<infer R> ? R : unknown} Unpromisify
 * @template T
 */

export default function createCoreFixture() {
  /** @type {Unpromisify<ReturnType<typeof createCore>>} */
  let core

  return {
    async setup() {
      core = await createCore()
    },
    async teardown() {},

    get core() {
      return core
    },

    document: {},
    documents: [
      { valid: true, content: valid1, strippedVersion: valid1 },
      { valid: true, content: valid2, strippedVersion: valid2 },
      { valid: false, content: {}, strippedVersion: {} },
      {
        valid: false,
        content: {
          document: {
            csaf_version: '2.0',
            title: 'Minimal valid',
            publisher: {
              type: 'other',
            },
            type: 'Test Report',
            tracking: {
              current_release_date: '2021-01-14T00:00:00.000Z',
              id: '1',
              initial_release_date: '2021-01-14T00:00:00.000Z',
              revision_history: [
                {
                  date: '2021-01-14T00:00:00.000Z',
                  summary: 'Summary',
                },
              ],
              status: 'draft',
              version: '1',
            },
          },
        },
        strippedVersion: {},
      },
      {
        valid: true,
        content: {
          ...MINIMAL_DOC,
          emptyAdditionalStringProp: '',
        },
        strippedVersion: {
          ...MINIMAL_DOC,
        },
      },
      {
        valid: false,
        content: {
          document: {
            csaf_version: '2.0',
            title: 'Minimal valid',
            publisher: {
              type: 'other',
            },
            type: 'Test Report',
            tracking: {
              current_release_date: '2021-01-14T00:00:00.000Z',
              id: '1',
              initial_release_date: '2021-01-14T00:00:00.000Z',
              revision_history: [
                {
                  number: '1',
                  date: '2021-01-14T00:00:00.000Z',
                  summary: 'Summary',
                },
              ],
              status: 'draft',
              version: '1',
            },
            acknowledgments: [],
            vulnerabilities: null,
            someOtherProp: {},
          },
        },
        strippedVersion: {
          document: {
            csaf_version: '2.0',
            title: 'Minimal valid',
            publisher: {
              type: 'other',
            },
            type: 'Test Report',
            tracking: {
              current_release_date: '2021-01-14T00:00:00.000Z',
              id: '1',
              initial_release_date: '2021-01-14T00:00:00.000Z',
              revision_history: [
                {
                  number: '1',
                  date: '2021-01-14T00:00:00.000Z',
                  summary: 'Summary',
                },
              ],
              status: 'draft',
              version: '1',
            },
          },
        },
      },
      {
        valid: false,
        content: {
          aggregate_severity: {
            namespace:
              'https://access.redhat.com/security/updates/classification/',
            text: 'Moderate',
          },
        },
        strippedVersion: {},
      },
    ],
  }
}
