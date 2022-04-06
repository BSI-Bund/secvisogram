declare type CVSSObject = {
  success: boolean

  baseMetricScore: string
  baseSeverity: string

  temporalMetricScore: string
  temporalSeverity: string

  environmentalMetricScore: string
  environmentalSeverity: string

  vectorString: string
}

export interface CVSS31 {
  calculateCVSSFromMetrics(
    AttackVector: string,
    AttackComplexity: string,
    PrivilegesRequired: string,
    UserInteraction: string,
    Scope: string,
    Confidentiality: string,
    Integrity: string,
    Availability: any,
    ExploitCodeMaturity: string,
    RemediationLevel: string,
    ReportConfidence: any,
    ConfidentialityRequirement: string,
    IntegrityRequirement: string,
    AvailabilityRequirement: any,
    ModifiedAttackVector: string,
    ModifiedAttackComplexity: string,
    ModifiedPrivilegesRequire: string,
    ModifiedUserInteraction: string,
    ModifiedScope: any,
    ModifiedConfidentiality: string,
    ModifiedIntegrity: string,
    ModifiedAvailability: string
  ): CVSSObject

  calculateCVSSFromVector(vectorString: string): CVSSObject
}

export interface CVSS30 {
  calculateCVSSFromMetrics(
    AttackVector: string,
    AttackComplexity: string,
    PrivilegesRequired: string,
    UserInteraction: string,
    Scope: string,
    Confidentiality: string,
    Integrity: string,
    Availability: any,
    ExploitCodeMaturity: string,
    RemediationLevel: string,
    ReportConfidence: any,
    ConfidentialityRequirement: string,
    IntegrityRequirement: string,
    AvailabilityRequirement: any,
    ModifiedAttackVector: string,
    ModifiedAttackComplexity: string,
    ModifiedPrivilegesRequire: string,
    ModifiedUserInteraction: string,
    ModifiedScope: any,
    ModifiedConfidentiality: string,
    ModifiedIntegrity: string,
    ModifiedAvailability: string
  ): CVSSObject

  calculateCVSSFromVector(vectorString: string): CVSSObject
}
