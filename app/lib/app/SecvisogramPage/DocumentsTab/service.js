import APIRequest from '../../shared/APIRequest.js'

export async function getData() {
  const res = await new APIRequest(new Request('/api/2.0/advisories/'))
    .produces('application/json')
    .send()
  const advisories = await res.json()
  return { advisories }
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 */
export async function deleteAdvisory({ advisoryId }) {
  const advisoryDetail = await (
    await new APIRequest(
      new Request(`/api/2.0/advisories/${advisoryId}/`)
    ).send()
  ).json()
  const deleteURL = new URL(
    `/api/2.0/advisories/${advisoryId}/`,
    window.location.href
  )
  deleteURL.searchParams.set('revision', advisoryDetail.revision)
  await new APIRequest(
    new Request(deleteURL.toString(), { method: 'DELETE' })
  ).send()
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @returns
 */
export async function loadAdvisory({ advisoryId }) {
  const advisoryJSONRes = await new APIRequest(
    new Request(`/api/2.0/advisories/${advisoryId}/`)
  ).send()
  /** @type {{ csaf: string }} */
  const advisory = await advisoryJSONRes.json()
  return {
    ...advisory,
    csaf: JSON.parse(advisory.csaf),
  }
}
