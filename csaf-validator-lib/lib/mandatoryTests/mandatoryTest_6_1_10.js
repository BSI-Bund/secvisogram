/** @type {Array<[string, string, { [key: string]: string }]>} */
const cvssV3VectorStringMapping = [
  // BASE SCORE
  [
    'attackVector',
    'AV',
    {
      NETWORK: 'N',
      ADJACENT_NETWORK: 'A',
      LOCAL: 'L',
      PHYSICAL: 'P',
    },
  ],
  [
    'attackComplexity',
    'AC',
    {
      HIGH: 'H',
      LOW: 'L',
    },
  ],
  [
    'privilegesRequired',
    'PR',
    {
      NONE: 'N',
      LOW: 'L',
      HIGH: 'H',
    },
  ],
  [
    'userInteraction',
    'UI',
    {
      NONE: 'N',
      REQUIRED: 'R',
    },
  ],
  [
    'scope',
    'S',
    {
      UNCHANGED: 'U',
      CHANGED: 'C',
    },
  ],
  [
    'confidentialityImpact',
    'C',
    {
      NONE: 'N',
      LOW: 'L',
      HIGH: 'H',
    },
  ],
  [
    'integrityImpact',
    'I',
    {
      NONE: 'N',
      LOW: 'L',
      HIGH: 'H',
    },
  ],
  [
    'availabilityImpact',
    'A',
    {
      NONE: 'N',
      LOW: 'L',
      HIGH: 'H',
    },
  ],

  // TEMPORAL SCORE
  [
    'exploitCodeMaturity',
    'E',
    {
      UNPROVEN: 'U',
      PROOF_OF_CONCEPT: 'P',
      FUNCTIONAL: 'F',
      HIGH: 'H',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'remediationLevel',
    'RL',
    {
      OFFICIAL_FIX: 'O',
      TEMPORARY_FIX: 'T',
      WORKAROUND: 'W',
      UNAVAILABLE: 'U',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'reportConfidence',
    'RC',
    {
      UNKNOWN: 'U',
      REASONABLE: 'R',
      CONFIRMED: 'C',
      NOT_DEFINED: 'X',
    },
  ],

  // ENVIRONMENTAL SCORE
  [
    'confidentialityRequirement',
    'CR',
    {
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'integrityRequirement',
    'IR',
    {
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'availabilityRequirement',
    'AR',
    {
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedAttackVector',
    'MAV',
    {
      NETWORK: 'N',
      ADJACENT_NETWORK: 'A',
      LOCAL: 'L',
      PHYSICAL: 'P',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedAttackComplexity',
    'MAC',
    {
      HIGH: 'H',
      LOW: 'L',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedPrivilegesRequired',
    'MPR',
    {
      HIGH: 'H',
      LOW: 'L',
      NONE: 'N',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedUserInteraction',
    'MUI',
    {
      NONE: 'N',
      REQUIRED: 'R',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedScope',
    'MS',
    {
      UNCHANGED: 'U',
      CHANGED: 'C',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedConfidentialityImpact',
    'MC',
    {
      HIGH: 'H',
      LOW: 'L',
      NONE: 'N',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedIntegrityImpact',
    'MI',
    {
      HIGH: 'H',
      LOW: 'L',
      NONE: 'N',
      NOT_DEFINED: 'X',
    },
  ],
  [
    'modifiedAvailabilityImpact',
    'MA',
    {
      HIGH: 'H',
      LOW: 'L',
      NONE: 'N',
      NOT_DEFINED: 'X',
    },
  ],
]

/** @type {Array<[string, string, { [key: string]: string }]>} */
const cvssV2VectorStringMapping = [
  // BASE SCORE
  [
    'accessVector',
    'AV',
    {
      NETWORK: 'N',
      ADJACENT_NETWORK: 'A',
      LOCAL: 'L',
    },
  ],
  [
    'accessComplexity',
    'AC',
    {
      HIGH: 'H',
      MEDIUM: 'H',
      LOW: 'L',
    },
  ],
  [
    'authentication',
    'Au',
    {
      NONE: 'N',
      SINGLE: 'S',
      MULTIPLE: 'M',
    },
  ],
  [
    'confidentialityImpact',
    'C',
    {
      NONE: 'N',
      PARTIAL: 'P',
      COMPLETE: 'C',
    },
  ],
  [
    'integrityImpact',
    'I',
    {
      NONE: 'N',
      PARTIAL: 'P',
      COMPLETE: 'C',
    },
  ],
  [
    'availabilityImpact',
    'A',
    {
      NONE: 'N',
      PARTIAL: 'P',
      COMPLETE: 'C',
    },
  ],
  // TEMPORAL SCORE

  [
    'exploitability',
    'E',
    {
      UNPROVEN: 'U',
      PROOF_OF_CONCEPT: 'POC',
      FUNCTIONAL: 'F',
      HIGH: 'H',
      NOT_DEFINED: 'ND',
    },
  ],
  [
    'remediationLevel',
    'RL',
    {
      OFFICIAL_FIX: 'OF',
      TEMPORARY_FIX: 'TF',
      WORKAROUND: 'W',
      UNAVAILABLE: 'U',
      NOT_DEFINED: 'ND',
    },
  ],
  [
    'reportConfidence',
    'RC',
    {
      UNCONFIRMED: 'UC',
      UNCORROBORATED: 'UR',
      CONFIRMED: 'C',
      NOT_DEFINED: 'ND',
    },
  ],

  // ENVIRONMENTAL SCORE
  [
    'collateralDamagePotential',
    'CDP',
    {
      NONE: 'N',
      LOW: 'L',
      LOW_MEDIUM: 'LM',
      MEDIUM_HIGH: 'MH',
      HIGH: 'H',
      NOT_DEFINED: 'ND',
    },
  ],
  [
    'targetDistribution',
    'TD',
    {
      NONE: 'N',
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'ND',
    },
  ],
  [
    'confidentialityRequirement',
    'CR',
    {
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'ND',
    },
  ],
  [
    'integrityRequirement',
    'IR',
    {
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'ND',
    },
  ],
  [
    'availabilityRequirement',
    'AR',
    {
      LOW: 'L',
      MEDIUM: 'M',
      HIGH: 'H',
      NOT_DEFINED: 'ND',
    },
  ],
]

/**
 * @param {any} doc
 */
export default function mandatoryTest_6_1_10(doc) {
  /** @type {Array<{ message: string; instancePath: string }>} */
  const errors = []
  let isValid = true

  if (Array.isArray(doc.vulnerabilities)) {
    /** @type {Array<any>} */
    const vulnerabilities = doc.vulnerabilities
    vulnerabilities.forEach((vulnerability, vulnerabilityIndex) => {
      if (!Array.isArray(vulnerability.scores)) return
      /** @type {Array<any>} */
      const scores = vulnerability.scores
      scores.forEach((score, scoreIndex) => {
        if (typeof score.cvss_v2?.vectorString === 'string') {
          /** @type {Record<string, unknown>} */
          const cvssV2 = score.cvss_v2
          const vectorString = /** @type {string} */ (cvssV2.vectorString)

          validateCVSSAttributes({
            vectorValues: vectorString.split('/'),
            vectorMapping: cvssV2VectorStringMapping,
            cvss: cvssV2,
            onError({ attributeKey }) {
              isValid = false
              errors.push({
                instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/cvss_v2/${attributeKey}`,
                message: 'value is not consistent with the vector string',
              })
            },
          })
        }

        if (
          typeof score.cvss_v3?.vectorString === 'string' &&
          (score.cvss_v3.version === '3.1' || score.cvss_v3.version === '3.0')
        ) {
          /** @type {Record<string, unknown>} */
          const cvssV3 = score.cvss_v3
          const vectorString = /** @type {string} */ (cvssV3.vectorString)

          validateCVSSAttributes({
            vectorValues: vectorString.split('/').slice(1),
            vectorMapping: cvssV3VectorStringMapping,
            cvss: cvssV3,
            onError({ attributeKey }) {
              isValid = false
              errors.push({
                instancePath: `/vulnerabilities/${vulnerabilityIndex}/scores/${scoreIndex}/cvss_v3/${attributeKey}`,
                message: 'value is not consistent with the vector string',
              })
            },
          })
        }
      })
    })
  }

  return { errors, isValid }
}

/**
 * @param {object} params
 * @param {string[]} params.vectorValues
 * @param {Array<[string, string, { [key: string]: string }]>} params.vectorMapping
 * @param {Record<string, unknown>} params.cvss
 * @param {(params: { attributeKey: string }) => void} params.onError
 */
function validateCVSSAttributes({
  vectorValues,
  vectorMapping,
  cvss,
  onError,
}) {
  vectorValues.forEach((str) => {
    const [key, value] = str.split(':')
    const entry = vectorMapping.find((e) => e[1] === key)
    if (!entry) return
    const [attributeKey] = entry

    const attributeValue = cvss[attributeKey]
    if (typeof attributeValue !== 'string') return

    const expectedAttributeValue = Object.entries(entry[2]).find(
      (e) => e[1] === value
    )?.[0]
    if (typeof expectedAttributeValue !== 'string') return

    if (attributeValue !== expectedAttributeValue) {
      onError({ attributeKey })
    }
  })
}
