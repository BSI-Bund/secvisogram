import '@reach/combobox/styles.css'
import React from 'react'
import ArrayContainer from './shared/ArrayContainer'
import DateAttribute from './shared/DateAttribute'
import Acknowledgments from './shared/Definitions/Acknowledgments'
import Notes from './shared/Definitions/Notes'
import ProductGroups from './shared/Definitions/ProductGroups'
import Products from './shared/Definitions/Products'
import References from './shared/Definitions/References'
import EnumAttribute from './shared/EnumAttribute'
import NumberAttribute from './shared/NumberAttribute'
import ObjectContainer from './shared/ObjectContainer'
import TextAreaAttribute from './shared/TextAreaAttribute'
import TextAttribute from './shared/TextAttribute'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Vulnerabilities(props) {
  return (
    <ArrayContainer
      {...props}
      label="Vulnerabilities"
      description="Represents a list of all relevant vulnerability information items."
      defaultItemValue={() => ({})}
    >
      {(itemProps) => (
        <ObjectContainer
          {...itemProps}
          label="Vulnerability"
          description="Is a container for the aggregation of all fields that are related to a single vulnerability in the document."
          defaultValue={() => ({})}
        >
          {(vulnerabilityProps) => (
            <>
              <Acknowledgments {...vulnerabilityProps('acknowledgments')} />
              <TextAttribute
                {...vulnerabilityProps('cve')}
                label="CVE"
                description="Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability."
                pattern="^CVE-[0-9]{4}-[0-9]{4,}$"
                deletable
              />
              <ObjectContainer
                {...vulnerabilityProps('cwe')}
                label="CWE"
                description="Holds the MITRE standard Common Weakness Enumeration (CWE) for the weakness associated."
                defaultValue={() => ({
                  id: '',
                  name: '',
                })}
              >
                {(cweProps) => (
                  <>
                    <TextAttribute
                      {...cweProps('id')}
                      label="Weakness ID"
                      description="Holds the ID for the weakness associated."
                      placeholder="CWE-79 ..."
                    />
                    <TextAreaAttribute
                      {...cweProps('name')}
                      label="Weakness name"
                      description="Holds the full name of the weakness as given in the CWE specification."
                      placeholder="Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') ..."
                    />
                  </>
                )}
              </ObjectContainer>
              <ArrayContainer
                {...vulnerabilityProps('scores')}
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
                                options={[
                                  'NONE',
                                  'LOW',
                                  'MEDIUM',
                                  'HIGH',
                                  'CRITICAL',
                                ]}
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
                                options={[
                                  'NONE',
                                  'LOW',
                                  'MEDIUM',
                                  'HIGH',
                                  'CRITICAL',
                                ]}
                                deletable
                              />
                              <EnumAttribute
                                {...cvssV3Props('confidentialityRequirement')}
                                label="ConfidentialityRequirement"
                                description=""
                                options={[
                                  'LOW',
                                  'MEDIUM',
                                  'HIGH',
                                  'NOT_DEFINED',
                                ]}
                                deletable
                              />
                              <EnumAttribute
                                {...cvssV3Props('integrityRequirement')}
                                label="IntegrityRequirement"
                                description=""
                                options={[
                                  'LOW',
                                  'MEDIUM',
                                  'HIGH',
                                  'NOT_DEFINED',
                                ]}
                                deletable
                              />
                              <EnumAttribute
                                {...cvssV3Props('availabilityRequirement')}
                                label="AvailabilityRequirement"
                                description=""
                                options={[
                                  'LOW',
                                  'MEDIUM',
                                  'HIGH',
                                  'NOT_DEFINED',
                                ]}
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
                                options={[
                                  'UNCHANGED',
                                  'CHANGED',
                                  'NOT_DEFINED',
                                ]}
                                deletable
                              />
                              <EnumAttribute
                                {...cvssV3Props(
                                  'modifiedConfidentialityImpact'
                                )}
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
                                options={[
                                  'NONE',
                                  'LOW',
                                  'MEDIUM',
                                  'HIGH',
                                  'CRITICAL',
                                ]}
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
              <DateAttribute
                {...vulnerabilityProps('discovery_date')}
                label="Discovery date"
                description="Holds the date and time the vulnerability was originally discovered."
                deletable
              />
              <ObjectContainer
                {...vulnerabilityProps('id')}
                label="ID"
                description="Gives the document producer a place to publish a unique label or tracking ID for the vulnerability (if such information exists)."
                defaultValue={() => ({
                  system_name: '',
                  text: '',
                })}
              >
                {(idProps) => (
                  <>
                    <TextAttribute
                      {...idProps('system_name')}
                      label="System name"
                      description="Indicates the name of the vulnerability tracking or numbering system."
                      placeholder="Cisco Bug ID ..."
                    />
                    <TextAttribute
                      {...idProps('text')}
                      label="Text"
                      description="Is unique label or tracking ID for the vulnerability (if such information exists)."
                      placeholder="CSCso66472 ..."
                    />
                  </>
                )}
              </ObjectContainer>
              <ArrayContainer
                {...vulnerabilityProps('involvements')}
                label="List of involvements"
                description="Contains a list of involvements."
                defaultItemValue={() => ({
                  party: '',
                  status: '',
                })}
              >
                {(involvementItemProps) => (
                  <ObjectContainer
                    {...involvementItemProps}
                    label="Involvement"
                    description="Is a container, that allows the document producers to comment on their level of Involvement (or engagement) in the vulnerability identification, scoping, and remediation process."
                    defaultValue={() => ({})}
                  >
                    {(involvementProps) => (
                      <>
                        <TextAreaAttribute
                          {...involvementProps('summary')}
                          label="Summary of the involvement"
                          deletable
                          description="Contains additional context regarding what is going on."
                        />
                        <EnumAttribute
                          {...involvementProps('party')}
                          label="Party type"
                          description="Defines the type of the involved party."
                          options={[
                            'coordinator',
                            'discoverer',
                            'other',
                            'user',
                            'vendor',
                          ]}
                        />
                        <EnumAttribute
                          {...involvementProps('status')}
                          label="Party status"
                          description="Defines contact status of the involved party."
                          options={[
                            'completed',
                            'contact_accepted',
                            'disputed',
                            'in_progress',
                            'not_contacted',
                            'open',
                          ]}
                        />
                      </>
                    )}
                  </ObjectContainer>
                )}
              </ArrayContainer>
              <Notes
                {...vulnerabilityProps('notes')}
                label="List of notes"
                description="Contains notes which are specific to the current context."
              />
              <ObjectContainer
                {...vulnerabilityProps('product_status')}
                label="Product status"
                description="Contains different lists of product_ids which provide details on the status of the referenced product related to the current vulnerability."
                defaultValue={() => ({})}
              >
                {(productStatusProps) => (
                  <>
                    <Products
                      {...productStatusProps('fixed')}
                      label="Fixed"
                      description="These versions contain a fix for the vulnerability but may not be the recommended fixed versions."
                    />
                    <Products
                      {...productStatusProps('first_fixed')}
                      label="First fixed"
                      description="These versions contain the first fix for the vulnerability but may not be the recommended fixed versions."
                    />
                    <Products
                      {...productStatusProps('recommended')}
                      label="Recommended"
                      description="These versions have a fix for the vulnerability and are the vendor-recommended versions for fixing the vulnerability."
                    />
                    <Products
                      {...productStatusProps('known_affected')}
                      label="Known affected"
                      description="These versions are known to be affected by the vulnerability."
                    />
                    <Products
                      {...productStatusProps('first_affected')}
                      label="First affected"
                      description="These are the first versions of the releases known to be affected by the vulnerability."
                    />
                    <Products
                      {...productStatusProps('last_affected')}
                      label="Last affected"
                      description="These are the last versions in a release train known to be affected by the vulnerability. Subsequently released versions would contain a fix for the vulnerability."
                    />
                    <Products
                      {...productStatusProps('known_not_affected')}
                      label="Known not affected"
                      description="These versions are known not to be affected by the vulnerability."
                    />
                    <Products
                      {...productStatusProps('under_investigation')}
                      label="Under investigation"
                      description="It is not known yet whether this version is or is not affected by the vulnerability. However, it is still under investigation - the result will be provided in a later release of the document."
                    />
                  </>
                )}
              </ObjectContainer>
              <References {...vulnerabilityProps('references')} />
              <DateAttribute
                {...vulnerabilityProps('release_date')}
                label="Release date"
                description="Holds the date and time the vulnerability was originally released into the wild."
                deletable
              />
              <ArrayContainer
                {...vulnerabilityProps('remediations')}
                label="List of remediations"
                description="Contains a list of remediations."
                defaultItemValue={() => ({
                  details: '',
                  type: '',
                })}
              >
                {(remediationItemProps) => (
                  <ObjectContainer
                    {...remediationItemProps}
                    label="Remediation"
                    description="Specifies details on how to handle (and presumably, fix) a vulnerability."
                  >
                    {(remediationProps) => (
                      <>
                        <DateAttribute
                          {...remediationProps('date')}
                          label="Date of the remediation"
                          description="Contains the date from which the remediation is available."
                          deletable
                        />
                        <TextAreaAttribute
                          {...remediationProps('details')}
                          label="Details of the remediation"
                          description="Contains a thorough human-readable discussion of the remediation."
                        />
                        <ArrayContainer
                          {...remediationProps('entitlements')}
                          label="List of entitlements"
                          description="Contains a list of entitlements."
                          defaultItemValue={() => ''}
                        >
                          {(entitlementItemProps) => (
                            <TextAreaAttribute
                              {...entitlementItemProps}
                              label="Entitlement of the remediation"
                              description="Contains any possible vendor-defined constraints for obtaining fixed software or hardware that fully resolves the vulnerability."
                              deletable
                            />
                          )}
                        </ArrayContainer>
                        <ProductGroups {...remediationProps('group_ids')} />
                        <Products {...remediationProps('product_ids')} />
                        <ObjectContainer
                          {...remediationProps('restart_required')}
                          label="Restart required by remediation"
                          description="Provides information on type of restart is required by this remediation to become effective."
                          defaultValue={() => ({
                            type: '',
                          })}
                        >
                          {(restartRequiredProps) => (
                            <>
                              <EnumAttribute
                                {...restartRequiredProps('type')}
                                label="Type of restart"
                                description="Specifies what type of restart is required by this remediation to become effective."
                                options={[
                                  'none',
                                  'vulnerable_component',
                                  'service',
                                  'parent',
                                  'dependencies',
                                  'connected',
                                  'machine',
                                  'zone',
                                  'system',
                                ]}
                              />
                              <TextAreaAttribute
                                {...restartRequiredProps('details')}
                                label="Additional restart information"
                                description="Provides additional information for the restart. This can include details on procedures, scope or impact."
                                deletable
                              />
                            </>
                          )}
                        </ObjectContainer>
                        <EnumAttribute
                          {...remediationProps('type')}
                          label="Type of the remediation"
                          description="Specifies the type which this remediation belongs to."
                          options={[
                            'workaround',
                            'mitigation',
                            'vendor_fix',
                            'none_available',
                            'no_fix_planned',
                          ]}
                        />
                        <TextAttribute
                          {...remediationProps('url')}
                          label="URL to the remediation"
                          description="Contains the URL where to obtain the remediation."
                          type="url"
                          deletable
                        />
                      </>
                    )}
                  </ObjectContainer>
                )}
              </ArrayContainer>
              <ArrayContainer
                {...vulnerabilityProps('threats')}
                label="List of threats"
                description="Contains information about a vulnerability that can change with time."
                defaultItemValue={() => ({
                  type: '',
                  details: '',
                })}
              >
                {(threatItemProps) => (
                  <ObjectContainer
                    {...threatItemProps}
                    label="Threat"
                    description="Contains the vulnerability kinetic information. This information can change as the vulnerability ages and new information becomes available."
                  >
                    {(threatProps) => (
                      <>
                        <EnumAttribute
                          {...threatProps('type')}
                          label="Type of the threat"
                          description="Categorizes the threat according to the rules of the specification."
                          options={['impact', 'exploit_status', 'target_set']}
                        />
                        <TextAreaAttribute
                          {...threatProps('details')}
                          label="Details of the threat"
                          description="Represents a thorough human-readable discussion of the threat."
                        />
                        <DateAttribute
                          {...threatProps('date')}
                          label="Date of the threat"
                          description="Contains the date when the assessment was done or the threat appeared."
                          deletable
                        />
                        <Products {...threatProps('product_ids')} />
                        <ProductGroups {...threatProps('group_ids')} />
                      </>
                    )}
                  </ObjectContainer>
                )}
              </ArrayContainer>
              <TextAttribute
                {...vulnerabilityProps('title')}
                label="Title"
                description="Gives the document producer the ability to apply a canonical name or title to the vulnerability."
                deletable
              />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
