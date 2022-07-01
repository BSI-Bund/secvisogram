import APIRequest from '../APIRequest.js'

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
 */
export async function changeWorkflowState({
  advisoryId,
  revision,
  workflowState,
  documentTrackingStatus,
}) {
  const newWorkflowState = workflowState
  const httpPathSegments = new Map([
    ['Review', 'Review'],
    ['Approved', 'Approve'],
    ['Published', 'Publish'],
    ['Draft', 'Draft'],
  ])
  const changeWorkflowStateURL = new URL(
    `/api/2.0/advisories/${advisoryId}/workflowstate/${httpPathSegments.get(
      newWorkflowState
    )}`,
    window.location.href
  )
  changeWorkflowStateURL.searchParams.set('revision', revision)
  if (typeof documentTrackingStatus === 'string') {
    changeWorkflowStateURL.searchParams.set(
      'documentTrackingStatus',
      documentTrackingStatus
    )
  }
  return new APIRequest(
    new Request(changeWorkflowStateURL.toString(), {
      method: 'PATCH',
    })
  ).send()
}
