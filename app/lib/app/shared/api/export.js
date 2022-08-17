import APIRequest from '../ApiRequest.js'

/**
 * @param {string} advisoryId
 * @param {string} format
 */
export async function getExport(advisoryId, format) {
  const exportUrl = `/api/v1/advisories/${advisoryId}/csaf?format=${format}`
  try {
    const response = await new APIRequest(new Request(exportUrl)).send()
    return await response.text()
  } catch (error) {
    console.info('Export failed')
    console.log('Error:')
    console.log(error)
    return ''
  }
}
