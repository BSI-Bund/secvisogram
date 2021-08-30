import React from 'react'
import TextAttribute from '../TextAttribute'

/**
 * @param {{
 *  label?: string
 *  description?: string
 *  value: unknown
 *  deletable?: boolean
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  instancePath: string
 *  onUpdate(instancePath: string, update: {}): void
 * }} props
 */
export default function Lang({
  label = 'Language type',
  description = 'Identifies a language, corresponding to IETF BCP 47 / RFC 5646. See IETF language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry',
  deletable,
  ...props
}) {
  return (
    <TextAttribute
      {...props}
      label={label}
      description={description}
      deletable={deletable}
      pattern="^[a-zA-Z]{2,3}(-.+)?$"
      placeholder="^[a-zA-Z]{2,3}(-.+)?$"
    />
  )
}
