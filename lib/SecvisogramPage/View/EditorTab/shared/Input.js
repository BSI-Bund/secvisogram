import React from 'react'

/**
 * @param {{
 *   value: V
 *   children(
 *     props: {
 *       value: V
 *       message: string
 *       ref: React.MutableRefObject<HTMLInputElement>
 *     }
 *   ): JSX.Element
 * }} props
 * @template V
 */
export default function Input({ value, children }) {
  const ref = /** @type {React.MutableRefObject<HTMLInputElement>} */ (React.useRef())
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
