import React from 'react'
import Collapsible from './shared/Collapsible.js'
import TextAttribute from './TextAttribute.js'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import DefaultButton from '../../../../shared/DefaultButton.js'
import CVSSVector from './CVSS3Attribute/CVSSVector.js'
import { cvssDropdown, getSeverityColors } from './shared/cvssUtils.js'
import { t } from 'i18next'

/**
 * @param {{
 *  instancePath: string[]
 *  value: {[key: string]: string | number }
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
export default function CVSSV3Attribute({
  instancePath,
  value,
  property,
  disabled,
}) {
  const { doc, updateDoc, ...outerDocumentEditor } = React.useContext(
    DocumentEditorContext
  )

  const cvssVector = React.useMemo(
    () => new CVSSVector(/** @type {{}} */ (value) || {}),
    [value]
  )
  const canBeUpgraded = cvssVector.canBeUpgraded

  /** @type {React.ContextType<typeof DocumentEditorContext>} */
  const documentEditor = React.useMemo(
    () => ({
      ...outerDocumentEditor,
      doc,
      updateDoc(updatedInstancePath, updatedValue) {
        const field = updatedInstancePath.at(-1)

        const updatedVector =
          field === 'vectorString' && typeof updatedValue === 'string'
            ? cvssVector.updateFromVectorString(updatedValue).data
            : field
            ? cvssVector.set(field, /** @type string */ (updatedValue)).data
            : {}

        updateDoc(instancePath, updatedVector)
      },
    }),
    [outerDocumentEditor, updateDoc, instancePath, doc, cvssVector]
  )

  /** @type {(childName: string, options: string[], disableClearable: boolean) => any} */
  function dropdownFor(childName, options, disableClearable = false) {
    const childValue = /** @type {string} */ ((value || {})[childName]) || ''
    return cvssDropdown(
      instancePath,
      childName,
      childValue,
      options,
      property,
      disabled,
      disableClearable
    )
  }

  return (
    <DocumentEditorContext.Provider value={documentEditor}>
      <div className="flex flex-col gap-4 p-4 overflow-auto shrink-0 min-w-[340px]">
        {dropdownFor('version', ['3.0', '3.1'], true)}
        <TextAttribute
          label="VectorString"
          description=""
          pattern="^CVSS:3.[01]/((AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[NLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$"
          minLength={1}
          instancePath={instancePath.concat(['vectorString'])}
          value={value?.vectorString || ''}
          property={property}
          disabled={disabled}
          required={true}
        />
        {canBeUpgraded ? (
          <div className="mb-2">
            <DefaultButton
              onClick={() => {
                const updatedCVSSMetrics = cvssVector.set('version', '3.1')
                updateDoc(instancePath, updatedCVSSMetrics.data)
              }}
            >
              Upgrade to CVSS 3.1
            </DefaultButton>
          </div>
        ) : null}

        <div
          className={`p-2 rounded border ${getSeverityColors(
            /** @type {number} */ (value?.baseScore)
          )}`}
        >
          <Attribute
            label={'BaseScore'}
            description={'The CVSS Base Score'}
            instancePath={instancePath.concat(['baseScore'])}
            property={property}
            disabled={false}
          >
            {typeof value?.baseScore === 'number'
              ? String(value.baseScore)
              : ''}
          </Attribute>
        </div>
        <div
          className={`p-2 rounded border ${getSeverityColors(
            /** @type {number} */ (value?.baseScore)
          )}`}
        >
          <Attribute
            label={'BaseSeverity'}
            description={'The CVSS Base Severity'}
            instancePath={instancePath.concat(['baseSeverity'])}
            property={property}
            disabled={false}
          >
            {value?.baseSeverity || ''}
          </Attribute>
        </div>
        <Collapsible startCollapsed={true} title={t('cvssEditor.baseInputs')}>
          {dropdownFor('attackVector', [
            'NETWORK',
            'ADJACENT_NETWORK',
            'LOCAL',
            'PHYSICAL',
          ])}
          {dropdownFor('attackComplexity', ['HIGH', 'LOW'])}
          {dropdownFor('privilegesRequired', ['NONE', 'HIGH', 'LOW'])}
          {dropdownFor('userInteraction', ['NONE', 'REQUIRED'])}
          {dropdownFor('scope', ['UNCHANGED', 'CHANGED'])}
          {dropdownFor('confidentialityImpact', ['NONE', 'HIGH', 'LOW'])}
          {dropdownFor('integrityImpact', ['NONE', 'HIGH', 'LOW'])}
          {dropdownFor('availabilityImpact', ['NONE', 'HIGH', 'LOW'])}
        </Collapsible>

        <div
          className={`p-2 rounded border ${getSeverityColors(
            /** @type {number} */ (value?.temporalScore)
          )}`}
        >
          <Attribute
            label={'TemporalScore'}
            description={'The CVSS Temporal Score'}
            instancePath={instancePath.concat(['temporalScore'])}
            property={property}
            disabled={false}
          >
            {typeof value?.temporalScore === 'number'
              ? String(value.temporalScore)
              : ''}
          </Attribute>
        </div>
        <div
          className={`p-2 rounded border ${getSeverityColors(
            /** @type {number} */ (value?.temporalScore)
          )}`}
        >
          <Attribute
            label={'TemporalSeverity'}
            description={'The CVSS Temporal Severity'}
            instancePath={instancePath.concat(['temporalSeverity'])}
            property={property}
            disabled={false}
          >
            {value?.temporalSeverity || ''}
          </Attribute>
        </div>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.temporalInputs')}
        >
          {dropdownFor(
            'exploitCodeMaturity',
            [
              'UNPROVEN',
              'PROOF_OF_CONCEPT',
              'FUNCTIONAL',
              'HIGH',
              'NOT_DEFINED',
            ],
            false
          )}
          {dropdownFor(
            'remediationLevel',
            [
              'OFFICIAL_FIX',
              'TEMPORARY_FIX',
              'WORKAROUND',
              'UNAVAILABLE',
              'NOT_DEFINED',
            ],
            false
          )}
          {dropdownFor(
            'reportConfidence',
            ['UNKNOWN', 'REASONABLE', 'CONFIRMED', 'NOT_DEFINED'],
            false
          )}
        </Collapsible>

        <div
          className={`p-2 rounded border ${getSeverityColors(
            /** @type {number} */ (value?.environmentalScore)
          )}`}
        >
          <Attribute
            label={'EnvironmentalScore'}
            description={'The CVSS Environmental Score'}
            instancePath={instancePath.concat(['environmentalScore'])}
            property={property}
            disabled={false}
          >
            {typeof value?.environmentalScore === 'number'
              ? String(value.environmentalScore)
              : ''}
          </Attribute>
        </div>
        <div
          className={`p-2 rounded border ${getSeverityColors(
            /** @type {number} */ (value?.environmentalScore)
          )}`}
        >
          <Attribute
            label={'EnvironmentalSeverity'}
            description={'The CVSS Environmental Severity'}
            instancePath={instancePath.concat(['environmentalSeverity'])}
            property={property}
            disabled={false}
          >
            {value?.environmentalSeverity || ''}
          </Attribute>
        </div>
        <Collapsible
          startCollapsed={true}
          title={t('cvssEditor.environmentalInputs')}
        >
          {dropdownFor(
            'confidentialityRequirement',
            ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'integrityRequirement',
            ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'availabilityRequirement',
            ['LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedAttackVector',
            ['NETWORK', 'ADJACENT_NETWORK', 'LOCAL', 'PHYSICAL', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedAttackComplexity',
            ['HIGH', 'LOW', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedPrivilegesRequired',
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedUserInteraction',
            ['NONE', 'REQUIRED', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedScope',
            ['UNCHANGED', 'CHANGED', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedConfidentialityImpact',
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedIntegrityImpact',
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'modifiedAvailabilityImpact',
            ['NONE', 'LOW', 'HIGH', 'NOT_DEFINED'],
            false
          )}
        </Collapsible>
      </div>
    </DocumentEditorContext.Provider>
  )
}
