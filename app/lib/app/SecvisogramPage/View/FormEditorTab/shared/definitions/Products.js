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
 *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
 * }} props
 */
export default function Products({
  label = 'List of product_ids',
  description = 'Specifies a list of product_ids to give context to the parent item.',
  onCollectProductIds,
  ...props
}) {
  return (
    <ArrayContainer
      {...props}
      label={label}
      description={description}
      defaultItemValue={() => ''}
    >
      {(productStatusItemProps) => (
        <IdAttribute
          {...productStatusItemProps}
          label="Reference token for product instance"
          description="Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document."
          placeholder="CSAFPID-0004 ..."
          onCollectIds={onCollectProductIds}
          deletable
        />
      )}
    </ArrayContainer>
  )
}
