import React from 'react'

/**
 * This hook allows you to debounce any fast changing value.
 * @see https://usehooks.com/useDebounce/
 *
 * @param {T} value
 * @param {number} [delay]
 * @returns {T}
 * @template T
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
