import bcp47 from 'bcp47'
import extensions from './bcpLanguageTagChecker/extensions.json'
import icann from './bcpLanguageTagChecker/subtags.json'

const extensionIdentifierSet = new Set(extensions.map((e) => e.identifier))

/**
 * @param {string} tag
 */
export default function (tag) {
  const parsed = bcp47.parse(tag)

  return (
    parsed !== null &&
    (parsed.langtag.language.language === null ||
      icann.subtags.some((s) => {
        return (
          s.type === 'language' &&
          stringMatchesSubtag(
            /** @type {string} */ (parsed.langtag.language.language),
            s.subtag
          )
        )
      })) &&
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
          s.type === 'script' &&
          stringMatchesSubtag(
            /** @type {string} */ (parsed.langtag.script),
            s.subtag
          )
      )) &&
    (parsed.langtag.region === null ||
      icann.subtags.some(
        (s) =>
          s.type === 'region' &&
          stringMatchesSubtag(
            /** @type {string} */ (parsed.langtag.region),
            s.subtag
          )
      )) &&
    parsed.langtag.variant.every((variant) =>
      icann.subtags.some(
        (s) =>
          s.subtag.toLowerCase() === variant.toLowerCase() &&
          s.type === 'variant' &&
          s.prefix === parsed.langtag.language.language?.toLowerCase()
      )
    ) &&
    parsed.langtag.variant.filter(
      (item, index) => parsed.langtag.variant.indexOf(item) !== index
    ).length === 0 &&
    parsed.langtag.extension.filter(
      (extension, index) =>
        parsed.langtag.extension.findIndex(
          (e) => e.singleton === extension.singleton
        ) !== index
    ).length === 0 &&
    parsed.langtag.extension.every((extension) =>
      extensionIdentifierSet.has(extension.singleton)
    )
  )
}

/**
 * @param {string} str
 * @param {string} subtag
 * @returns
 */
function stringMatchesSubtag(str, subtag) {
  const tag = /** @type {string} */ (str).toLowerCase()
  const rangeMatch = subtag.match(/^([a-zA-Z]+)\.\.([a-zA-Z]+)$/)
  if (rangeMatch) {
    return (
      rangeMatch[1].toLowerCase() <= tag && tag <= rangeMatch[2].toLowerCase()
    )
  }
  return subtag.toLowerCase() === tag
}
