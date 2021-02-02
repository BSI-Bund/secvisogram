import React from 'react'

const DatePicker = React.forwardRef(
  (
    /**
     * @type {Omit<React.HTMLProps<HTMLInputElement>, 'value' | 'onChange'> & {
     *   value: string | null
     *   onChange(str: string | null): void
     * }}
     */
    { onChange, value, ...props },
    ref
  ) => {
    const dateString = React.useMemo(() => {
      if (!value) return ''
      const date = new Date(value)
      return (
        date.getFullYear().toString().padStart(4, '0') +
        '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        date.getDate().toString().padStart(2, '0')
      )
    }, [value])

    return (
      <input
        {...props}
        ref={ref}
        className="border p-2 w-full shadow-inner rounded"
        type="date"
        value={dateString}
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
)

export default DatePicker
