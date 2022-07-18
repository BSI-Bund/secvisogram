import { request } from 'undici'

/**
 * @param {string} url
 * @param {() => void} onError
 */
export default async function testURL(url, onError) {
  try {
    const res = await request(url, {
      method: 'HEAD',
    })
    if (res.statusCode < 200 || 400 <= res.statusCode) {
      onError()
    }
  } catch (e) {
    onError()
  }
}
