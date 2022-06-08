import React, { useEffect, useState } from 'react'
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import ErrorScreen from './App/ErrorScreen.js'
import useHistory from './App/useHistory.js'
import HistoryContext from './shared/context/HistoryContext.js'
import AppConfigContext from './shared/context/AppConfigContext.js'
import UserContext from './shared/context/UserContext.js'
import * as api from './shared/api.js'
import APIRequest from './shared/APIRequest.js'

/**
 * @param {object} props
 * @param {JSX.Element} props.secvisogramPage
 * @returns
 */
export default function App({ secvisogramPage }) {
  const history = useHistory()

  const defaultAppConfig = React.useContext(AppConfigContext)
  const [appConfigContext, setAppConfigContext] = useState(defaultAppConfig)

  useEffect(() => {
    api.appConfig
      .getAppConfig()
      .then((response) => setAppConfigContext(response))
  }, [])

  const defaultUser = React.useContext(UserContext)
  const [userContext, setUserContext] = useState(defaultUser)

  const handleError = useErrorHandler()
  useEffect(() => {
    if (appConfigContext.loginAvailable) {
      new APIRequest(new Request(appConfigContext.userInfoUrl))
        .produces('application/json')
        .send()
        .then((response) => response.json())
        .then((response) => {
          setUserContext({ ...response, isUserSignedIn: true })
        })
        .catch((error) => {
          if (401 !== error.status) {
            throw error
          }
        })
        .catch(handleError)
    } else {
      setUserContext({ ...userContext, isUserSignedIn: true })
    }
  }, [
    handleError,
    userContext,
    appConfigContext.loginAvailable,
    appConfigContext.userInfoUrl,
  ])

  return (
    <AppConfigContext.Provider value={appConfigContext}>
      <UserContext.Provider value={userContext}>
        <HistoryContext.Provider value={history}>
          <ErrorBoundary FallbackComponent={ErrorScreen}>
            {secvisogramPage}
          </ErrorBoundary>
        </HistoryContext.Provider>
      </UserContext.Provider>
    </AppConfigContext.Provider>
  )
}
