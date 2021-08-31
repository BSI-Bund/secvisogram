import React from 'react'
import DefaultButton from '../../../shared/DefaultButton'
import EnumAttribute from '../../shared/EnumAttribute'
import NumberAttribute from '../../shared/NumberAttribute'
import ObjectContainer from '../../shared/ObjectContainer'
import TextAttribute from '../../shared/TextAttribute'
import CVSSVector from './CVSS3Editor/CVSSVector'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  instancePath: string
 *  onUpdate: (instancePath: string, update: {}) => void
 * }} props
 */
export default function CVSSV3Editor(props) {
  const cvssVector = new CVSSVector(/** @type {{}} */ (props.value) || {})
  const canBeUpgraded = cvssVector.canBeUpgraded

  return (
    <ObjectContainer
      {...props}
      label="JSON Schema for Common Vulnerability Scoring System version 3.1"
      description=""
      defaultValue={() => ({
        version: '3.1',
        vectorString: '',
        baseScore: 0,
        baseSeverity: '',
        attackVector: '',
        attackComplexity: '',
        privilegesRequired: '',
        userInteraction: '',
        scope: '',
        confidentialityImpact: '',
        integrityImpact: '',
        availabilityImpact: '',
      })}
    >
      {(objectProps) => {
        const cvssV3Props = (/** @type {string} */ key) => {
          return {
            ...objectProps(key),
            onChange(/** @type {string} */ v) {
              if (key === 'vectorString') return
              const updatedCVSSMetrics = cvssVector.set(key, v)
              props.onUpdate(props.instancePath, {
                $merge: { ...updatedCVSSMetrics.data },
              })
            },
            onDelete() {
              if (key === 'vectorString') return
              const updatedCVSSMetrics = cvssVector.remove(key)
              props.onUpdate(props.instancePath, {
                $merge: { ...updatedCVSSMetrics.data },
              })
            },
          }
        }
        return (
          <>
            <EnumAttribute
              {...cvssV3Props('version')}
              label="CVSS Version"
              description="CVSS Version"
              options={['3.1', '3.0']}
              defaultValue={() => '3.1'}
            />
            <div>
              <TextAttribute
                {...cvssV3Props('vectorString')}
                label="VectorString"
                description=""
                pattern="^CVSS:3.[01]/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$"
                onBlur={(e) => {
                  const updatedCVSSMetrics = cvssVector.updateFromVectorString(
                    e.target.value
                  )
                  const metrics = updatedCVSSMetrics
                  props.onUpdate(props.instancePath, {
                    $merge: { ...metrics.data },
                  })
                }}
              />
              <div className="mb-2">
                {canBeUpgraded ? (
                  <DefaultButton
                    onClick={() => {
                      props.onUpdate(props.instancePath, {
                        $merge: { ...cvssVector.updateVectorStringTo31().data },
                      })
                    }}
                  >
                    Upgrade to CVSS 3.1
                  </DefaultButton>
                ) : null}
              </div>
            </div>
            <EnumAttribute
              {...cvssV3Props('attackVector')}
              label="AttackVector"
              description=""
              options={['NETWORK', 'ADJACENT_NETWORK', 'LOCAL', 'PHYSICAL']}
            />
            <EnumAttribute
              {...cvssV3Props('attackComplexity')}
              label="AttackComplexity"
              description=""
              options={['HIGH', 'LOW']}
            />
            <EnumAttribute
              {...cvssV3Props('privilegesRequired')}
              label="PrivilegesRequired"
              description=""
              options={['HIGH', 'LOW', 'NONE']}
            />
            <EnumAttribute
              {...cvssV3Props('userInteraction')}
              label="UserInteraction"
              description=""
              options={['NONE', 'REQUIRED']}
            />
            <EnumAttribute
              {...cvssV3Props('scope')}
              label="Scope"
              description=""
              options={['UNCHANGED', 'CHANGED']}
            />
            <EnumAttribute
              {...cvssV3Props('confidentialityImpact')}
              label="ConfidentialityImpact"
              description=""
              options={['NONE', 'LOW', 'HIGH']}
            />
            <EnumAttribute
              {...cvssV3Props('integrityImpact')}
              label="IntegrityImpact"
              description=""
              options={['NONE', 'LOW', 'HIGH']}
            />
            <EnumAttribute
              {...cvssV3Props('availabilityImpact')}
              label="AvailabilityImpact"
              description=""
              options={['NONE', 'LOW', 'HIGH']}
            />
            <NumberAttribute
              {...cvssV3Props('baseScore')}
              label="BaseScore"
              description=""
              step="0.01"
              readOnly
            />
            <TextAttribute
              {...cvssV3Props('baseSeverity')}
              label="BaseSeverity"
              description=""
              readOnly
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
              options={['UNKNOWN', 'REASONABLE', 'CONFIRMED', 'NOT_DEFINED']}
              deletable
            />
            <NumberAttribute
              {...cvssV3Props('temporalScore')}
              label="TemporalScore"
              description=""
              step="0.01"
              deletable
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
              deletable
            />
            <EnumAttribute
              {...cvssV3Props('environmentalSeverity')}
              label="EnvironmentalSeverity"
              description=""
              options={['NONE', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL']}
              deletable
            />
          </>
        )
      }}
    </ObjectContainer>
  )
}
