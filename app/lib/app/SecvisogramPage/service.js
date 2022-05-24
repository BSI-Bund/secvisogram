import APIRequest from '../shared/APIRequest.js'

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @returns
 */
export async function loadAdvisory({ advisoryId }) {
  const advisoryJSONRes = await new APIRequest(
    new Request(`/api/2.0/advisories/${advisoryId}/`)
  ).send()
  /** @type {{ csaf: string; advisoryId: string; revision: string; documentTrackingId: string }} */
  const advisory = await advisoryJSONRes.json()
  return {
    ...advisory,
    csaf: JSON.parse(advisory.csaf),
  }
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} params.revision
 * @param {{}} params.csaf
 */
export async function updateAdvisory({ advisoryId, revision, csaf }) {
  const apiURL = new URL(
    `/api/2.0/advisories/${advisoryId}/`,
    window.location.href
  )
  apiURL.searchParams.set('revision', revision)
  await new APIRequest(
    new Request(apiURL.toString(), {
      method: 'PATCH',
    })
  )
    .jsonRequestBody(csaf)
    .send()
}
