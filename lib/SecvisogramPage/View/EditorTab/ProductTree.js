import '@reach/combobox/styles.css'
import React from 'react'
import DocObject from './shared/DocObject'

/**
 * @param {{
 *  value?: {
 *  }
 *  validationErrors: import('../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function ProductTree({
  value: productTree,
  validationErrors,
  dataPath,
  onUpdate,
}) {
  return (
    <DocObject
      label="Product tree"
      description="Is a container for all fully qualified product names that can be referenced elsewhere in the document."
      validationErrors={validationErrors}
      dataPath={dataPath}
      object={productTree}
      defaultValue={() => ({})}
      onUpdate={onUpdate}
    >
      {productTree ? <></> : null}
    </DocObject>
  )
}
