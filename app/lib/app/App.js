import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorScreen from './App/ErrorScreen.js'
import useHistory from './App/useHistory.js'
import * as api from './shared/api.js'
import ConfigContext from './shared/ConfigContext.js'
import HistoryContext from './shared/HistoryContext.js'

/**
 * @param {object} props
 * @param {JSX.Element} props.secvisogramPage
 * @returns
 */
export default function App({ secvisogramPage }) {
  const history = useHistory()

  const defaultConfig = React.useContext(ConfigContext)
  const [config, setConfig] = React.useState(defaultConfig)

  React.useEffect(() => {
    api.appConfig.getAppConfig().then((response) => setConfig(response))
  }, [])

  return (
    <ConfigContext.Provider value={config}>
      <HistoryContext.Provider value={history}>
        <ErrorBoundary FallbackComponent={ErrorScreen}>
          {secvisogramPage}
        </ErrorBoundary>
      </HistoryContext.Provider>
    </ConfigContext.Provider>
  )
}
