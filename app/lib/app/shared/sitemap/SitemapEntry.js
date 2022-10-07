/**
 * @template {string} Keys
 */
export default class SitemapEntry {
  /**
   * @param {string} path
   */
  constructor(path) {
    this.path = path
  }

  /**
   * @param {Array<[Keys, string]>} [searchParams]
   * @returns
   */
  href(searchParams = []) {
    const url = new URL(this.path, window.location.href)
    for (const [key, value] of searchParams) url.searchParams.append(key, value)
    return url.toString()
  }
}
