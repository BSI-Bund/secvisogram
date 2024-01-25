import { expect } from 'chai'
import { compareZonedDateTimes } from '../lib/shared/dateHelper.js'

describe('dateHelper', function () {
  const date1 = '2023-11-06T13:00:00.000Z'
  const date2 = '2023-12-04T11:00:00.000Z'
  const invalidDate = '2023-12-04T11:00:00.000'

  it('equal dates', function () {
    expect(compareZonedDateTimes(date1, date1)).to.be.eq(0)
  })

  it('second date newer', function () {
    expect(compareZonedDateTimes(date1, date2)).to.be.eq(-1)
  })

  it('first date newer', function () {
    expect(compareZonedDateTimes(date2, date1)).to.be.eq(1)
  })

  it('first date invalid', function () {
    expect(compareZonedDateTimes(invalidDate, date1)).to.be.eq(0)
  })

  it('second date invalid', function () {
    expect(compareZonedDateTimes(date1, invalidDate)).to.be.eq(0)
  })

  it('both dates invalid', function () {
    expect(compareZonedDateTimes(invalidDate, invalidDate)).to.be.eq(0)
  })
})
