import APIRequest from '../APIRequest.js'

/**
 * @param {object} params
 * @param {{}} params.csaf
 * @param {string} params.summary
 * @param {string} params.legacyVersion
 */
export async function createAdvisory({ csaf, summary, legacyVersion }) {
  const res = await new APIRequest(
    new Request('/api/2.0/advisories', { method: 'POST' })
  )
    .jsonRequestBody({ csaf, summary, legacyVersion })
    .send()

  /** @type {{ id: string; revision: string }} */
  const advisoryData = await res.json()
  return advisoryData
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} params.revision
 * @param {{}} params.csaf
 * @param {string} params.summary
 * @param {string} params.legacyVersion
 */
export async function updateAdvisory({
  advisoryId,
  revision,
  csaf,
  summary,
  legacyVersion,
}) {
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
    .jsonRequestBody({ csaf, summary, legacyVersion })
    .send()
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 */
export async function getAdvisoryDetail({ advisoryId }) {
  return (
    await new APIRequest(
      new Request(`/api/2.0/advisories/${advisoryId}/`)
    ).send()
  ).json()
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} params.revision
 * @param {string} params.workflowState
 * @param {string | null} params.documentTrackingStatus
 * @param {Date | null} params.proposedTime
 */
export async function changeWorkflowState({
  advisoryId,
  revision,
  workflowState,
  documentTrackingStatus,
  proposedTime,
}) {
  const newWorkflowState = workflowState
  const changeWorkflowStateURL = new URL(
    `/api/2.0/advisories/${advisoryId}/workflowstate/${newWorkflowState}`,
    window.location.href
  )
  changeWorkflowStateURL.searchParams.set('revision', revision)
  if (typeof documentTrackingStatus === 'string') {
    changeWorkflowStateURL.searchParams.set(
      'documentTrackingStatus',
      documentTrackingStatus
    )
  }
  if (proposedTime !== null) {
    changeWorkflowStateURL.searchParams.set(
      'proposedTime',
      proposedTime.toISOString()
    )
  }
  return new APIRequest(
    new Request(changeWorkflowStateURL.toString(), {
      method: 'PATCH',
    })
  ).send()
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @param {string} params.revision
 */
export async function createNewVersion({ advisoryId, revision }) {
  const createNewVersionAPIURL = new URL(
    `/api/2.0/advisories/${advisoryId}/createNewVersion`,
    window.location.href
  )
  createNewVersionAPIURL.searchParams.set('revision', revision)
  await new APIRequest(
    new Request(createNewVersionAPIURL.href, {
      method: 'PATCH',
    })
  ).send()
}
