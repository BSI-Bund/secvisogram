import React from 'react'
import {
  changeWorkflowState,
  createNewVersion,
  getAdvisoryDetail,
} from '../shared/api/backend.js'
import AppErrorContext from '../shared/context/AppErrorContext.js'
import { deleteAdvisory, getData } from './DocumentsTab/service.js'
import DocumentsTabView from './DocumentsTab/View.js'

/** @typedef {React.ComponentProps<typeof DocumentsTabView>} ViewProps */

/**
 * @param {Pick<ViewProps, 'onOpenAdvisory'>} props
 * @returns
 */
export default function DocumentsTab(props) {
  const { handleError } = React.useContext(AppErrorContext)

  /** @type {ViewProps['onGetData']} */
  const onGetData = React.useCallback(
    (callback) => {
      getData().then(callback).catch(handleError)
    },
    [handleError]
  )

  return (
    <DocumentsTabView
      {...props}
      onGetData={onGetData}
      onDeleteAdvisory={(params, callback) => {
        deleteAdvisory(params).then(callback).catch(handleError)
      }}
      onChangeWorkflowState={(
        { advisoryId, workflowState, documentTrackingStatus, proposedTime },
        callback
      ) => {
        getAdvisoryDetail({ advisoryId })
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
          .then(callback, handleError)
      }}
      onCreateNewVersion={({ advisoryId }, callback) => {
        getAdvisoryDetail({
          advisoryId: advisoryId,
        })
          .then((advisoryDetail) =>
            createNewVersion({ advisoryId, revision: advisoryDetail.revision })
          )
          .then(callback, handleError)
      }}
    />
  )
}
