import React from 'react'
import TextAttribute from '../TextAttribute'

/**
 * @param {{
 *  value: unknown
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Version(props) {
  return (
    <TextAttribute
      {...props}
      label="Version"
      description="Specifies a version string with a simple hierarchical counter model to denote clearly the evolution of the content of the document. Format must be understood as 'major[.minor[.patch[.build]]]' version."
      pattern="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
      placeholder="^(0|[1-9][0-9]*)(\.(0|[1-9][0-9]*)){0,3}$"
    />
  )
}
