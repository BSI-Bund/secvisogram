import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parse } from 'json-pointer'
import { set } from 'lodash'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'

/**
 * @param {{
 *  array?: Array<V>
 *  dataPath: string
 *  onUpdate({}): void
 *  children(
 *    props: {
 *      value: V
 *      index: number
 *    }
 *  ): JSX.Element
 * }} props
 * @template V
 */
export default function AttributeArray({
  array,
  dataPath,
  children,
  ...props
}) {
  const parsedDataPath = React.useMemo(() => parse(dataPath), [dataPath])
  /**
   * @param {{}} data
   */
  const onUpdate = (data) => {
    const update = {}
    set(update, parsedDataPath, data)
    props.onUpdate(update)
  }

  return (
    <>
      {array
        ? array.map((value, index) => (
            <div key={index} className="mt-2 first:mt-0">
              {children({
                value,
                index,
              })}
            </div>
          ))
        : null}
      <div className="mb-1">
        <DefaultButton
          onClick={() => {
            onUpdate({
              $push: [''],
            })
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </DefaultButton>
      </div>
    </>
  )
}
