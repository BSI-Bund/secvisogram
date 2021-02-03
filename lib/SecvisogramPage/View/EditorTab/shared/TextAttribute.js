import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import Attribute from './Attribute'
import Delete from './Delete'

const numberRegExp = /^(0|[1-9][0-9]*)$/

/**
 * @param {Pick<React.HTMLProps<HTMLInputElement>, 'minLength'> & {
 *  label: string
 *  description: string
 *  placeholder?: string
 *  pattern?: string
 *  type?: string
 *  required?: boolean
 *  validationErrors: import('../../../../shared/validationTypes').ValidationError[]
 *  dataPath: string
 *  value: string
 *  onUpdate({}): void
 *  children?: React.ReactNode;
 * }} props
 */
export default function TextAttribute({
  label,
  description,
  placeholder,
  pattern,
  type = 'text',
  minLength,
  required,
  validationErrors,
  dataPath,
  value,
  children,
  ...props
}) {
  const parsedDataPath = React.useMemo(() => parse(dataPath), [dataPath])
  const attributeName = React.useMemo(
    () => parsedDataPath.slice().pop() ?? '',
    [parsedDataPath]
  )
  const isContainedInObject = React.useMemo(
    () => !attributeName.match(numberRegExp),
    [attributeName]
  )

  /**
   * @param {{}} data
   */
  const onUpdate = (data) => {
    const update = {}
    set(update, parsedDataPath, data)
    props.onUpdate(update)
  }

  return (
    <Attribute
      label={label}
      description={description}
      validationErrors={validationErrors}
      dataPath={dataPath}
      attributeName={attributeName}
      onUpdate={onUpdate}
      value={value}
    >
      <div className="max-w-md flex items-baseline justify-center">
        <div className="w-full">
          <input
            value={value}
            className="border p-2 w-full shadow-inner rounded"
            type={type}
            placeholder={placeholder}
            pattern={pattern}
            minLength={minLength}
            required={Boolean(minLength)}
            onChange={(e) => {
              onUpdate({ $set: e.target.value })
            }}
          />
        </div>
        {!required ? (
          <Delete
            doDelete={() => {
              const update = {}
              set(
                update,
                parsedDataPath.slice(0, -1),
                isContainedInObject
                  ? { $unset: [attributeName] }
                  : { $splice: [[Number(attributeName), 1]] }
              )
              props.onUpdate(update)
            }}
          />
        ) : (
          children
        )}
      </div>
    </Attribute>
  )
}
