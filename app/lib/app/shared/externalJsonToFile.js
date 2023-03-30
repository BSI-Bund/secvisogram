/**
 * @param {string} url
 * @returns {Promise<File>}
 */
export default function externalJsonToFile(url) {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => {
      return new File([JSON.stringify(json)], '', {
        type: 'application/json',
      })
    })
}
