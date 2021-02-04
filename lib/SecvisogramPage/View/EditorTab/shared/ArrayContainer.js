import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'
import Container from './shared/Container'

/**
 * @param {{
 *   value: unknown
 *   dataPath: string
 *   label: string
 *   description: string
 *   validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *   defaultItemValue(): unknown
 *   onUpdate({}): void
 *   children(
 *     props: {
 *       dataPath: string
 *       value: unknown
 *       index: number
 *     }
 *   ): JSX.Element
 * }} props
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
              })}
            </div>
          ))}
          <div className="mb-1">
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
