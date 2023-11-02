import { Duration, ZonedDateTime } from '@js-joda/core'

/**
 * compare ZonedDateTimes from js-joda
 * @param {ZonedDateTime | string} a
 * @param {ZonedDateTime | string} b
 * @returns {0|1|-1}
 *
 */
export const compareZonedDateTimes = (a, b) => {
  const date1 = a instanceof ZonedDateTime ? a : ZonedDateTime.parse(a)
  const date2 = b instanceof ZonedDateTime ? b : ZonedDateTime.parse(b)
  const duration = Duration.between(date1, date2)

  // return number based on js sort function
  // > negative if a is less than b, positive if a is greater than b, and zero if they are equal.
  // [Sort Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#comparefn)
  if (duration.isZero()) {
    return 0
  } else if (duration.isNegative()) {
    return 1
  } else {
    return -1
  }
}
