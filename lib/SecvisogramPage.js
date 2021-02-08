import React from 'react'
import { render } from 'react-dom'
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import View from './SecvisogramPage/View'
import createCore from './shared/Core'
import ErrorScreen from './shared/ErrorScreen'
import './shared/style.css'

/**
 * @typedef {import('./shared/validationTypes').ValidationError} ValidationError
 */

const root = document.createElement('div')
document.body.appendChild(root)

createCore().then((core) => {
  const SecvisogramPage = () => {
    const [{ isLoading, activeTab, data }, setState] = React.useState({
      isLoading: false,
      data: {
        documentIsValid: /** @type {boolean | null} */ (null),
        errors: /** @type {ValidationError[]} */ ([]),
        doc: /** @type {any} */ ({
          document: {
            csaf_version: '2.0',
            title: '',
            publisher: {
              type: '',
            },
            type: '',
            tracking: {
              current_release_date: '',
              id: '',
              initial_release_date: '',
              revision_history: [
                {
                  number: '',
                  date: '',
                  summary: '',
                },
              ],
              status: '',
              version: '',
            },
          },
        }),
      },
      activeTab: /** @type {React.ComponentProps<typeof View>['activeTab']} */ ('EDITOR'),
    })
    const handleError = useErrorHandler()

    return (
      <View
        activeTab={activeTab}
        isLoading={isLoading}
        isSaving={false}
        data={data}
        onDownload={(doc) => {
          core.document
            .validate({ document: doc })
            .then(({ isValid }) => {
              if (!isValid) {
                if (
                  !confirm(
                    'Open validation issues: Your document is yet not CSAF 2.0 compliant!'
                  )
                )
                  return
              }
              const string = btoa(JSON.stringify(doc, null, 2))
              const dataURI = `data:application/json;base64,${string}`
              const element = document.createElement('a')
              element.download = `CSAF_2_0${isValid ? '' : '_invalid'}.json`
              element.href = dataURI
              element.click()
            })
            .catch(handleError)
        }}
        onOpen={(file) => {
          new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.onerror = reject
            fileReader.onload = (e) => {
              try {
                setState((state) => ({
                  ...state,
                  data: {
                    ...state.data,
                    doc: JSON.parse(
                      /** @type {string | undefined} */ (e.target?.result) ?? ''
                    ),
                  },
                }))
                resolve(null)
              } catch (err) {
                reject(err)
              }
            }
            fileReader.readAsText(file)
          }).catch(handleError)
        }}
        onChangeTab={(tab, document) => {
          setState((state) => ({ ...state, isLoading: true }))
          core.document
            .validate({ document })
            .then(({ isValid, errors }) => {
              setState((state) => ({
                ...state,
                isLoading: false,
                data: {
                  ...state.data,
                  doc: document,
                  documentIsValid: isValid,
                  errors: /** @type {ValidationError[]} */ (errors),
                },
                activeTab: tab,
              }))
            })
            .catch(handleError)
        }}
        onValidate={React.useCallback(
          (doc) => {
            core.document
              .validate({ document: doc })
              .then(({ isValid, errors }) => {
                setState((state) => ({
                  ...state,
                  data: {
                    ...state.data,
                    doc: doc,
                    documentIsValid: isValid,
                    errors: /** @type {ValidationError[]} */ (errors),
                  },
                }))
              })
              .catch(handleError)
          },
          [handleError]
        )}
        onNewDocMin={React.useCallback(() => {
          return core.document
            .newDocMin()
            .then((doc) => {
              setState((state) => ({
                ...state,
                data: {
                  ...state.data,
                  doc: doc,
                },
              }))
            })
            .catch(handleError)
        }, [handleError])}
        onNewDocMax={React.useCallback(() => {
          return core.document
            .newDocMax()
            .then((doc) => {
              setState((state) => ({
                ...state,
                data: {
                  ...state.data,
                  doc: doc,
                },
              }))
              return doc
            })
            .catch(handleError)
        }, [handleError])}
        onStrip={React.useCallback((document) => {
          return core.document.strip({ document })
        }, [])}
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
