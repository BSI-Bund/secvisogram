import '@reach/combobox/styles.css'
import React from 'react'
import ArrayContainer from './shared/ArrayContainer'
import Branches from './shared/Definitions/Branches'
import FullProductName from './shared/Definitions/FullProductName'
import ProductGroupId from './shared/Definitions/ProductGroupId'
import ProductId from './shared/Definitions/ProductId'
import EnumAttribute from './shared/EnumAttribute'
import ObjectContainer from './shared/ObjectContainer'
import TextAreaAttribute from './shared/TextAreaAttribute'

/**
 * @param {{
 *   value: unknown
 *   validationErrors: import('../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   onUpdate({}): void
 * }} props
 */
export default function ProductTree(props) {
  const { value: productTree, validationErrors, dataPath, onUpdate } = props
  return (
    <ObjectContainer
      label="Product tree"
      description="Is a container for all fully qualified product names that can be referenced elsewhere in the document."
      validationErrors={validationErrors}
      dataPath={dataPath}
      value={productTree}
      defaultValue={() => ({})}
      onUpdate={onUpdate}
    >
      {(productTreeProps) => (
        <>
          <Branches {...productTreeProps('branches')} />
          <ArrayContainer
            {...productTreeProps('full_product_names')}
            label="List of full product names"
            description="Contains a list of full product names."
            defaultItemValue={() => ({})}
          >
            {({ dataPath: itemDataPath, value: itemValue }) => (
              <FullProductName
                dataPath={itemDataPath}
                value={itemValue}
                validationErrors={validationErrors}
                onUpdate={onUpdate}
              />
            )}
          </ArrayContainer>
          <ProductGroups {...productTreeProps('product_groups')} />
          <ArrayContainer
            {...productTreeProps('relationships')}
            label="List of relationships"
            description="Contains a list of relationships."
            defaultItemValue={() => ({})}
          >
            {(relationshipItemProps) => (
              <ObjectContainer
                {...relationshipItemProps}
                label="Relationship"
                description="Establishes a link between two existing full_product_name_t elements, allowing the document producer to define a combination of two products that form a new full_product_name entry."
                defaultValue={() => ({})}
              >
                {(relationshipProps) => (
                  <>
                    <FullProductName
                      {...relationshipProps('full_product_name')}
                    />
                    <ProductId {...relationshipProps('product_reference')} />
                    <ProductId
                      {...relationshipProps('relates_to_product_reference')}
                    />
                    <EnumAttribute
                      {...relationshipProps('relationship_type')}
                      label="Relationship type"
                      description="Defines the type of relationship for the referenced component."
                      options={[
                        'default_component_of',
                        'optional_component_of',
                        'external_component_of',
                        'installed_on',
                        'installed_with',
                      ]}
                    />
                  </>
                )}
              </ObjectContainer>
            )}
          </ArrayContainer>
        </>
      )}
    </ObjectContainer>
  )
}

/**
 * @param {{
 *   value: unknown
 *   validationErrors: import('../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   onUpdate({}): void
 * }} props
 */
function ProductGroups({ ...props }) {
  return (
    <ArrayContainer
      {...props}
      label="List of product groups"
      description="Contains a list of product groups."
      defaultItemValue={() => ({})}
    >
      {(itemProps) => (
        <ObjectContainer
          {...itemProps}
          label="Product group"
          description="Defines a new logical group of products that can then be referred to in other parts of the document to address a group of products with a single identifier."
          defaultValue={() => ({})}
        >
          {(productGroupProps) => (
            <>
              <TextAreaAttribute
                {...productGroupProps('summary')}
                label="Summary of the product group"
                description="Gives a short, optional description of the group."
              />
              <ProductGroupId {...productGroupProps('group_id')} />
              <ArrayContainer
                {...productGroupProps('product_ids')}
                label="List of Product IDs"
                description="Lists the product_ids of those products which known as one group in the document."
                defaultItemValue={() => ''}
              >
                {(productIdProps) => <ProductId {...productIdProps} />}
              </ArrayContainer>
            </>
          )}
        </ObjectContainer>
      )}
    </ArrayContainer>
  )
}
