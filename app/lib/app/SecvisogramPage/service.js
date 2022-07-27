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
  /** @type {{ csaf: {}; advisoryId: string; revision: string; documentTrackingId: string; changeable: boolean }} */
  const advisory = await advisoryJSONRes.json()
  return {
    ...advisory,
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

/**
 * @param {object} params
 * @param {{}} params.csaf
 */
export async function createAdvisory({ csaf }) {
  const res = await new APIRequest(
    new Request('/api/2.0/advisories', { method: 'POST' })
  )
    .jsonRequestBody(csaf)
    .send()

  /** @type {{ id: string; revision: string }} */
  const advisoryData = await res.json()
  return advisoryData
}
