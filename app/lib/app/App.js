import React, { useEffect, useState } from 'react'
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import ErrorScreen from './App/ErrorScreen.js'
import useHistory from './App/useHistory.js'
import HistoryContext from './shared/context/HistoryContext.js'
import AppConfigContext from './shared/context/AppConfigContext.js'
import UserInfoContext from './shared/context/UserInfoContext.js'
import * as api from './shared/api.js'

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

  const defaultUserInfo = React.useContext(UserInfoContext)
  const [userContext, setUserContext] = useState(defaultUserInfo)

  const handleError = useErrorHandler()
  useEffect(() => {
    if (appConfigContext.loginAvailable) {
      api.auth
        .getUserInfo(appConfigContext.userInfoUrl)
        .then(
          (result) => {
            setUserContext({ ...result, isUserSignedIn: true })
          },
          (error) => {
            if (401 !== error.status) throw error
            setUserSignedOut()
          }
        )
        .catch(handleError)
    } else {
      setUserSignedOut()
    }

    function setUserSignedOut() {
      setUserContext({
        isUserSignedIn: false,
        user: '',
        email: '',
        preferredUsername: '',
        groups: [],
      })
    }
  }, [
    handleError,
    appConfigContext.loginAvailable,
    appConfigContext.userInfoUrl,
  ])

  return (
    <AppConfigContext.Provider value={appConfigContext}>
      <UserInfoContext.Provider value={userContext}>
        <HistoryContext.Provider value={history}>
          <ErrorBoundary FallbackComponent={ErrorScreen}>
            {secvisogramPage}
          </ErrorBoundary>
        </HistoryContext.Provider>
      </UserInfoContext.Provider>
    </AppConfigContext.Provider>
  )
}
