import React from 'react'
import ObjectContainer from '../ObjectContainer.js'
import TextAttribute from '../TextAttribute.js'
import { uniqueProductId } from '../unique-id.js'
import ProductIdentificationHelper from './FullProductName/ProductIdentificationHelper.js'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../shared/types').ValidationError[]
 *  instancePath: string
 *  onUpdate(instancePath: string, update: {}): void
 *  productName?: string
 *  onCollectProductIds?(): Promise<void | {id: string, name: string}[]>
 *  productReference?: string
 *  category?: string
 *  relatesToProductReference?: string
 * }} props
 */
export default function FullProductName({
  productReference = '',
  relatesToProductReference = '',
  category = '',
  onCollectProductIds,
  productName,
  ...props
}) {
  const [suggestedProductName, setSuggestedProductName] = React.useState('')

  React.useEffect(() => {
    if (productName) setSuggestedProductName(productName)
    if (onCollectProductIds) {
      onCollectProductIds().then((entries) => {
        if (entries) {
          const productReferenceName =
            entries.find((e) => e.id === productReference)?.name ?? ''
          const relatesToProductReferenceName =
            entries.find((e) => e.id === relatesToProductReference)?.name ?? ''
          setSuggestedProductName(
            `${productReferenceName} ${category.replaceAll(
              '_',
              ' '
            )} ${relatesToProductReferenceName}`
          )
        }
      })
    }
  }, [
    productReference,
    onCollectProductIds,
    relatesToProductReference,
    category,
    productName,
  ])

  return (
    <ObjectContainer
      {...props}
      label="Full product name"
      description="Specifies information about the product and assigns the product_id."
      defaultValue={() => {
        return {
          product_id: uniqueProductId(),
          name: suggestedProductName,
        }
      }}
    >
      {(fullProductNameProps) => (
        <>
          <TextAttribute
            {...fullProductNameProps('product_id')}
            label="Reference token for product instance"
            description="Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document."
            placeholder="CSAFPID-0004"
          />
          <TextAttribute
            {...fullProductNameProps('name')}
            label="Textual description of the product"
            description="The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document."
            placeholder="Microsoft Host Integration Server 2006 Service Pack 1"
          />
          <ProductIdentificationHelper
            {...fullProductNameProps('product_identification_helper')}
          />
        </>
      )}
    </ObjectContainer>
  )
}
