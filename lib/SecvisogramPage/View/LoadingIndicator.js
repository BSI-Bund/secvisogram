import React from 'react'

/**
 * @param {{
   label: string
  }} props
 */
export default function LoadingIndicator({ label }) {
  return (
    <>
      <div className="py-4 mx-auto text-center">
        <div className="pb-2 text-gray-400">{label}</div>
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}
