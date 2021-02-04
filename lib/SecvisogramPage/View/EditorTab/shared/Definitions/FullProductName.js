import React from 'react'
import ObjectContainer from '../ObjectContainer'
import TextAttribute from '../TextAttribute'
import ProductId from './ProductId'

/**
 * @param {{
 *   value: unknown
 *   validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   onUpdate({}): void
 * }} props
 */
export default function FullProductName({
  value: itemValue,
  validationErrors,
  dataPath: itemDataPath,
  onUpdate,
}) {
  return (
    <ObjectContainer
      label="Full product name"
      description="Specifies information about the product and assigns the product_id."
      dataPath={itemDataPath}
      defaultValue={() => ({})}
      validationErrors={validationErrors}
      value={itemValue}
      onUpdate={onUpdate}
    >
      {({ value: branch }) => (
        <>
          <ProductId
            dataPath={`${itemDataPath}/product_id`}
            value={branch.product_id}
            validationErrors={validationErrors}
            onUpdate={onUpdate}
          />
          <TextAttribute
            label="Textual description of the product"
            description="The value should be the product’s full canonical name, including version number and other attributes, as it would be used in a human-friendly document."
            value={branch.name}
            dataPath={`${itemDataPath}/name`}
            placeholder="Microsoft Host Integration Server 2006 Service Pack 1 ..."
            validationErrors={validationErrors}
            onUpdate={onUpdate}
          />
          <TextAttribute
            label="Common Platform Enumeration representation"
            description="The Common Platform Enumeration (CPE) attribute refers to a method for naming platforms external to this specification."
            value={branch.cpe}
            dataPath={`${itemDataPath}/cpe`}
            validationErrors={validationErrors}
            pattern="^cpe:(/|\\d+\\.\\d+)[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*:?[^:]*$"
            minLength={5}
            onUpdate={onUpdate}
          />
        </>
      )}
    </ObjectContainer>
  )
}
