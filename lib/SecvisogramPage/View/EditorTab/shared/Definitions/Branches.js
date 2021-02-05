import React from 'react'
import ArrayContainer from '../ArrayContainer'
import EnumAttribute from '../EnumAttribute'
import ObjectContainer from '../ObjectContainer'
import TextAttribute from '../TextAttribute'
import FullProductName from './FullProductName'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Branches({
  value: value,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <ArrayContainer
      label="List of branches"
      description="Contains branch elements as children of the current element."
      value={value}
      dataPath={`${dataPath}`}
      defaultItemValue={() => ({})}
      validationErrors={validationErrors}
      onUpdate={onUpdate}
    >
      {({ value: itemValue, dataPath: itemDataPath }) => (
        <ObjectContainer
          label="Branch"
          description="Is a part of the hierarchical structure of the product tree."
          dataPath={`${itemDataPath}`}
          defaultValue={() => ({})}
          validationErrors={validationErrors}
          value={itemValue}
          onUpdate={onUpdate}
        >
          {(branchProps) => (
            <>
              <TextAttribute
                {...branchProps('name')}
                label="Name of the branch"
                description="Contains the canonical descriptor or 'friendly name' of the branch."
                placeholder="Microsoft ..."
              />
              <EnumAttribute
                {...branchProps('type')}
                label="Type of the branch"
                description="Describes the characteristics of the labeled branch."
                options={[
                  'architecture',
                  'host_name',
                  'language',
                  'legacy',
                  'patch_level',
                  'product_family',
                  'product_name',
                  'product_version',
                  'service_pack',
                  'specification',
                  'vendor',
                ]}
              />
              <Branches {...branchProps('branches')} />
              <FullProductName {...branchProps('product')} />
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
