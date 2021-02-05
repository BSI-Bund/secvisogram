import React from 'react'
import TextAttribute from '../TextAttribute'

/** @todo Validation via subtags.json */

/**
 * @param {{
 *  label?: string
 *  description?: string
 *  value: unknown
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  onUpdate({}): void
 * }} props
 */
export default function Lang({
  label = 'Language type',
  description = 'Identifies a language, corresponding to IETF BCP 47 / RFC 5646. See IETF language registry: https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry',
  ...props
}) {
  return (
    <TextAttribute
      {...props}
      label={label}
      description={description}
      pattern="^[a-zA-Z]{2,3}(-.+)?$"
      placeholder="^[a-zA-Z]{2,3}(-.+)?$"
    />
  )
}
