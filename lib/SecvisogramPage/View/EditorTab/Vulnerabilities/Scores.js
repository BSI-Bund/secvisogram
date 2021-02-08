import React from 'react'
import ArrayContainer from '../shared/ArrayContainer'
import Products from '../shared/Definitions/Products'
import EnumAttribute from '../shared/EnumAttribute'
import NumberAttribute from '../shared/NumberAttribute'
import ObjectContainer from '../shared/ObjectContainer'
import TextAttribute from '../shared/TextAttribute'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Scores(props) {
  return (
    <ArrayContainer
      {...props}
      label="List of scores"
      description="contains score objects for the currrent vulnerability."
      defaultItemValue={() => ({
        products: [],
      })}
    >
      {(scoreItemProps) => (
        <ObjectContainer
          {...scoreItemProps}
          label="Score"
          description="specifies information about (at least one) score of the vulnerability and for which products the given value applies."
        >
          {(scoreProps) => (
            <>
              <Products {...scoreProps('products')} />
              {/** @todo cvss_v2 missing */}
              <ObjectContainer
                {...scoreProps('cvss_v3')}
                label="JSON Schema for Common Vulnerability Scoring System version 3.1"
                description=""
                defaultValue={() => ({
                  version: '3.1',
                  vectorString: '',
                  baseScore: 0,
                  baseSeverity: 'NONE',
                })}
              >
                {(cvssV3Props) => (
                  <>
                    <EnumAttribute
                      {...cvssV3Props('version')}
                      label="CVSS Version"
                      description="CVSS Version"
                      options={['3.1']}
                      defaultValue={() => '3.1'}
                    />
                    <TextAttribute
                      {...cvssV3Props('vectorString')}
                      label="VectorString"
                      description=""
                      pattern="^CVSS:3.1/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$"
                    />
                    <EnumAttribute
                      {...cvssV3Props('attackVector')}
                      label="AttackVector"
                      description=""
                      options={[
                        'NETWORK',
                        'ADJACENT_NETWORK',
                        'LOCAL',
                        'PHYSICAL',
                      ]}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('attackComplexity')}
                      label="AttackComplexity"
                      description=""
                      options={['HIGH', 'LOW']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('privilegesRequired')}
                      label="PrivilegesRequired"
                      description=""
                      options={['HIGH', 'LOW', 'NONE']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('userInteraction')}
                      label="UserInteraction"
                      description=""
                      options={['NONE', 'REQUIRED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('scope')}
                      label="Scope"
                      description=""
                      options={['UNCHANGED', 'CHANGED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('confidentialityImpact')}
                      label="ConfidentialityImpact"
                      description=""
                      options={['NONE', 'LOW', 'HIGH']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('integrityImpact')}
                      label="IntegrityImpact"
                      description=""
                      options={['NONE', 'LOW', 'HIGH']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('availabilityImpact')}
                      label="AvailabilityImpact"
                      description=""
                      options={['NONE', 'LOW', 'HIGH']}
                      deletable
                    />
                    <NumberAttribute
                      {...cvssV3Props('baseScore')}
                      label="BaseScore"
                      description=""
                      step="0.01"
                    />
                    <EnumAttribute
                      {...cvssV3Props('baseSeverity')}
                      label="BaseSeverity"
                      description=""
                      options={['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']}
                    />
                    <EnumAttribute
                      {...cvssV3Props('exploitCodeMaturity')}
                      label="ExploitCodeMaturity"
                      description=""
                      options={[
                        'UNPROVEN',
                        'PROOF_OF_CONCEPT',
                        'FUNCTIONAL',
                        'HIGH',
                        'NOT_DEFINED',
                      ]}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('remediationLevel')}
                      label="RemediationLevel"
                      description=""
                      options={[
                        'OFFICIAL_FIX',
                        'TEMPORARY_FIX',
                        'WORKAROUND',
                        'UNAVAILABLE',
                        'NOT_DEFINED',
                      ]}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('reportConfidence')}
                      label="ReportConfidence"
                      description=""
                      options={[
                        'UNKNOWN',
                        'REASONABLE',
                        'CONFIRMED',
                        'NOT_DEFINED',
                      ]}
                      deletable
                    />
                    <NumberAttribute
                      {...cvssV3Props('temporalScore')}
                      label="TemporalScore"
                      description=""
                      step="0.01"
                    />
                    <EnumAttribute
                      {...cvssV3Props('temporalSeverity')}
                      label="TemporalSeverity"
                      description=""
                      options={['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('confidentialityRequirement')}
                      label="ConfidentialityRequirement"
                      description=""
                      options={['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('integrityRequirement')}
                      label="IntegrityRequirement"
                      description=""
                      options={['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('availabilityRequirement')}
                      label="AvailabilityRequirement"
                      description=""
                      options={['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('modifiedAttackVector')}
                      label="ModifiedAttackVector"
                      description=""
                      options={[
                        'NETWORK',
                        'ADJACENT_NETWORK',
                        'LOCAL',
                        'PHYSICAL',
                        'NOT_DEFINED',
                      ]}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('modifiedAttackComplexity')}
                      label="ModifiedAttackComplexity"
                      description=""
                      options={['HIGH', 'LOW', 'NOT_DEFINED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('modifiedPrivilegesRequired')}
                      label="ModifiedPrivilegesRequired"
                      description=""
                      options={['HIGH', 'LOW', 'NONE', 'NOT_DEFINED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('modifiedUserInteraction')}
                      label="ModifiedUserInteraction"
                      description=""
                      options={['NONE', 'REQUIRED', 'NOT_DEFINED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('modifiedScope')}
                      label="ModifiedScope"
                      description=""
                      options={['UNCHANGED', 'CHANGED', 'NOT_DEFINED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('modifiedConfidentialityImpact')}
                      label="ModifiedConfidentialityImpact"
                      description=""
                      options={['NONE', 'LOW', 'HIGH', 'NOT_DEFINED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('modifiedIntegrityImpact')}
                      label="ModifiedIntegrityImpact"
                      description=""
                      options={['NONE', 'LOW', 'HIGH', 'NOT_DEFINED']}
                      deletable
                    />
                    <EnumAttribute
                      {...cvssV3Props('modifiedAvailabilityImpact')}
                      label="ModifiedAvailabilityImpact"
                      description=""
                      options={['NONE', 'LOW', 'HIGH', 'NOT_DEFINED']}
                      deletable
                    />
                    <NumberAttribute
                      {...cvssV3Props('environmentalScore')}
                      label="EnvironmentalScore"
                      description=""
                      step="0.01"
                    />
                    <EnumAttribute
                      {...cvssV3Props('environmentalSeverity')}
                      label="EnvironmentalSeverity"
                      description=""
                      options={['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']}
                      deletable
                    />
                  </>
                )}
              </ObjectContainer>
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
