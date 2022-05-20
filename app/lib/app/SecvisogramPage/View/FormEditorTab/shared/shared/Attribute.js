import { compile, parse } from 'json-pointer'
import React from 'react'
import DefaultButton from '../../../shared/DefaultButton.js'
import AttributeErrors from '../AttributeErrors.js'

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
 *  validationErrors: import('../../../../shared/types').ValidationError[]
 *  instancePath: string
 *  children?: React.ReactNode | ((params: { isInArray: boolean; onDelete(value: V): void; onChange(value: V, prevValue: V): void }) => React.ReactNode)
 *  canBeAdded?: boolean
 *  onUpdate(instancePath: string, update: {}): void
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
  instancePath,
  canBeAdded = true,
  children,
  ...props
}) {
  const localValidationErrors = validationErrors.filter(
    (e) => e.instancePath === instancePath
  )
  const parsedInstancePath = React.useMemo(
    () => parse(instancePath),
    [instancePath]
  )
  const attributeName = React.useMemo(
    () => parsedInstancePath.slice().pop() ?? '',
    [parsedInstancePath]
  )
  const isInArray = React.useMemo(
    () => Boolean(attributeName.match(numberRegExp)),
    [attributeName]
  )

  return (
    <section className="mb-2" data-testid={`attribute-${instancePath}`}>
      {value != null ? (
        <label>
          <div
            className="mb-0.5 text-xs font-bold"
            id={instancePath}
            title={attributeName + ': ' + description}
          >
            {label}
          </div>
          {typeof children === 'function'
            ? children({
                isInArray,
                onChange(v, prevValue) {
                  props.onUpdate(instancePath, { $set: v })
                  props.onChange?.(v, prevValue)
                },
                onDelete(v) {
                  props.onUpdate(
                    compile(parsedInstancePath.slice(0, -1)),
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
            props.onUpdate(instancePath, {
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
