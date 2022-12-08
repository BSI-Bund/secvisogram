import React from 'react'
import DropdownAttribute from './DropdownAttribute.js'
import TextAttribute from './TextAttribute.js'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import DefaultButton from '../../../../shared/DefaultButton.js'
import CVSSVector from './CVSS3Attribute/CVSSVector.js'

/**
 * @param {{
 *  label: string
 *  description: string
 *  instancePath: string[]
 *  value: {[key: string]: string | number }
 *  property: import('../../../shared/types').Property
 * }} props
 */
export default function CVSSV3Attribute({
  label,
  description,
  instancePath,
  value,
  property,
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

  /** @type {(childName: string, options: string[]) => any} */
  const dropdownFor = (childName, options) => {
    return (
      <DropdownAttribute
        label={childName.charAt(0).toUpperCase() + childName.substring(1)}
        description=""
        options={options}
        isEnum={true}
        instancePath={instancePath.concat([childName])}
        value={(value || {})[childName] || ''}
        property={property}
      />
    )
  }

  return (
    <DocumentEditorContext.Provider value={documentEditor}>
      <div className="gap-4 p-4">
        <Attribute
          label={label}
          description={description}
          instancePath={instancePath}
          property={property}
        >
          {dropdownFor('version', ['3.0', '3.1'])}
          <TextAttribute
            label="VectorString"
            description=""
            pattern="^CVSS:3.[01]/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$"
            minLength={1}
            required={true}
            instancePath={instancePath.concat(['vectorString'])}
            value={value?.vectorString || ''}
            property={property}
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
          <Attribute
            label={'BaseScore'}
            description={'The CVSS Base Score'}
            instancePath={instancePath.concat(['baseScore'])}
            property={property}
          >
            {typeof value?.baseScore === 'number'
              ? String(value.baseScore)
              : ''}
          </Attribute>
          <Attribute
            label={'BaseSeverity'}
            description={'The CVSS Base Severity'}
            instancePath={instancePath.concat(['baseSeverity'])}
            property={property}
          >
            {value?.baseSeverity || ''}
          </Attribute>
          {dropdownFor('exploitCodeMaturity', [
            'UNPROVEN',
            'PROOF_OF_CONCEPT',
            'FUNCTIONAL',
            'HIGH',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('remediationLevel', [
            'OFFICIAL_FIX',
            'TEMPORARY_FIX',
            'WORKAROUND',
            'UNAVAILABLE',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('reportConfidence', [
            'UNKNOWN',
            'REASONABLE',
            'CONFIRMED',
            'NOT_DEFINED',
            '',
          ])}
          <Attribute
            label={'TemporalScore'}
            description={'The CVSS Temporal Score'}
            instancePath={instancePath.concat(['temporalScore'])}
            property={property}
          >
            {typeof value?.temporalScore === 'number'
              ? String(value.temporalScore)
              : ''}
          </Attribute>
          <Attribute
            label={'TemporalSeverity'}
            description={'The CVSS Temporal Severity'}
            instancePath={instancePath.concat(['temporalSeverity'])}
            property={property}
          >
            {value?.temporalSeverity || ''}
          </Attribute>
          {dropdownFor('confidentialityRequirement', [
            'LOW',
            'MEDIUM',
            'HIGH',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('integrityRequirement', [
            'LOW',
            'MEDIUM',
            'HIGH',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('availabilityRequirement', [
            'LOW',
            'MEDIUM',
            'HIGH',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('modifiedAttackVector', [
            'NETWORK',
            'ADJACENT_NETWORK',
            'LOCAL',
            'PHYSICAL',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('modifiedAttackComplexity', [
            'HIGH',
            'LOW',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('modifiedPrivilegesRequired', [
            'NONE',
            'LOW',
            'HIGH',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('modifiedUserInteraction', [
            'NONE',
            'REQUIRED',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('modifiedScope', [
            'UNCHANGED',
            'CHANGED',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('modifiedConfidentialityImpact', [
            'NONE',
            'LOW',
            'HIGH',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('modifiedIntegrityImpact', [
            'NONE',
            'LOW',
            'HIGH',
            'NOT_DEFINED',
            '',
          ])}
          {dropdownFor('modifiedAvailabilityImpact', [
            'NONE',
            'LOW',
            'HIGH',
            'NOT_DEFINED',
            '',
          ])}
          <Attribute
            label={'EnvironmentalScore'}
            description={'The CVSS Environmental Score'}
            instancePath={instancePath.concat(['environmentalScore'])}
            property={property}
          >
            {typeof value?.environmentalScore === 'number'
              ? String(value.environmentalScore)
              : ''}
          </Attribute>
          <Attribute
            label={'EnvironmentalSeverity'}
            description={'The CVSS Environmental Severity'}
            instancePath={instancePath.concat(['environmentalSeverity'])}
            property={property}
          >
            {value?.environmentalSeverity || ''}
          </Attribute>
        </Attribute>
      </div>
    </DocumentEditorContext.Provider>
  )
}
