import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorScreen from './App/ErrorScreen.js'
import useHistory from './App/useHistory.js'
import HistoryContext from './shared/HistoryContext.js'
import ConfigContext from './shared/ConfigContext.js'
import * as api from './shared/api.js'

/**
 * @param {object} props
 * @param {JSX.Element} props.secvisogramPage
 * @returns
 */
export default function App({ secvisogramPage }) {
  const history = useHistory()

  const [config, setConfig] = React.useState({});

  React.useEffect(() => {
    api.appConfig.getAppConfig().then(
      response => setConfig(response)
    )
  }, []);

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
