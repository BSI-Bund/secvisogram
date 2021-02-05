import React from 'react'
import Container from './shared/Container'

/**
 * @param {{
 *  value: unknown
 *  label: string
 *  description: string
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  defaultValue(): {}
 *  onUpdate({}): void
 *  children(props: (attributeName: string) => { value: unknown; dataPath: string; validationErrors: import('../../../../shared/validationTypes').ValidationError[]; onUpdate({}): void }): React.ReactNode;
 * }} props
 */
export default function ObjectContainer(props) {
  /**
   * @param {unknown} v
   * @returns {v is { [key: string]: unknown }}
   */
  const isValid = (v) =>
    Boolean(v && typeof v === 'object' && !Array.isArray(v))
  return (
    <Container {...props} isValid={isValid}>
      {(childProps) =>
        props.children((attributeName) => ({
          ...childProps,
          dataPath: `${props.dataPath}/${attributeName}`,
          value: childProps.value[attributeName],
          onUpdate: props.onUpdate,
          validationErrors: props.validationErrors,
        }))
      }
    </Container>
  )
}
