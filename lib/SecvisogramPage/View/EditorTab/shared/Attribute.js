import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'
import AttributeErrors from './AttributeErrors'

const numberRegExp = /^(0|[1-9][0-9]*)$/

/**
 * @param {{
 *  value: V
 *  label: string
 *  description: string
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  attributeName?: string
 *  children?: React.ReactNode | ((params: { isInArray: boolean; onDelete(): void; onChange(value: V): void }) => React.ReactNode)
 *  onUpdate?({}): void
 *  onDocUpdate?({}): void
 * }} props
 * @template V
 */
export default function Attribute({
  value,
  label,
  description,
  dataPath,
  children,
  ...props
}) {
  const validationErrors = props.validationErrors.filter(
    (e) => e.dataPath === dataPath
  )
  const parsedDataPath = React.useMemo(() => parse(dataPath), [dataPath])
  const attributeName = React.useMemo(
    () => parsedDataPath.slice().pop() ?? '',
    [parsedDataPath]
  )
  const isInArray = React.useMemo(
    () => Boolean(attributeName.match(numberRegExp)),
    [attributeName]
  )

  /**
   * @param {{}} data
   */
  const onUpdate = (data) => {
    if (props.onDocUpdate) {
      const update = {}
      set(update, parsedDataPath, data)
      props.onDocUpdate(update)
    } else {
      props.onUpdate?.(data)
    }
  }

  return (
    <section className="mb-2">
      {value != null ? (
        <label>
          <div title={attributeName + ': ' + description}>{label}</div>
          {typeof children === 'function'
            ? children({
                isInArray,
                onChange(v) {
                  onUpdate({ $set: v })
                },
                onDelete() {
                  const update = {}
                  set(
                    update,
                    parsedDataPath.slice(0, -1),
                    !isInArray
                      ? { $unset: [attributeName] }
                      : { $splice: [[Number(attributeName), 1]] }
                  )
                  props.onDocUpdate?.(update)
                },
              })
            : children}
          <AttributeErrors validationErrors={validationErrors} />
        </label>
      ) : (
        <DefaultButton
          onClick={() => {
            onUpdate({
              $set: '',
            })
          }}
        >
          {"Add '" + label + "'"}
        </DefaultButton>
      )}
    </section>
  )
}
