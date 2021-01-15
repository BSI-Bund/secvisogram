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

createCore({}).then((core) => {
  const SecvisogramPage = () => {
    const [{ isLoading, activeTab, data }, setState] = React.useState({
      isLoading: false,
      data: {
        documentIsValid: /** @type {boolean | null} */ (null),
        errors: /** @type {unknown[]} */ ([]),
        doc: /** @type {any} */ ({
          acknowledgments: [
            { names: [''], organizations: [''], summary: '', urls: [''] },
          ],
        }),
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
        onChangeTab={(tab, document) => {
          setState((state) => ({ ...state, isLoading: true }))
          core.document.validate({ document }).then(({ isValid, errors }) => {
            setState((state) => ({
              ...state,
              isLoading: false,
              data: {
                ...state.data,
                doc: document,
                documentIsValid: isValid,
                errors,
              },
              activeTab: tab,
            }))
          })
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
