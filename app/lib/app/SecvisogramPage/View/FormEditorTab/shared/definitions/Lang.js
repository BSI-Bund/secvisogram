import React from 'react'
import TextAttribute from '../TextAttribute.js'

/**
 * @param {{
 *  label?: string
 *  description?: string
 *  value: unknown
 *  deletable?: boolean
 *  validationErrors: import('../../../../shared/types').ValidationError[]
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
      pattern="^(([A-Za-z]{2,3}(-[A-Za-z]{3}(-[A-Za-z]{3}){0,2})?|[A-Za-z]{4,8})(-[A-Za-z]{4})?(-([A-Za-z]{2}|[0-9]{3}))?(-([A-Za-z0-9]{5,8}|[0-9][A-Za-z0-9]{3}))*(-[A-WY-Za-wy-z0-9](-[A-Za-z0-9]{2,8})+)*(-[Xx](-[A-Za-z0-9]{1,8})+)?|[Xx](-[A-Za-z0-9]{1,8})+|[Ii]-[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Ii]-[Mm][Ii][Nn][Gg][Oo])$"
      placeholder="en-US"
    />
  )
}
