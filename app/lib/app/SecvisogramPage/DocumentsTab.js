import React from 'react'
import { useErrorHandler } from 'react-error-boundary'
import {
  deleteAdvisory,
  getData,
  loadAdvisory,
} from './DocumentsTab/service.js'
import DocumentsTabView from './DocumentsTab/View.js'

/** @typedef {React.ComponentProps<typeof DocumentsTabView>} ViewProps */

/**
 * @param {Pick<ViewProps, 'onOpenAdvisory'>} props
 * @returns
 */
export default function DocumentsTab(props) {
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
      {...props}
      onGetData={onGetData}
      onDeleteAdvisory={(params, callback) => {
        deleteAdvisory(params).then(callback).catch(handleError)
      }}
      onLoadAdvisory={(params, callback) => {
        loadAdvisory(params).then(callback).catch(handleError)
      }}
    />
  )
}
