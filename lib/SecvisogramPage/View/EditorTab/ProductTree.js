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
          <Branches
            dataPath={`${dataPath}/branches`}
            value={productTreeProps.value.branches}
            validationErrors={validationErrors}
            onUpdate={onUpdate}
          />
          <ArrayContainer
            label="List of full product names"
            description="Contains a list of full product names."
            validationErrors={validationErrors}
            dataPath={`${dataPath}/full_product_names`}
            value={productTreeProps.value.full_product_names}
            defaultItemValue={() => ({})}
            onUpdate={onUpdate}
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
          <ProductGroups
            {...productTreeProps}
            dataPath={`${props.dataPath}/product_groups`}
            value={productTreeProps.value.product_groups}
          />
          <ArrayContainer
            {...productTreeProps}
            label="List of relationships"
            description="Contains a list of relationships."
            dataPath={`${productTreeProps.dataPath}/relationships`}
            value={productTreeProps.value.relationships}
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
                      {...relationshipProps}
                      dataPath={`${relationshipProps.dataPath}/full_product_name`}
                      value={relationshipProps.value.full_product_name}
                    />
                    <ProductId
                      {...relationshipProps}
                      dataPath={`${relationshipProps.dataPath}/product_reference`}
                      value={relationshipProps.value.product_reference}
                    />
                    <ProductId
                      {...relationshipProps}
                      dataPath={`${relationshipProps.dataPath}/relates_to_product_reference`}
                      value={
                        relationshipProps.value.relates_to_product_reference
                      }
                    />
                    <EnumAttribute
                      {...relationshipProps}
                      label="Relationship type"
                      description="Defines the type of relationship for the referenced component."
                      dataPath={`${relationshipProps.dataPath}/relationship_type`}
                      value={relationshipProps.value.relationship_type}
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
                {...productGroupProps}
                label="Summary of the product group"
                description="Gives a short, optional description of the group."
                dataPath={`${productGroupProps.dataPath}/summary`}
                value={productGroupProps.value.summary}
              />
              <ProductGroupId
                {...productGroupProps}
                dataPath={`${productGroupProps.dataPath}/group_id`}
                value={productGroupProps.value.group_id}
              />
              <ArrayContainer
                {...productGroupProps}
                label="List of Product IDs"
                description="Lists the product_ids of those products which known as one group in the document."
                dataPath={`${productGroupProps.dataPath}/product_ids`}
                value={productGroupProps.value.product_ids}
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
