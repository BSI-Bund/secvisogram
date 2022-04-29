import React from 'react'
import TextAttribute from '../TextAttribute.js'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../shared/types').ValidationError[]
 *  instancePath: string
 *  onUpdate(instancePath: string, update: {}): void
 * }} props
 */
export default function Version(props) {
  return (
    <TextAttribute
      {...props}
      label="Version"
      description="Specifies a version string to denote clearly the evolution of the content of the document. Format must be either integer or semantic versioning."
      pattern="^(0|[1-9][0-9]*)$|^((0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$"
      placeholder="^(0|[1-9][0-9]*)$|^((0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?)$"
    />
  )
}
