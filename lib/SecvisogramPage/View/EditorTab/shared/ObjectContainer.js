import { parse } from 'json-pointer'
import React from 'react'
import Container from './shared/Container'

/** @type {import('../../../../SecvisogramPage').ValidationError[]} */
const EMPTY_ARRAY = []

/**
 * @param {{
 *  value: unknown
 *  label: string
 *  description: string
 *  deletable?: boolean
 *  collapsible?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  defaultValue?(): {}
 *  onUpdate: ((update: {}) => void) & ((dataPath: string, update: {}) => void)
 *  children(props: (attributeName: string) => { value: unknown; dataPath: string; validationErrors: import('../../../../shared/validationTypes').ValidationError[]; onUpdate: ((update: {}) => void) & ((dataPath: string, update: {}) => void) }): React.ReactNode;
 * }} props
 */
export default function ObjectContainer(props) {
  /**
   * @param {unknown} v
   * @returns {v is { [key: string]: unknown }}
   */
  const isValid = (v) =>
    Boolean(v && typeof v === 'object' && !Array.isArray(v))
  const validationErrorCache = React.useMemo(() => {
    /** @type {Map<string, import('../../../../SecvisogramPage').ValidationError[]>} */
    const c = new Map()
    for (const e of props.validationErrors) {
      if (e.dataPath.startsWith(props.dataPath + '/')) {
        const attributeName = parse(e.dataPath)[parse(props.dataPath).length]
        c.set(attributeName, (c.get(attributeName) ?? []).concat([e]))
      }
    }
    return c
  }, [props.dataPath, props.validationErrors])
  return (
    <Container {...props} isValid={isValid}>
      {(childProps) =>
        props.children((attributeName) => ({
          ...childProps,
          dataPath: `${props.dataPath}/${attributeName}`,
          value: childProps.value[attributeName],
          onUpdate: props.onUpdate,
          validationErrors:
            validationErrorCache.get(attributeName) ?? EMPTY_ARRAY,
        }))
      }
    </Container>
  )
}
