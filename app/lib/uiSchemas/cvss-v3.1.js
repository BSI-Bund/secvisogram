export default {
  license: [
    'Copyright (c) 2019, FIRST.ORG, INC.',
    'All rights reserved.',
    '',
    'Redistribution and use in source and binary forms, with or without modification, are permitted provided that the ',
    'following conditions are met:',
    '1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following ',
    '   disclaimer.',
    '2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the ',
    '   following disclaimer in the documentation and/or other materials provided with the distribution.',
    '3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote ',
    '   products derived from this software without specific prior written permission.',
    '',
    "THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, ",
    'INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE ',
    'DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, ',
    'SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR ',
    'SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, ',
    'WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE ',
    'OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.',
  ],

  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'JSON Schema for Common Vulnerability Scoring System version 3.1',
  $id: 'https://www.first.org/cvss/cvss-v3.1.json?20190610',
  type: 'object',
  $defs: {
    attackVectorType: {
      type: 'string',
      enum: ['NETWORK', 'ADJACENT_NETWORK', 'LOCAL', 'PHYSICAL'],
    },
    modifiedAttackVectorType: {
      type: 'string',
      enum: ['NETWORK', 'ADJACENT_NETWORK', 'LOCAL', 'PHYSICAL', 'NOT_DEFINED'],
    },
    attackComplexityType: {
      type: 'string',
      enum: ['HIGH', 'LOW'],
    },
    modifiedAttackComplexityType: {
      type: 'string',
      enum: ['HIGH', 'LOW', 'NOT_DEFINED'],
    },
    privilegesRequiredType: {
      type: 'string',
      enum: ['HIGH', 'LOW', 'NONE'],
    },
    modifiedPrivilegesRequiredType: {
      type: 'string',
      enum: ['HIGH', 'LOW', 'NONE', 'NOT_DEFINED'],
    },
    userInteractionType: {
      type: 'string',
      enum: ['NONE', 'REQUIRED'],
    },
    modifiedUserInteractionType: {
      type: 'string',
      enum: ['NONE', 'REQUIRED', 'NOT_DEFINED'],
    },
    scopeType: {
      type: 'string',
      enum: ['UNCHANGED', 'CHANGED'],
    },
    modifiedScopeType: {
      type: 'string',
      enum: ['UNCHANGED', 'CHANGED', 'NOT_DEFINED'],
    },
    ciaType: {
      type: 'string',
      enum: ['NONE', 'LOW', 'HIGH'],
    },
    modifiedCiaType: {
      type: 'string',
      enum: ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
    },
    exploitCodeMaturityType: {
      type: 'string',
      enum: [
        'UNPROVEN',
        'PROOF_OF_CONCEPT',
        'FUNCTIONAL',
        'HIGH',
        'NOT_DEFINED',
      ],
    },
    remediationLevelType: {
      type: 'string',
      enum: [
        'OFFICIAL_FIX',
        'TEMPORARY_FIX',
        'WORKAROUND',
        'UNAVAILABLE',
        'NOT_DEFINED',
      ],
    },
    confidenceType: {
      type: 'string',
      enum: ['UNKNOWN', 'REASONABLE', 'CONFIRMED', 'NOT_DEFINED'],
    },
    ciaRequirementType: {
      type: 'string',
      enum: ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
    },
    scoreType: {
      type: 'number',
      minimum: 0,
      maximum: 10,
    },
    severityType: {
      type: 'string',
      enum: ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    },
  },
  properties: {
    version: {
      description: 'CVSS Version',
      type: 'string',
      enum: ['3.1'],
    },
    vectorString: {
      type: 'string',
      pattern:
        '^CVSS:3.1/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$',
    },
    attackVector: { $ref: '#/$defs/attackVectorType' },
    attackComplexity: { $ref: '#/$defs/attackComplexityType' },
    privilegesRequired: { $ref: '#/$defs/privilegesRequiredType' },
    userInteraction: { $ref: '#/$defs/userInteractionType' },
    scope: { $ref: '#/$defs/scopeType' },
    confidentialityImpact: { $ref: '#/$defs/ciaType' },
    integrityImpact: { $ref: '#/$defs/ciaType' },
    availabilityImpact: { $ref: '#/$defs/ciaType' },
    baseScore: { $ref: '#/$defs/scoreType' },
    baseSeverity: { $ref: '#/$defs/severityType' },
    exploitCodeMaturity: { $ref: '#/$defs/exploitCodeMaturityType' },
    remediationLevel: { $ref: '#/$defs/remediationLevelType' },
    reportConfidence: { $ref: '#/$defs/confidenceType' },
    temporalScore: { $ref: '#/$defs/scoreType' },
    temporalSeverity: { $ref: '#/$defs/severityType' },
    confidentialityRequirement: {
      $ref: '#/$defs/ciaRequirementType',
    },
    integrityRequirement: { $ref: '#/$defs/ciaRequirementType' },
    availabilityRequirement: { $ref: '#/$defs/ciaRequirementType' },
    modifiedAttackVector: {
      $ref: '#/$defs/modifiedAttackVectorType',
    },
    modifiedAttackComplexity: {
      $ref: '#/$defs/modifiedAttackComplexityType',
    },
    modifiedPrivilegesRequired: {
      $ref: '#/$defs/modifiedPrivilegesRequiredType',
    },
    modifiedUserInteraction: {
      $ref: '#/$defs/modifiedUserInteractionType',
    },
    modifiedScope: { $ref: '#/$defs/modifiedScopeType' },
    modifiedConfidentialityImpact: {
      $ref: '#/$defs/modifiedCiaType',
    },
    modifiedIntegrityImpact: { $ref: '#/$defs/modifiedCiaType' },
    modifiedAvailabilityImpact: { $ref: '#/$defs/modifiedCiaType' },
    environmentalScore: { $ref: '#/$defs/scoreType' },
    environmentalSeverity: { $ref: '#/$defs/severityType' },
  },
  required: ['version', 'vectorString', 'baseScore', 'baseSeverity'],
}
