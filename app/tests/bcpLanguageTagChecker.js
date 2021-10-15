import { expect } from 'chai'
import bcpLanguageTagChecker from '../lib/shared/bcpLanguageTagChecker'

suite('bcpLanguageTagChecker', function () {
  const correctLanguageTags = [
    'aa-DE',
    'sjo-Sora-AN',
    'sjo-SoRa-AN',
    'sry-Visp',
    'tig-x-Y',
    'eo-arkaika',
    'de-1996',
    'i-DeFaULt',
  ]

  correctLanguageTags.forEach((correctLanguageTag) => {
    test(`"${correctLanguageTag}" is a valid language tag`, function () {
      expect(bcpLanguageTagChecker(correctLanguageTag)).to.be.true
    })
  })

  const incorrectLanguageTags = ['ez']

  incorrectLanguageTags.forEach((incorrectLanguageTag) => {
    test(`"${incorrectLanguageTag}" is not a valid language tag`, function () {
      expect(bcpLanguageTagChecker(incorrectLanguageTag)).to.be.false
    })
  })
})
