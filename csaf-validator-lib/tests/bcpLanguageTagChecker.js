import chai from 'chai'
import bcpLanguageTagChecker, {
  isPrivateLanguage,
} from '../lib/shared/bcpLanguageTagChecker.js'

const { expect } = chai

describe('bcpLanguageTagChecker', function () {
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
    'az-baku1926',
    'ba-baku1926',
    'de-CH-1996',
    'pt-BR-abl1943',
    'ja-Latn-hepburn-heploc',
    'sl-rozaj-1994',
    'sl-rozaj-solba-1994',
    'sl-rozaj-biske-1994',
    'zh-gan',
  ]

  correctLanguageTags.forEach((correctLanguageTag) => {
    it(`"${correctLanguageTag}" is a valid language tag`, function () {
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
    'zh-gan-gan',
  ]

  incorrectLanguageTags.forEach((incorrectLanguageTag) => {
    it(`"${incorrectLanguageTag}" is not a valid language tag`, function () {
      expect(bcpLanguageTagChecker(incorrectLanguageTag)).to.be.false
    })
  })

  describe('isPrivateLanguage()', function () {
    const privateUseLanguages = ['qaa', 'qtx', 'qtz']

    privateUseLanguages.forEach((privateUseLanguages) => {
      it(`"${privateUseLanguages}" is a private language`, function () {
        expect(isPrivateLanguage(privateUseLanguages)).to.be.true
      })
    })
  })
})
