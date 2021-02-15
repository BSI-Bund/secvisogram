import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'
import Container from './shared/Container'

/** @type {import('../../../../SecvisogramPage').ValidationError[]} */
const EMPTY_ARRAY = []

/**
 * @param {{
 *   value: unknown
 *   dataPath: string
 *   label: string
 *   description: string
 *   expand?: boolean
 *   validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *   defaultItemValue(): V
 *   onUpdate({}): void
 *   children(
 *     props: {
 *       dataPath: string
 *       value: unknown
 *       index: number
 *       expand?: boolean
 *       validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *       defaultValue(): V
 *       onUpdate({}): void
 *     }
 *   ): JSX.Element
 * }} props
 * @template V
 */
export default function ArrayContainer({ children, ...props }) {
  const parsedDataPath = React.useMemo(() => parse(props.dataPath), [
    props.dataPath,
  ])

  /**
   * @param {unknown} v
   * @returns {v is Array<unknown>}
   */
  const isValid = (v) => Array.isArray(v)
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
                expand: props.expand,
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
                const update = {}
                set(update, parsedDataPath, {
                  $push: [props.defaultItemValue()],
                })
                props.onUpdate(update)
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
