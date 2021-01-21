import React from 'react'

/**
 * @param {Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> & {
 *   value: string | null
 *   onChange(str: string | null): void
 * }} props
 */
export default function DatePicker({ onChange, value, ...props }) {
  const date = React.useMemo(() => {
    if (!value) return ''
    const date = new Date(value)
    return (
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    )
  }, [value])

  return (
    <input
      {...props}
      className="w-full border p-2"
      type="date"
      value={date}
      onChange={(e) => {
        onChange(
          e.target.value
            ? new Date(`${e.target.value} 00:00`).toISOString()
            : ''
        )
      }}
    />
  )
}
