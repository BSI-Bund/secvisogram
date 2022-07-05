import { backend } from '../../shared/api.js'
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
  const advisoryDetail = await backend.getAdvisoryDetail({ advisoryId })
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
 * @param {string} params.workflowState
 * @param {string | null} params.documentTrackingStatus
 * @param {Date | null} params.proposedTime
 */
export async function changeWorkflowState({
  advisoryId,
  workflowState,
  documentTrackingStatus,
  proposedTime,
}) {
  const { revision } = await backend.getAdvisoryDetail({ advisoryId })
  await backend.changeWorkflowState({
    advisoryId,
    revision,
    workflowState,
    documentTrackingStatus,
    proposedTime,
  })
}
