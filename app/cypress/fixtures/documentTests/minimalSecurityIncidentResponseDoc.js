import minimalDoc from './shared/minimalDoc.js'

export default {
  ...minimalDoc,
  document: {
    ...minimalDoc.document,
    category: 'csaf_security_incident_response',
    notes: [
      {
        category: 'description',
        text: 'Some mandatory description',
        title: 'Some description',
      },
    ],
    references: [
      {
        category: 'external',
        summary: 'The canonical URL.',
        url: 'https://example.com/security/data/csaf/2021/OASIS_CSAF_TC-CSAF_2_0-2021-6-1-27-02-01.json',
      },
    ],
  },
}
