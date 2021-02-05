import React from 'react'
import TextAttribute from '../TextAttribute'

/**
 * @param {{
 *   deletable?: boolean
 *   value: unknown
 *   validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   onUpdate({}): void
 * }} props
 */
export default function ProductGroupId(props) {
  return (
    <TextAttribute
      {...props}
      label="Reference token for product group instance"
      description="Token required to identify a group of products so that it can be referred to from other parts in the document. There is no predefined or required format for the product_group_id as long as it uniquely identifies a group in the context of the current document."
      placeholder="CSAFGID-0001"
    />
  )
}
