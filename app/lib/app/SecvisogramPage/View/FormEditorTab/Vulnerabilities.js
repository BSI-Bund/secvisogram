import React from 'react'
import ArrayContainer from './shared/ArrayContainer.js'
import CweAttribute from './shared/CweAttribute.js'
import DateAttribute from './shared/DateAttribute.js'
import {
  Acknowledgments,
  Notes,
  ProductGroups,
  Products,
  References,
} from './shared/definitions.js'
import EnumAttribute from './shared/EnumAttribute.js'
import ObjectContainer from './shared/ObjectContainer.js'
import TextAreaAttribute from './shared/TextAreaAttribute.js'
import TextAttribute from './shared/TextAttribute.js'
import validationErrorShallowEqual from './shared/validationErrorShallowEqual.js'
import Scores from './Vulnerabilities/Scores.js'

export default React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../shared/types').ValidationError[]
   *  instancePath: string
   *  onUpdate(instancePath: string, update: {}): void
   *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
   *  onCollectGroupIds(): Promise<void | {id: string, name: string}[]>
   * }} props
   */
  function Vulnerabilities({
    onCollectProductIds,
    onCollectGroupIds,
    ...props
  }) {
    return (
      <ArrayContainer
        {...props}
        label="Vulnerabilities"
        description="Represents a list of all relevant vulnerability information items."
        defaultItemValue={() => ({})}
      >
        {(itemProps) => (
          <Vulnerability
            {...itemProps}
            onCollectProductIds={onCollectProductIds}
            onCollectGroupIds={onCollectGroupIds}
          />
        )}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)

const Vulnerability = React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../shared/types').ValidationError[]
   *  instancePath: string
   *  defaultValue?(): {}
   *  onUpdate(instancePath: string, update: {}): void
   *  onCollectGroupIds(): Promise<void | {id: string, name: string}[]>
   *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
   * }} props
   */
  function Vulnerability({ onCollectProductIds, onCollectGroupIds, ...props }) {
    return (
      <ObjectContainer
        {...props}
        label="Vulnerability"
        description="Is a container for the aggregation of all fields that are related to a single vulnerability in the document."
      >
        {(vulnerabilityProps) => (
          <>
            <Acknowledgments
              {...vulnerabilityProps('acknowledgments')}
              label="Vulnerability acknowledgments"
              description="Contains a list of acknowledgment elements associated with this vulnerability item."
            />
            <TextAttribute
              {...vulnerabilityProps('cve')}
              label="CVE"
              description="Holds the MITRE standard Common Vulnerabilities and Exposures (CVE) tracking number for the vulnerability."
              pattern="^CVE-[0-9]{4}-[0-9]{4,}$"
              deletable
            />
            <CweAttribute {...vulnerabilityProps('cwe')} />
            <DateAttribute
              {...vulnerabilityProps('discovery_date')}
              label="Discovery date"
              description="Holds the date and time the vulnerability was originally discovered."
              deletable
            />
            <ArrayContainer
              {...vulnerabilityProps('flags')}
              label="List of flags"
              description="Contains a list of machine readable flags."
              defaultItemValue={() => ({
                label: '',
              })}
            >
              {(flagItemProps) => (
                <ObjectContainer
                  {...flagItemProps}
                  label="Flag"
                  description="Contains product specific information in regard to this vulnerability as a single machine readable flag."
                >
                  {(flagProps) => (
                    <>
                      <EnumAttribute
                        {...flagProps('label')}
                        label="Label of the flag"
                        description="Specifies the machine readable label."
                        options={[
                          'component_not_present',
                          'vulnerable_code_not_present',
                          'vulnerable_code_not_in_execute_path',
                          'vulnerable_code_cannot_be_controlled_by_adversary',
                          'inline_mitigations_already_exist',
                        ]}
                      />
                      <DateAttribute
                        {...flagProps('date')}
                        label="Date of the flag"
                        description="Contains the date when assessment was done or the flag was assigned."
                        deletable
                      />
                      <ProductGroups
                        {...flagProps('group_ids')}
                        onCollectGroupIds={onCollectGroupIds}
                      />
                      <Products
                        {...flagProps('product_ids')}
                        onCollectProductIds={onCollectProductIds}
                      />
                    </>
                  )}
                </ObjectContainer>
              )}
            </ArrayContainer>
            <ArrayContainer
              {...vulnerabilityProps('ids')}
              label="List of IDs"
              description="Represents a list of unique labels or tracking IDs for the vulnerability (if such information exists)."
              defaultItemValue={() => ({
                system_name: '',
                text: '',
              })}
            >
              {(idItemProps) => (
                <ObjectContainer
                  {...idItemProps}
                  label="ID"
                  description="Contains a single unique label or tracking ID for the vulnerability."
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
              )}
            </ArrayContainer>
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
                  description="Is a container, that allows the document producers to comment on the level of involvement (or engagement) of themselves or third parties in the vulnerability identification, scoping, and remediation process."
                  defaultValue={() => ({})}
                >
                  {(involvementProps) => (
                    <>
                      <DateAttribute
                        {...involvementProps('date')}
                        label="Date of involvement"
                        description="Holds the date and time of the involvement entry."
                        deletable
                      />
                      <EnumAttribute
                        {...involvementProps('party')}
                        label="Party category"
                        description="Defines the category of the involved party."
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
                          'contact_attempted',
                          'disputed',
                          'in_progress',
                          'not_contacted',
                          'open',
                        ]}
                      />
                      <TextAreaAttribute
                        {...involvementProps('summary')}
                        label="Summary of the involvement"
                        deletable
                        description="Contains additional context regarding what is going on."
                      />
                    </>
                  )}
                </ObjectContainer>
              )}
            </ArrayContainer>
            <Notes
              {...vulnerabilityProps('notes')}
              label="Vulnerability notes"
              description="Holds notes associated with this vulnerability item."
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
                    {...productStatusProps('first_affected')}
                    label="First affected"
                    description="These are the first versions of the releases known to be affected by the vulnerability."
                    onCollectProductIds={onCollectProductIds}
                  />
                  <Products
                    {...productStatusProps('first_fixed')}
                    label="First fixed"
                    description="These versions contain the first fix for the vulnerability but may not be the recommended fixed versions."
                    onCollectProductIds={onCollectProductIds}
                  />
                  <Products
                    {...productStatusProps('fixed')}
                    label="Fixed"
                    description="These versions contain a fix for the vulnerability but may not be the recommended fixed versions."
                    onCollectProductIds={onCollectProductIds}
                  />
                  <Products
                    {...productStatusProps('known_affected')}
                    label="Known affected"
                    description="These versions are known to be affected by the vulnerability."
                    onCollectProductIds={onCollectProductIds}
                  />
                  <Products
                    {...productStatusProps('known_not_affected')}
                    label="Known not affected"
                    description="These versions are known not to be affected by the vulnerability."
                    onCollectProductIds={onCollectProductIds}
                  />
                  <Products
                    {...productStatusProps('last_affected')}
                    label="Last affected"
                    description="These are the last versions in a release train known to be affected by the vulnerability. Subsequently released versions would contain a fix for the vulnerability."
                    onCollectProductIds={onCollectProductIds}
                  />
                  <Products
                    {...productStatusProps('recommended')}
                    label="Recommended"
                    description="These versions have a fix for the vulnerability and are the vendor-recommended versions for fixing the vulnerability."
                    onCollectProductIds={onCollectProductIds}
                  />
                  <Products
                    {...productStatusProps('under_investigation')}
                    label="Under investigation"
                    description="It is not known yet whether these versions are or are not affected by the vulnerability. However, it is still under investigation - the result will be provided in a later release of the document."
                    onCollectProductIds={onCollectProductIds}
                  />
                </>
              )}
            </ObjectContainer>
            <References
              {...vulnerabilityProps('references')}
              label="Vulnerability references"
              description="Holds a list of references associated with this vulnerability item."
            />
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
                category: '',
                details: '',
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
                      <EnumAttribute
                        {...remediationProps('category')}
                        label="Category of the remediation"
                        description="Specifies the category which this remediation belongs to."
                        options={[
                          'workaround',
                          'mitigation',
                          'vendor_fix',
                          'none_available',
                          'no_fix_planned',
                        ]}
                      />
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
                      <ProductGroups
                        {...remediationProps('group_ids')}
                        onCollectGroupIds={onCollectGroupIds}
                      />
                      <Products
                        {...remediationProps('product_ids')}
                        onCollectProductIds={onCollectProductIds}
                      />
                      <ObjectContainer
                        {...remediationProps('restart_required')}
                        label="Restart required by remediation"
                        description="Provides information on category of restart is required by this remediation to become effective."
                        defaultValue={() => ({
                          category: '',
                        })}
                      >
                        {(restartRequiredProps) => (
                          <>
                            <EnumAttribute
                              {...restartRequiredProps('category')}
                              label="Category of restart"
                              description="Specifies what category of restart is required by this remediation to become effective."
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
            <Scores
              {...vulnerabilityProps('scores')}
              onCollectProductIds={onCollectProductIds}
            />
            <ArrayContainer
              {...vulnerabilityProps('threats')}
              label="List of threats"
              description="Contains information about a vulnerability that can change with time."
              defaultItemValue={() => ({
                category: '',
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
                        {...threatProps('category')}
                        label="Category of the threat"
                        description="Categorizes the threat according to the rules of the specification."
                        options={['impact', 'exploit_status', 'target_set']}
                      />
                      <DateAttribute
                        {...threatProps('date')}
                        label="Date of the threat"
                        description="Contains the date when the assessment was done or the threat appeared."
                        deletable
                      />
                      <TextAreaAttribute
                        {...threatProps('details')}
                        label="Details of the threat"
                        description="Represents a thorough human-readable discussion of the threat."
                      />
                      <ProductGroups
                        {...threatProps('group_ids')}
                        onCollectGroupIds={onCollectGroupIds}
                      />
                      <Products
                        {...threatProps('product_ids')}
                        onCollectProductIds={onCollectProductIds}
                      />
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
    )
  },
  validationErrorShallowEqual
)
