import DropdownAttribute from '../DropdownAttribute.js'
import React from 'react'

const firstCharCapital = (/** @type {string} */ s) =>
  s.charAt(0).toUpperCase() + s.substring(1)

/**
 *
 * @param {string[]} instancePath
 * @param {string} child
 * @param {string} value
 * @param {string[]} options
 * @param {import('../../../../shared/types').Property} property
 * @param {boolean} disabled
 * @param {boolean} disableClearable
 */
function cvssDropdown(
  instancePath,
  child,
  value,
  options,
  property,
  disabled,
  disableClearable = true
) {
  return (
    <DropdownAttribute
      label={firstCharCapital(child)}
      description=""
      options={options}
      isEnum={true}
      instancePath={[...instancePath, child]}
      value={value}
      property={property}
      disabled={disabled}
      disableClearable={disableClearable}
    />
  )
}

function getSeverityColors(/** @type {number} */ score) {
  if (score >= 0.1 && score <= 3.9) {
    return 'border-green-800 bg-green-600/75'
  } else if (score >= 4.0 && score <= 6.9) {
    return 'border-yellow-800 bg-yellow-600/75'
  } else if (score >= 7.0 && score <= 8.9) {
    return 'border-red-200 bg-red-100/75'
  } else if (score >= 9.0) {
    return 'border-red-800 bg-red-600/75'
  } else {
    return ''
  }
}

export { cvssDropdown, getSeverityColors }
