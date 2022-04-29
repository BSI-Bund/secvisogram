import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorScreen from './App/ErrorScreen.js'
import useHistory from './App/useHistory.js'
import HistoryContext from './shared/HistoryContext.js'

/**
 * @param {object} props
 * @param {JSX.Element} props.secvisogramPage
 * @returns
 */
export default function App({ secvisogramPage }) {
  const history = useHistory()

  return (
    <HistoryContext.Provider value={history}>
      <ErrorBoundary FallbackComponent={ErrorScreen}>
        {secvisogramPage}
      </ErrorBoundary>
    </HistoryContext.Provider>
  )
}
