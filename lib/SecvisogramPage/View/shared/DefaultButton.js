import React from 'react'

/**
 * @param {React.DetailedHTMLProps<
 *   React.ButtonHTMLAttributes<HTMLButtonElement>,
 *   HTMLButtonElement>
 * } props
 */
export default function DefaultButton(props) {
  return (
    <button
      className="border py-2 px-3 hover:bg-gray-200 rounded"
      type="button"
      {...props}
    />
  )
}
