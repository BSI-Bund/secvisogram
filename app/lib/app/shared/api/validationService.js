import APIRequest from '../APIRequest.js'

/**
 * @param {string} validatorUrl
 * @param {object} params
 * @param {{}} params.csaf
 * @returns
 */
export async function validateCSAF(validatorUrl, { csaf }) {
  const validateResponse = await new APIRequest(
    new Request(validatorUrl + '/api/v1/validate', { method: 'POST' })
  )
    .jsonRequestBody({
      tests: [
        { type: 'test', name: 'csaf_2_0_strict' },
        { type: 'preset', name: 'mandatory' },
        { type: 'preset', name: 'optional' },
        { type: 'preset', name: 'informative' },
      ],
      document: csaf,
    })
    .produces('application/json')
    .send()

  /**
   * @type {{ tests: Array<{ errors: Array<{ instancePath: string; message: string }>; warnings: Array<{ instancePath: string; message: string }>; infos: Array<{ instancePath: string; message: string }> }> }}
   */
  const json = await validateResponse.json()
  return json
}
