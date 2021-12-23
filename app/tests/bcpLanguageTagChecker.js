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
    'de-Adlm-AD-1996',
    'qaa',
    'qaa-Qaaa',
    'qaa-Qaaa-QM',
  ]

  correctLanguageTags.forEach((correctLanguageTag) => {
    test(`"${correctLanguageTag}" is a valid language tag`, function () {
      expect(bcpLanguageTagChecker(correctLanguageTag)).to.be.true
    })
  })

  const incorrectLanguageTags = [
    'ez',
    'ads-aeb',
    'de-Adlm-AD-1694acad',
    'eo-arkaika-arkaika',
    'de-DE-1901-1901',
    'abx-u-mingo-u-mingo',
    'abx-i-mingo',
  ]

  incorrectLanguageTags.forEach((incorrectLanguageTag) => {
    test(`"${incorrectLanguageTag}" is not a valid language tag`, function () {
      expect(bcpLanguageTagChecker(incorrectLanguageTag)).to.be.false
    })
  })
})
