import React from 'react'
import ObjectContainer from '../ObjectContainer'
import TextAttribute from '../TextAttribute'
import { uniqueProductId } from '../unique-id'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate(dataPath: string, update: {}): void
 *  productName?: string
 *  onCollectProductIds?(): Promise<void | {ids: Map<string, string>}>
 *  productReference?: string
 *  relatesToProductReference?: string
 *  relationshipType?: string
 * }} props
 */
export default function FullProductName({
  productReference = '',
  relatesToProductReference = '',
  relationshipType = '',
  onCollectProductIds,
  productName,
  ...props
}) {
  const [suggestedProductName, setSuggestedProductName] = React.useState('')

  React.useEffect(() => {
    if (productName) setSuggestedProductName(productName)
    if (onCollectProductIds) {
      onCollectProductIds().then((map) => {
        if (map) {
          const productReferenceName = map.ids.get(productReference) ?? ''
          const relatesToProductReferenceName =
            map.ids.get(relatesToProductReference) ?? ''
          setSuggestedProductName(
            `${productReferenceName} ${relationshipType.replaceAll(
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
    relationshipType,
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
            label="Textual description of the product"
            description="The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document."
            placeholder="Microsoft Host Integration Server 2006 Service Pack 1 ..."
          />
          <TextAttribute
            {...fullProductNameProps('name')}
            label="Textual description of the product"
            description="The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document."
            placeholder="Microsoft Host Integration Server 2006 Service Pack 1 ..."
          />
          <TextAttribute
            {...fullProductNameProps('cpe')}
            label="Common Platform Enumeration representation"
            description="The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification."
            pattern="^cpe:(/|\\d+\\.\\d+)[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*$"
            placeholder="^cpe:(/|\\d+\\.\\d+)[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*$"
            minLength={5}
            deletable
          />
        </>
      )}
    </ObjectContainer>
  )
}
