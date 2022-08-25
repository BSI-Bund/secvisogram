import React from 'react'
import {
  changeWorkflowState,
  createNewVersion,
  getAdvisoryDetail,
} from '../shared/api/backend.js'
import { deleteAdvisory, getData } from './DocumentsTab/service.js'
import DocumentsTabView from './DocumentsTab/View.js'

/** @typedef {React.ComponentProps<typeof DocumentsTabView>} ViewProps */

/**
 * @param {Pick<ViewProps, 'onOpenAdvisory'>} props
 * @returns
 */
export default function DocumentsTab(props) {
  return (
    <DocumentsTabView
      {...props}
      onGetData={getData}
      onDeleteAdvisory={deleteAdvisory}
      onChangeWorkflowState={({
        advisoryId,
        workflowState,
        documentTrackingStatus,
        proposedTime,
      }) => {
        return getAdvisoryDetail({ advisoryId })
          .then(({ revision }) =>
            changeWorkflowState({
              advisoryId,
              revision,
              workflowState,
              documentTrackingStatus,
              proposedTime,
            })
          )
          .then(
            () => ({ statusCode: 200 }),
            (err) => {
              if (err.status === 422) {
                return { statusCode: 422 }
              }
              throw err
            }
          )
      }}
      onCreateNewVersion={async ({ advisoryId }) => {
        const advisoryDetail = await getAdvisoryDetail({
          advisoryId: advisoryId,
        })
        await createNewVersion({
          advisoryId,
          revision: advisoryDetail.revision,
        })
      }}
    />
  )
}
