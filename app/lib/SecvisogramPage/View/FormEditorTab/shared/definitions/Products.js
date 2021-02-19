import React from 'react'
import ArrayContainer from '../ArrayContainer'
import ProductId from './ProductId'

/**
 * @param {{
 *   value: unknown
 *   validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   label?: string
 *   description?: string
 *   onUpdate(dataPath: string, update: {}): void
 * }} props
 */
export default function Products({
  label = 'List of product_ids',
  description = 'Specifies a list of product_ids to give context to the parent item.',
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
        <ProductId {...productStatusItemProps} deletable />
      )}
    </ArrayContainer>
  )
}
