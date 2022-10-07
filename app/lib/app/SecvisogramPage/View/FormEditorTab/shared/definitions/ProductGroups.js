import React from 'react'
import ArrayContainer from '../ArrayContainer.js'
import IdAttribute from '../IdAttribute.js'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../shared/types').ValidationError[]
 *  instancePath: string
 *  label?: string
 *  description?: string
 *  onUpdate(instancePath: string, update: {}): void
 *  onCollectGroupIds(): Promise<void | {id: string, name: string}[]>
 * }} props
 */
export default function ProductGroups({
  label = 'List of product_group_ids',
  description = 'Specifies a list of product_group_ids to give context to the parent item.',
  onCollectGroupIds,
  ...props
}) {
  return (
    <ArrayContainer
      {...props}
      label={label}
      description={description}
      defaultItemValue={() => ''}
    >
      {(productGroupIdItemProps) => (
        <IdAttribute
          {...productGroupIdItemProps}
          label="Reference token for product group instance"
          description="Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document."
          placeholder="CSAFGID-0001"
          onCollectIds={onCollectGroupIds}
          deletable
        />
      )}
    </ArrayContainer>
  )
}
