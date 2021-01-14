import React from 'react'
import { render } from 'react-dom'
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import View from './SecvisogramPage/View'
import createCore from './shared/Core'
import ErrorScreen from './shared/ErrorScreen'
import './shared/style.css'

/**
 * @typedef {T extends Promise<infer R> ? R : unknown} Unpromisify
 * @template T
 */

const root = document.createElement('div')
document.body.appendChild(root)

createCore({}).then((core) => {
  const SecvisogramPage = () => {
    const [{ isLoading, activeTab, data }, setState] = React.useState({
      isLoading: true,
      data: /** @type {Unpromisify<ReturnType<typeof core.document.edit>> | null} */ (null),
      activeTab: /** @type {React.ComponentProps<typeof View>['activeTab']} */ ('EDITOR'),
    })

    const handleError = useErrorHandler()

    React.useEffect(() => {
      core.document
        .edit()
        .then((data) => {
          setState((state) => ({ ...state, isLoading: false, data }))
        })
        .catch(handleError)
    }, [handleError])

    return (
      <View
        activeTab={activeTab}
        isLoading={isLoading}
        isSaving={false}
        data={data}
        onSave={() => {}}
        onDownload={() => {}}
        onNew={() => {}}
        onOpen={() => {}}
        onChangeTab={(tab) => {
          setState((state) => ({ ...state, activeTab: tab }))
        }}
      />
    )
  }

  render(
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <SecvisogramPage />
    </ErrorBoundary>,
    root
  )
})
