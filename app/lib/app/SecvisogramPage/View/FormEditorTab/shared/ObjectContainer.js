import { parse } from 'json-pointer'
import React from 'react'
import Container from './shared/Container.js'

/** @type {import('../../../shared/types').ValidationError[]} */
const EMPTY_ARRAY = []

/**
 * @typedef {Object} ChildProps
 * @property {unknown} value
 * @property {string} instancePath
 * @property {import('../../../shared/types').ValidationError[]} validationErrors
 * @property {(instancePath: string, update: {}) => void} onUpdate
 */

/**
 * Calculates the child props.
 *
 * @param {{
 *  value: unknown
 *  label: string
 *  description: string
 *  deletable?: boolean
 *  collapsible?: boolean
 *  validationErrors: import('../../../shared/types').ValidationError[]
 *  instancePath: string
 *  defaultValue?(): {}
 *  onDelete?(): void
 *  onUpdate: (instancePath: string, update: {}) => void
 *  children(props: (attributeName: string) => ChildProps): React.ReactNode;
 * }} props
 */
export default function ObjectContainer(props) {
  /**
   * @param {unknown} v
   * @returns {v is { [key: string]: unknown }}
   */
  const isValid = (v) =>
    Boolean(v && typeof v === 'object' && !Array.isArray(v))

  /**
   * Is a memoized map of all validation errors for its children.
   */
  const validationErrorCache = React.useMemo(() => {
    /** @type {Map<string, import('../../../shared/types').ValidationError[]>} */
    const c = new Map()
    for (const e of props.validationErrors) {
      if (e.instancePath.startsWith(props.instancePath + '/')) {
        const attributeName = parse(e.instancePath)[
          parse(props.instancePath).length
        ]
        c.set(attributeName, (c.get(attributeName) ?? []).concat([e]))
      }
    }
    return c
  }, [props.instancePath, props.validationErrors])

  return (
    <Container {...props} isValid={isValid}>
      {(childProps) =>
        props.children((attributeName) => ({
          ...childProps,
          instancePath: `${props.instancePath}/${attributeName}`,
          value: childProps.value[attributeName],
          onUpdate: props.onUpdate,
          validationErrors:
            validationErrorCache.get(attributeName) ?? EMPTY_ARRAY,
        }))
      }
    </Container>
  )
}
