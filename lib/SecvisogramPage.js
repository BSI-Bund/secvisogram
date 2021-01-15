import React from 'react'
import { render } from 'react-dom'
import { ErrorBoundary } from 'react-error-boundary'
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

createCore({}).then(() => {
  const SecvisogramPage = () => {
    const [{ isLoading, activeTab, data }, setState] = React.useState({
      isLoading: false,
      data: {
        doc: {
          acknowledgments: [
            { names: [''], organizations: [''], summary: '', urls: [''] },
          ],
        },
      },
      activeTab: /** @type {React.ComponentProps<typeof View>['activeTab']} */ ('EDITOR'),
    })

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
