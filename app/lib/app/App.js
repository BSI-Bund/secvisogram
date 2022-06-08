import React, { useEffect, useState } from 'react'
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import ErrorScreen from './App/ErrorScreen.js'
import useHistory from './App/useHistory.js'
import * as api from './shared/api.js'
import AppConfigContext from './shared/context/AppConfigContext.js'
import HistoryContext from './shared/context/HistoryContext.js'
import UserInfoContext from './shared/context/UserInfoContext.js'

/**
 * @param {object} props
 * @param {JSX.Element} props.secvisogramPage
 * @returns
 */
export default function App({ secvisogramPage }) {
  const history = useHistory()

  const defaultAppConfig = React.useContext(AppConfigContext)
  const [appConfig, setAppConfig] = useState(defaultAppConfig)

  useEffect(() => {
    api.appConfig.getAppConfig().then((response) => setAppConfig(response))
  }, [])

  const defaultUserInfo = React.useContext(UserInfoContext)
  const [userInfo, setUserInfo] = useState(defaultUserInfo)

  const handleError = useErrorHandler()
  useEffect(() => {
    if (appConfig.loginAvailable) {
      api.auth
        .getUserInfo(appConfig.userInfoUrl)
        .then(
          (result) => {
            setUserInfo(result)
          },
          (error) => {
            if (401 !== error.status) throw error
            setUserInfo(null)
          }
        )
        .catch(handleError)
    } else {
      setUserInfo(null)
    }
  }, [handleError, appConfig.loginAvailable, appConfig.userInfoUrl])

  return (
    <AppConfigContext.Provider value={appConfig}>
      <UserInfoContext.Provider value={userInfo}>
        <HistoryContext.Provider value={history}>
          <ErrorBoundary FallbackComponent={ErrorScreen}>
            {secvisogramPage}
          </ErrorBoundary>
        </HistoryContext.Provider>
      </UserInfoContext.Provider>
    </AppConfigContext.Provider>
  )
}
