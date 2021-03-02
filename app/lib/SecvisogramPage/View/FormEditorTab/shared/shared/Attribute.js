import { compile, parse } from 'json-pointer'
import React from 'react'
import DefaultButton from '../../../shared/DefaultButton'
import AttributeErrors from '../AttributeErrors'

const numberRegExp = /^(0|[1-9][0-9]*)$/

/**
 * Abstracts the base functionality for all fields in the form editor.
 * It uses the data path to filter the associated validation errors.
 * Provides the functionality to add or remove itself.
 *
 * @param {{
 *  value: V
 *  label: string
 *  description: string
 *  defaultValue?(): string
 *  validationErrors: import('../../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  children?: React.ReactNode | ((params: { isInArray: boolean; onDelete(value: V): void; onChange(value: V, prevValue: V): void }) => React.ReactNode)
 *  canBeAdded?: boolean
 *  onUpdate(dataPath: string, update: {}): void
 *  onChange?(value: V, oldValue: V): void
 *  onDelete?(value: V): void
 * }} props
 * @template V
 */
export default function Attribute({
  value,
  label,
  description,
  defaultValue = () => '',
  validationErrors,
  dataPath,
  canBeAdded = true,
  children,
  ...props
}) {
  const localValidationErrors = validationErrors.filter(
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

  return (
    <section className="mb-2">
      {value != null ? (
        <label>
          <div
            className="mb-0.5 text-xs font-bold"
            id={dataPath}
            title={attributeName + ': ' + description}
          >
            {label}
          </div>
          {typeof children === 'function'
            ? children({
                isInArray,
                onChange(v, prevValue) {
                  props.onUpdate(dataPath, { $set: v })
                  props.onChange?.(v, prevValue)
                },
                onDelete(v) {
                  props.onUpdate(
                    compile(parsedDataPath.slice(0, -1)),
                    !isInArray
                      ? { $unset: [attributeName] }
                      : { $splice: [[Number(attributeName), 1]] }
                  )
                  props.onDelete?.(v)
                },
              })
            : children}
          <AttributeErrors validationErrors={localValidationErrors} />
        </label>
      ) : canBeAdded ? (
        <DefaultButton
          onClick={() => {
            props.onUpdate(dataPath, {
              $set: defaultValue(),
            })
          }}
        >
          {"Add '" + label + "'"}
        </DefaultButton>
      ) : null}
    </section>
  )
}
