import React from 'react'
import ObjectContainer from '../ObjectContainer'
import TextAttribute from '../TextAttribute'
import ProductId from './ProductId'

/**
 * @param {{
 *   value: unknown
 *   validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   onUpdate(dataPath: string, update: {}): void
 * }} props
 */
export default function FullProductName(props) {
  return (
    <ObjectContainer
      {...props}
      label="Full product name"
      description="Specifies information about the product and assigns the product_id."
      defaultValue={() => ({
        product_id: '',
        name: '',
      })}
    >
      {(fullProductNameProps) => (
        <>
          <ProductId {...fullProductNameProps('product_id')} />
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
