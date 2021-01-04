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
  const EditorPage = () => {
    const [{ isLoading, data }, setState] = React.useState({
      isLoading: true,
      data: /** @type {Unpromisify<ReturnType<typeof core.document.edit>> | null} */ (null),
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
        activeTab="EDITOR"
        advisoryPageUrl="#"
        csafJsonPageUrl="#"
        editorPageUrl="#"
        htmlPageUrl="#"
        sourcePageUrl="#"
        isLoading={isLoading}
        isSaving={false}
        data={data}
        onSave={() => {}}
        onDownload={() => {}}
        onNew={() => {}}
        onOpen={() => {}}
      />
    )
  }

  render(
    <ErrorBoundary FallbackComponent={ErrorScreen}>
      <EditorPage />
    </ErrorBoundary>,
    root
  )
})
