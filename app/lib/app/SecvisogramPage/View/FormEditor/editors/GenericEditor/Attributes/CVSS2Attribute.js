import React from 'react'
import Collapsible from './shared/Collapsible.js'
import TextAttribute from './TextAttribute.js'
import Attribute from './shared/Attribute.js'
import DocumentEditorContext from '../../../../shared/DocumentEditorContext.js'
import { cvssDropdown, getSeverityColors } from './shared/cvssUtils.js'
import {
  vectorUpdateBaseScore,
  vectorUpdateEnvironmentalScore,
  vectorUpdateFromVectorString,
  vectorUpdateTemporalScore,
  vectorUpdateVectorString,
} from '../../../../../../../shared/cvss2Tools.js'
import { set } from 'lodash/fp.js'

/**
 * @param {{
 *  instancePath: string[]
 *  value: {[key: string]: string | number }
 *  property: import('../../../shared/types').Property
 *  disabled: boolean
 * }} props
 */
export default function CVSSV2Attribute({
  instancePath,
  value,
  property,
  disabled,
}) {
  const { doc, updateDoc, ...outerDocumentEditor } = React.useContext(
    DocumentEditorContext
  )

  /** @type {React.ContextType<typeof DocumentEditorContext>} */
  const documentEditor = React.useMemo(
    () => ({
      ...outerDocumentEditor,
      doc,
      updateDoc(updatedInstancePath, updatedValue) {
        const field = updatedInstancePath.at(-1)
        let updatedVector = set(
          updatedInstancePath.slice(instancePath.length),
          updatedValue
        )(value)
        updatedVector.version = '2.0'

        updatedVector =
          field === 'vectorString' && typeof updatedValue === 'string'
            ? vectorUpdateFromVectorString(updatedVector)
            : vectorUpdateVectorString(updatedVector)

        updatedVector = vectorUpdateBaseScore(updatedVector)
        updatedVector = vectorUpdateTemporalScore(updatedVector)
        updatedVector = vectorUpdateEnvironmentalScore(updatedVector)
        updateDoc(instancePath, updatedVector)
      },
    }),
    [outerDocumentEditor, updateDoc, instancePath, value, doc]
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
        {dropdownFor('version', ['2.0'], true)}
        <TextAttribute
          label="VectorString"
          description=""
          pattern="^CVSS:3.[01]/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$"
          minLength={1}
          instancePath={instancePath.concat(['vectorString'])}
          value={value?.vectorString || ''}
          property={property}
          disabled={disabled}
          required={true}
        />
        <Collapsible startCollapsed={true} title="base inputs">
          {dropdownFor('accessVector', [
            'NETWORK',
            'ADJACENT_NETWORK',
            'LOCAL',
          ])}
          {dropdownFor('accessComplexity', ['HIGH', 'MEDIUM', 'LOW'])}
          {dropdownFor('authentication', ['MULTIPLE', 'SINGLE', 'NONE'])}
          {dropdownFor('confidentialityImpact', [
            'NONE',
            'PARTIAL',
            'COMPLETE',
          ])}
          {dropdownFor('integrityImpact', ['NONE', 'PARTIAL', 'COMPLETE'])}
          {dropdownFor('availabilityImpact', ['NONE', 'PARTIAL', 'COMPLETE'])}
        </Collapsible>
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

        <Collapsible startCollapsed={true} title="temporal inputs">
          {dropdownFor('exploitability', [
            'UNPROVEN',
            'PROOF_OF_CONCEPT',
            'FUNCTIONAL',
            'HIGH',
            'NOT_DEFINED',
          ])}
          {dropdownFor('remediationLevel', [
            'OFFICIAL_FIX',
            'TEMPORARY_FIX',
            'WORKAROUND',
            'UNAVAILABLE',
            'NOT_DEFINED',
          ])}
          {dropdownFor('reportConfidence', [
            'UNCONFIRMED',
            'UNCORROBORATED',
            'CONFIRMED',
            'NOT_DEFINED',
          ])}
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

        <Collapsible startCollapsed={true} title="environmental inputs">
          {dropdownFor(
            'collateralDamagePotential',
            ['NONE', 'LOW', 'LOW_MEDIUM', 'MEDIUM_HIGH', 'HIGH', 'NOT_DEFINED'],
            false
          )}
          {dropdownFor(
            'targetDistribution',
            ['NONE', 'LOW', 'MEDIUM', 'HIGH', 'NOT_DEFINED'],
            false
          )}
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
      </div>
    </DocumentEditorContext.Provider>
  )
}
