import React from 'react'
import ArrayContainer from './shared/ArrayContainer.js'
import { Branches, FullProductName } from './shared/definitions.js'
import EnumAttribute from './shared/EnumAttribute.js'
import IdAttribute from './shared/IdAttribute.js'
import ObjectContainer from './shared/ObjectContainer.js'
import TextAttribute from './shared/TextAttribute.js'
import { uniqueGroupId, uniqueProductId } from './shared/unique-id.js'
import validationErrorShallowEqual from './shared/validationErrorShallowEqual.js'

export default React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../shared/types').ValidationError[]
   *  instancePath: string
   *  onUpdate(instancePath: string, update: {}): void
   *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
   * }} props
   */
  function ProductTree(props) {
    const {
      value: productTree,
      validationErrors,
      instancePath,
      onUpdate,
      onCollectProductIds,
    } = props
    return (
      <ObjectContainer
        label="Product tree"
        description="Is a container for all fully qualified product names that can be referenced elsewhere in the document."
        validationErrors={validationErrors}
        instancePath={instancePath}
        value={productTree}
        defaultValue={() => ({})}
        onUpdate={onUpdate}
      >
        {(productTreeProps) => (
          <>
            <Branches {...productTreeProps('branches')} />
            <FullProductNames {...productTreeProps('full_product_names')} />
            <ProductGroups
              {...productTreeProps('product_groups')}
              onCollectProductIds={onCollectProductIds}
            />
            <Relationships
              {...productTreeProps('relationships')}
              onCollectProductIds={onCollectProductIds}
            />
          </>
        )}
      </ObjectContainer>
    )
  },
  validationErrorShallowEqual
)

const ProductGroups = React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../shared/types').ValidationError[]
   *  instancePath: string
   *  onUpdate(instancePath: string, update: {}): void
   *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
   * }} props
   */
  function ProductGroups({ onCollectProductIds, ...props }) {
    return (
      <ArrayContainer
        {...props}
        label="List of product groups"
        description="Contains a list of product groups."
        defaultItemValue={() => ({
          group_id: uniqueGroupId(),
          product_ids: ['', ''],
        })}
      >
        {(itemProps) => (
          <ObjectContainer
            {...itemProps}
            label="Product group"
            description="Defines a new logical group of products that can then be referred to in other parts of the document to address a group of products with a single identifier."
          >
            {(productGroupProps) => (
              <>
                <TextAttribute
                  {...productGroupProps('summary')}
                  label="Summary of the product group"
                  description="Gives a short, optional description of the group."
                  deletable
                />
                <TextAttribute
                  {...productGroupProps('group_id')}
                  label="Reference token for product group instance"
                  description="Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document."
                  placeholder="CSAFGID-0001"
                />
                <ArrayContainer
                  {...productGroupProps('product_ids')}
                  label="List of Product IDs"
                  description="Lists the product_ids of those products which known as one group in the document."
                  defaultItemValue={() => ''}
                >
                  {(productIdProps) => (
                    <IdAttribute
                      {...productIdProps}
                      label="Reference token for product instance"
                      description="Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document."
                      placeholder="CSAFPID-0004 ..."
                      deletable
                      onCollectIds={onCollectProductIds}
                    />
                  )}
                </ArrayContainer>
              </>
            )}
          </ObjectContainer>
        )}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)

const FullProductNames = React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../shared/types').ValidationError[]
   *  instancePath: string
   *  onUpdate(instancePath: string, update: {}): void
   * }} props
   */
  function FullProductNames(props) {
    return (
      <ArrayContainer
        {...props}
        label="List of full product names"
        description="Contains a list of full product names."
        defaultItemValue={() => ({
          product_id: uniqueProductId(),
          name: '',
        })}
      >
        {(fullProductNameItemProps) => (
          <FullProductName {...fullProductNameItemProps} />
        )}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)

const Relationships = React.memo(
  /**
   * @param {{
   *  value: unknown
   *  validationErrors: import('../../shared/types').ValidationError[]
   *  instancePath: string
   *  onUpdate(instancePath: string, update: {}): void
   *  onCollectProductIds(): Promise<void | {id: string, name: string}[]>
   * }} props
   */
  function Relationships({ onCollectProductIds, ...props }) {
    return (
      <ArrayContainer
        {...props}
        label="List of relationships"
        description="Contains a list of relationships."
        defaultItemValue={() => ({
          full_product_name: { name: '', product_id: uniqueProductId() },
          product_reference: '',
          category: '',
          relates_to_product_reference: '',
        })}
      >
        {(relationshipItemProps) => (
          <ObjectContainer
            {...relationshipItemProps}
            label="Relationship"
            description="Establishes a link between two existing full_product_name_t elements, allowing the document producer to define a combination of two products that form a new full_product_name entry."
          >
            {(relationshipProps) => {
              const productReference = /** @type {string} */ (
                relationshipProps('product_reference').value ?? ''
              )
              const relatesToProductReference = /** @type {string} */ (
                relationshipProps('relates_to_product_reference').value ?? ''
              )
              const category = /** @type {string} */ (
                relationshipProps('category').value ?? ''
              )
              return (
                <>
                  <FullProductName
                    {...relationshipProps('full_product_name')}
                    onCollectProductIds={onCollectProductIds}
                    productReference={productReference}
                    category={category}
                    relatesToProductReference={relatesToProductReference}
                  />
                  <IdAttribute
                    {...relationshipProps('product_reference')}
                    label="Product reference"
                    description="Holds a Product ID that refers to the Full Product Name element, which is referenced as the first element of the relationship."
                    placeholder="CSAFPID-0004 ..."
                    onCollectIds={onCollectProductIds}
                  />
                  <EnumAttribute
                    {...relationshipProps('category')}
                    label="Relationship category"
                    description="Defines the category of relationship for the referenced component."
                    options={[
                      'default_component_of',
                      'optional_component_of',
                      'external_component_of',
                      'installed_on',
                      'installed_with',
                    ]}
                  />
                  <IdAttribute
                    {...relationshipProps('relates_to_product_reference')}
                    label="Relates to product reference"
                    description="Holds a Product ID that refers to the Full Product Name element, which is referenced as the second element of the relationship."
                    placeholder="CSAFPID-0004 ..."
                    onCollectIds={onCollectProductIds}
                  />
                </>
              )
            }}
          </ObjectContainer>
        )}
      </ArrayContainer>
    )
  },
  validationErrorShallowEqual
)
