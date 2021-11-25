import bcp47 from 'bcp47'
import icann from './bcpLanguageTagChecker/subtags.json'

/**
 * @param {string} tag
 */
export default function (tag) {
  const parsed = bcp47.parse(tag)

  return (
    parsed !== null &&
    (parsed.langtag.language.language === null ||
      icann.subtags.some(
        (s) =>
          s.subtag.toLowerCase() ===
            parsed.langtag.language.language?.toLowerCase() &&
          s.type === 'language'
      )) &&
    parsed.langtag.language.extlang.every((extlang) =>
      icann.subtags.some(
        (s) =>
          s.subtag.toLowerCase() === extlang.toLowerCase() &&
          s.type === 'extlang' &&
          s.prefix === parsed.langtag.language.language?.toLowerCase()
      )
    ) &&
    (parsed.langtag.script === null ||
      icann.subtags.some(
        (s) =>
          s.subtag.toLowerCase() === parsed.langtag.script?.toLowerCase() &&
          s.type === 'script'
      )) &&
    (parsed.langtag.region === null ||
      icann.subtags.some(
        (s) =>
          s.subtag.toLowerCase() === parsed.langtag.region?.toLowerCase() &&
          s.type === 'region'
      )) &&
    parsed.langtag.variant.every((variant) =>
      icann.subtags.some(
        (s) =>
          s.subtag.toLowerCase() === variant.toLowerCase() &&
          s.type === 'variant' &&
          s.prefix === parsed.langtag.language.language?.toLowerCase()
      )
    )
  )
}
