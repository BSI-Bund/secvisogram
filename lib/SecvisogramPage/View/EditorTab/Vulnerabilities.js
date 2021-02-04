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
              <Acknowledgments
                {...vulnerabilityProps}
                dataPath={`${vulnerabilityProps.dataPath}/acknowledgments`}
                value={vulnerabilityProps.value.acknowledgments}
              />
              <TextAttribute
                {...vulnerabilityProps}
                label="CVE"
                description="Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability."
                dataPath={`${vulnerabilityProps.dataPath}/cve`}
                value={vulnerabilityProps.value.cve}
                pattern="^CVE-[0-9]{4}-[0-9]{4,}$"
              />
              <ObjectContainer
                {...vulnerabilityProps}
                label="CWE"
                description="Holds the MITRE standard Common Weakness Enumeration (CWE) for the weakness associated."
                dataPath={`${vulnerabilityProps.dataPath}/cwe`}
                value={vulnerabilityProps.value.cwe}
                defaultValue={() => ({})}
              >
                {(cweProps) => (
                  <>
                    <TextAttribute
                      {...cweProps}
                      label="Weakness ID"
                      description="Holds the ID for the weakness associated."
                      dataPath={`${cweProps.dataPath}/id`}
                      value={cweProps.value.id}
                      placeholder="CWE-79 ..."
                    />
                    <TextAttribute
                      {...cweProps}
                      label="Weakness name"
                      description="Holds the full name of the weakness as given in the CWE specification."
                      dataPath={`${cweProps.dataPath}/name`}
                      value={cweProps.value.name}
                      placeholder="Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting') ..."
                    />
                  </>
                )}
              </ObjectContainer>
              {/** @todo scores missing */}
              <DateAttribute
                {...vulnerabilityProps}
                label="Discovery date"
                description="Holds the date and time the vulnerability was originally discovered."
                dataPath={`${vulnerabilityProps.dataPath}/discovery_date`}
                value={vulnerabilityProps.value.discovery_date}
              />
              <ObjectContainer
                {...vulnerabilityProps}
                label="ID"
                description="Gives the document producer a place to publish a unique label or tracking ID for the vulnerability (if such information exists)."
                dataPath={`${vulnerabilityProps.dataPath}/id`}
                value={vulnerabilityProps.value.id}
                defaultValue={() => ({})}
              >
                {(idProps) => (
                  <>
                    <TextAttribute
                      {...idProps}
                      label="System name"
                      description="Indicates the name of the vulnerability tracking or numbering system."
                      dataPath={`${idProps.dataPath}/system_name`}
                      value={idProps.value.system_name}
                      placeholder="Cisco Bug ID ..."
                    />
                    <TextAttribute
                      {...idProps}
                      label="Text"
                      description="Is unique label or tracking ID for the vulnerability (if such information exists)."
                      dataPath={`${idProps.dataPath}/text`}
                      value={idProps.value.text}
                      placeholder="CSCso66472 ..."
                    />
                  </>
                )}
              </ObjectContainer>
              <ArrayContainer
                {...vulnerabilityProps}
                label="List of involvements"
                description="Contains a list of involvements."
                dataPath={`${vulnerabilityProps.dataPath}/involvements`}
                value={vulnerabilityProps.value.involvements}
                defaultItemValue={() => ({})}
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
                          {...involvementProps}
                          dataPath={`${involvementProps.dataPath}/summary`}
                          value={involvementProps.value.summary}
                          label="Summary of the involvement"
                          deletable
                          description="Contains additional context regarding what is going on."
                        />
                        <EnumAttribute
                          {...involvementProps}
                          dataPath={`${involvementProps.dataPath}/party`}
                          value={involvementProps.value.party}
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
                          {...involvementProps}
                          dataPath={`${involvementProps.dataPath}/status`}
                          value={involvementProps.value.status}
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
                {...vulnerabilityProps}
                label="List of notes"
                description="Contains notes which are specific to the current context."
                dataPath={`${vulnerabilityProps.dataPath}/notes`}
                value={vulnerabilityProps.value.notes}
              />
              <ObjectContainer
                {...vulnerabilityProps}
                dataPath={`${vulnerabilityProps.dataPath}/product_status`}
                value={vulnerabilityProps.value.product_status}
                label="Product status"
                description="Contains different lists of product_ids which provide details on the status of the referenced product related to the current vulnerability."
                defaultValue={() => ({})}
              >
                {(productStatusProps) => (
                  <>
                    <Products
                      {...productStatusProps}
                      dataPath={`${productStatusProps.dataPath}/fixed`}
                      value={productStatusProps.value.fixed}
                      label="Fixed"
                      description="These versions contain a fix for the vulnerability but may not be the recommended fixed versions."
                    />
                    <Products
                      {...productStatusProps}
                      dataPath={`${productStatusProps.dataPath}/first_fixed`}
                      value={productStatusProps.value.first_fixed}
                      label="First fixed"
                      description="These versions contain the first fix for the vulnerability but may not be the recommended fixed versions."
                    />
                    <Products
                      {...productStatusProps}
                      dataPath={`${productStatusProps.dataPath}/recommended`}
                      value={productStatusProps.value.recommended}
                      label="Recommended"
                      description="These versions have a fix for the vulnerability and are the vendor-recommended versions for fixing the vulnerability."
                    />
                    <Products
                      {...productStatusProps}
                      dataPath={`${productStatusProps.dataPath}/known_affected`}
                      value={productStatusProps.value.known_affected}
                      label="Known affected"
                      description="These versions are known to be affected by the vulnerability."
                    />
                    <Products
                      {...productStatusProps}
                      dataPath={`${productStatusProps.dataPath}/first_affected`}
                      value={productStatusProps.value.first_affected}
                      label="First affected"
                      description="These are the first versions of the releases known to be affected by the vulnerability."
                    />
                    <Products
                      {...productStatusProps}
                      dataPath={`${productStatusProps.dataPath}/last_affected`}
                      value={productStatusProps.value.last_affected}
                      label="Last affected"
                      description="These are the last versions in a release train known to be affected by the vulnerability. Subsequently released versions would contain a fix for the vulnerability."
                    />
                    <Products
                      {...productStatusProps}
                      dataPath={`${productStatusProps.dataPath}/known_not_affected`}
                      value={productStatusProps.value.known_not_affected}
                      label="Known not affected"
                      description="These versions are known not to be affected by the vulnerability."
                    />
                    <Products
                      {...productStatusProps}
                      dataPath={`${productStatusProps.dataPath}/under_investigation`}
                      value={productStatusProps.value.under_investigation}
                      label="Under investigation"
                      description="It is not known yet whether this version is or is not affected by the vulnerability. However, it is still under investigation - the result will be provided in a later release of the document."
                    />
                  </>
                )}
              </ObjectContainer>
              <References
                {...vulnerabilityProps}
                dataPath={`${vulnerabilityProps.dataPath}/references`}
                value={vulnerabilityProps.value.references}
              />
              <DateAttribute
                {...vulnerabilityProps}
                dataPath={`${vulnerabilityProps.dataPath}/release_date`}
                value={vulnerabilityProps.value.release_date}
                label="Release date"
                description="Holds the date and time the vulnerability was originally released into the wild."
              />
              <ArrayContainer
                {...vulnerabilityProps}
                dataPath={`${vulnerabilityProps.dataPath}/remediations`}
                value={vulnerabilityProps.value.remediations}
                label="List of remediations"
                description="Contains a list of remediations."
                defaultItemValue={() => ({})}
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
                          {...remediationProps}
                          dataPath={`${remediationProps.dataPath}/date`}
                          value={remediationProps.value.date}
                          label="Date of the remediation"
                          description="Contains the date from which the remediation is available."
                          deletable
                        />
                        <TextAreaAttribute
                          {...remediationProps}
                          dataPath={`${remediationProps.dataPath}/details`}
                          value={remediationProps.value.details}
                          label="Details of the remediation"
                          description="Contains a thorough human-readable discussion of the remediation."
                        />
                        <ArrayContainer
                          {...remediationProps}
                          dataPath={`${remediationProps.dataPath}/entitlements`}
                          value={remediationProps.value.entitlements}
                          label="List of entitlements"
                          description="Contains a list of entitlements."
                          defaultItemValue={() => ''}
                        >
                          {(entitlementItemProps) => (
                            <TextAttribute
                              {...entitlementItemProps}
                              label="Entitlement of the remediation"
                              description="Contains any possible vendor-defined constraints for obtaining fixed software or hardware that fully resolves the vulnerability."
                              deletable
                            />
                          )}
                        </ArrayContainer>
                        <ProductGroups
                          {...remediationProps}
                          dataPath={`${remediationProps.dataPath}/group_ids`}
                          value={remediationProps.value.group_ids}
                        />
                        <Products
                          {...remediationProps}
                          dataPath={`${remediationProps.dataPath}/product_ids`}
                          value={remediationProps.value.product_ids}
                        />
                        <ObjectContainer
                          {...remediationProps}
                          dataPath={`${remediationProps.dataPath}/restart_required`}
                          value={remediationProps.value.restart_required}
                          label="Restart required by remediation"
                          description="Provides information on type of restart is required by this remediation to become effective."
                          defaultValue={() => ({})}
                        >
                          {(restartRequiredProps) => (
                            <>
                              <EnumAttribute
                                {...restartRequiredProps}
                                dataPath={`${restartRequiredProps.dataPath}/type`}
                                value={restartRequiredProps.value.type}
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
                              <TextAttribute
                                {...restartRequiredProps}
                                dataPath={`${restartRequiredProps.dataPath}/details`}
                                value={restartRequiredProps.value.details}
                                label="Additional restart information"
                                description="Provides additional information for the restart. This can include details on procedures, scope or impact."
                              />
                            </>
                          )}
                        </ObjectContainer>
                        <EnumAttribute
                          {...remediationProps}
                          dataPath={`${remediationProps.dataPath}/type`}
                          value={remediationProps.value.type}
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
                          {...remediationProps}
                          dataPath={`${remediationProps.dataPath}/url`}
                          value={remediationProps.value.url}
                          label="URL to the remediation"
                          description="Contains the URL where to obtain the remediation."
                          type="url"
                        />
                      </>
                    )}
                  </ObjectContainer>
                )}
              </ArrayContainer>
              <ArrayContainer
                {...vulnerabilityProps}
                dataPath={`${vulnerabilityProps.dataPath}/threats`}
                value={vulnerabilityProps.value.threats}
                label="List of threats"
                description="Contains information about a vulnerability that can change with time."
                defaultItemValue={() => ({})}
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
                          {...threatProps}
                          dataPath={`${threatProps.dataPath}/type`}
                          value={threatProps.value.type}
                          label="Type of the threat"
                          description="Categorizes the threat according to the rules of the specification."
                          options={['impact', 'exploit_status', 'target_set']}
                        />
                        <TextAreaAttribute
                          {...threatProps}
                          dataPath={`${threatProps.dataPath}/details`}
                          value={threatProps.value.details}
                          label="Details of the threat"
                          description="Represents a thorough human-readable discussion of the threat."
                        />
                        <DateAttribute
                          {...threatProps}
                          dataPath={`${threatProps.dataPath}/date`}
                          value={threatProps.value.date}
                          label="Date of the threat"
                          description="Contains the date when the assessment was done or the threat appeared."
                        />
                        <Products
                          {...threatProps}
                          dataPath={`${threatProps.dataPath}/product_ids`}
                          value={threatProps.value.product_ids}
                        />
                        <ProductGroups
                          {...threatProps}
                          dataPath={`${threatProps.dataPath}/group_ids`}
                          value={threatProps.value.group_ids}
                        />
                      </>
                    )}
                  </ObjectContainer>
                )}
              </ArrayContainer>
              <TextAttribute
                {...vulnerabilityProps}
                dataPath={`${vulnerabilityProps.dataPath}/title`}
                value={vulnerabilityProps.value.title}
                label="Title"
                description="Gives the document producer the ability to apply a canonical name or title to the vulnerability."
              />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
