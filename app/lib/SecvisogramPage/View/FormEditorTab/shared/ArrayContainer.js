import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'json-pointer'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'
import Container from './shared/Container'

/** @type {import('../../../../SecvisogramPage').ValidationError[]} */
const EMPTY_ARRAY = []

/**
 * @typedef {Object} ChildProps
 * @property {unknown} value
 * @property {number} index
 * @property {string} dataPath
 * @property {import('../../../../shared/validationTypes').ValidationError[]} validationErrors
 * @property {() => V} defaultValue
 * @property {(dataPath: string, update: {}) => void} onUpdate
 * @template V
 */

/**
 * Calculates the child props and provides controls to add new items.
 *
 * @param {{
 *   value: unknown
 *   dataPath: string
 *   label: string
 *   description: string
 *   collapsible?: boolean
 *   validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *   defaultItemValue(): V
 *   onUpdate(dataPath: string, update: {}): void
 *   onDelete?(): void
 *   children(props: ChildProps<V>): JSX.Element
 * }} props
 * @template V
 */
export default function ArrayContainer({ children, ...props }) {
  /**
   * @param {unknown} v
   * @returns {v is Array<unknown>}
   */
  const isValid = (v) => Array.isArray(v)

  /**
   * Is a memoized map of all validation errors for its children.
   */
  const validationErrorCache = React.useMemo(() => {
    /** @type {Map<number, import('../../../../SecvisogramPage').ValidationError[]>} */
    const c = new Map()
    for (const e of props.validationErrors) {
      if (e.dataPath.startsWith(props.dataPath + '/')) {
        const index = Number(parse(e.dataPath)[parse(props.dataPath).length])
        c.set(index, (c.get(index) ?? []).concat([e]))
      }
    }
    return c
  }, [props.dataPath, props.validationErrors])

  return (
    <Container
      {...props}
      defaultValue={() => [props.defaultItemValue()]}
      isValid={isValid}
    >
      {({ value: array }) => (
        <>
          {array.map((value, index) => (
            <div key={index} className="mt-2 first:mt-0">
              {children({
                dataPath: `${props.dataPath}/${index}`,
                value,
                index,
                onUpdate: props.onUpdate,
                defaultValue: props.defaultItemValue,
                validationErrors:
                  validationErrorCache.get(index) ?? EMPTY_ARRAY,
              })}
            </div>
          ))}
          <div className="mb-2">
            <DefaultButton
              onClick={() => {
                props.onUpdate(props.dataPath, {
                  $push: [props.defaultItemValue()],
                })
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
            </DefaultButton>
          </div>
        </>
      )}
    </Container>
  )
}
