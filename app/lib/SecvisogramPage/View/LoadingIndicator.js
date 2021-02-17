import React from 'react'

/**
 * @param {{
   label: string
  }} props
 */
export default function LoadingIndicator({ label }) {
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0">
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
    </div>
  )
}
