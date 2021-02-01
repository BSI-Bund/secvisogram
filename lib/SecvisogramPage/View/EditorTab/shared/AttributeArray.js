import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'

/**
 * @param {{
 *   array?: Array<V>
 *   onUpdate({}): void
 *   children(
 *     props: {
 *       value: V
 *       index: number
 *       onUpdate(data: {}): void
 *       onDelete(): void
 *     }
 *   ): JSX.Element
 * }} props
 * @template V
 */
export default function AttributeArray({ array, onUpdate, children }) {
  return (
    <>
      {array
        ? array.map((value, index) => (
            <div key={index} className="mt-2 first:mt-0">
              {children({
                value,
                index,
                onUpdate(data) {
                  onUpdate({ [index]: data })
                },
                onDelete() {
                  onUpdate({ $splice: [[index, 1]] })
                },
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
