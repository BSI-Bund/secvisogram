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
