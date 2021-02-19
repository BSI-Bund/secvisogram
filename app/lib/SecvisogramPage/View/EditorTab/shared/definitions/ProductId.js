import React from 'react'
import TextAttribute from '../TextAttribute'

/**
 * @param {{
 *   value: unknown
 *   validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *   dataPath: string
 *   deletable?: boolean
 *   onUpdate({}): void
 * }} props
 */
export default function ProductId(props) {
  return (
    <TextAttribute
      {...props}
      label="Reference token for product instance"
      description="Token required to identify a full_product_name so that it can be referred to from other parts in the document. There is no predefined or required format for the product_id as long as it uniquely identifies a product in the context of the current document."
      placeholder="CSAFPID-0004 ..."
    />
  )
}
