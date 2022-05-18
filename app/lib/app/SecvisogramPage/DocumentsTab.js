import React from 'react'
import { useErrorHandler } from 'react-error-boundary'
import { deleteAdvisory, getData } from './DocumentsTab/service.js'
import DocumentsTabView from './DocumentsTab/View.js'

export default function DocumentsTab() {
  /** @typedef {React.ComponentProps<typeof DocumentsTabView>} ViewProps */

  const handleError = useErrorHandler()

  /** @type {ViewProps['onGetData']} */
  const onGetData = React.useCallback(
    (callback) => {
      getData().then(callback).catch(handleError)
    },
    [handleError]
  )

  return (
    <DocumentsTabView
      onGetData={onGetData}
      onDeleteAdvisory={(params, callback) => {
        deleteAdvisory(params).then(callback).catch(handleError)
      }}
    />
  )
}
