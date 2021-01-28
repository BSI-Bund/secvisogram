import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import DefaultButton from '../../shared/DefaultButton'

/**
 * @param {{
    array?: Array<any>
    onUpdate({}): void
    children(
      props: {
        value: any
        index: number
        onUpdate(data: {}): void
      }
    ): JSX.Element
  }} props
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
