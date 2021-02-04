import React from 'react'
import ArrayContainer from '../ArrayContainer'
import ProductGroupId from './ProductGroupId'

/**
 * @param {{
 *   value: unknown
 *   validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   label?: string
 *   description?: string
 *   onUpdate({}): void
 * }} props
 */
export default function ProductGroups({
  label = 'List of product_group_ids',
  description = 'Specifies a list of product_group_ids to give context to the parent item.',
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
        <ProductGroupId {...productGroupIdItemProps} />
      )}
    </ArrayContainer>
  )
}
