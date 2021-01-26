import React from 'react'

/**
 * @param {{
 *   value: V
 *   children(
 *     props: {
 *       value: V
 *       message: string
 *       ref: React.MutableRefObject<T>
 *     }
 *   ): JSX.Element
 * }} props
 * @template V
 * @template {HTMLInputElement | HTMLTextAreaElement} T
 */
export default function Input({ value, children }) {
  const ref = /** @type {React.MutableRefObject<T>} */ (React.useRef())
  const [{ message }, setState] = React.useState({
    message: '',
  })

  React.useEffect(() => {
    setTimeout(() => {
      setState((state) => ({
        ...state,
        message: ref.current.validationMessage,
      }))
    }, 0)
  }, [value])

  return children({ value, message, ref })
}
