import shallow from 'shallowequal'

/**
 * @typedef {{
 *  validationErrors: import('../../../shared/types').ValidationError[]
 * }} Props
 */

/**
 * @param {Props} prevProps
 * @param {Props} nextProps
 */
export default function validationErrorShallowEqual(prevProps, nextProps) {
  if (shallow(prevProps, nextProps)) return true

  const { validationErrors: v1, ..._prevProps } = prevProps
  const { validationErrors: v2, ..._nextProps } = nextProps
  return (
    shallow(_prevProps, _nextProps) &&
    arrayEquals(
      v1.map((e) => `${e.instancePath}:${e.message}`),
      v2.map((e) => `${e.instancePath}:${e.message}`)
    )
  )
}

/**
 * @param {string[]} a
 * @param {string[]} b
 */
function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  )
}
