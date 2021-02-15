import React from 'react'
import { render } from 'react-dom'
import { ErrorBoundary, useErrorHandler } from 'react-error-boundary'
import View from './SecvisogramPage/View'
import createCore from './shared/Core'
import doc_min from './shared/Core/doc-min.json'
import ErrorScreen from './shared/ErrorScreen'
import './shared/style.css'

/**
 * @typedef {import('./shared/validationTypes').ValidationError} ValidationError
 */

const root = document.createElement('div')
document.body.appendChild(root)

createCore().then((core) => {
  const SecvisogramPage = () => {
    const [
      { isLoading, activeTab, data, errors, alert, stripResult, strict },
      setState,
    ] = React.useState({
      isLoading: false,
      strict: true,
      alert: /**
       * @type {{
       *   confirmLabel: string
       *   cancelLabel: string
       *   label: string
       *   description: string
       *   onConfirm(): void
       *   onCancel(): void
       * } | null}
       */ (null),
      errors: /** @type {ValidationError[]} */ ([]),
      stripResult: /**
       * @type {{
       *    strippedPaths: Array<{ dataPath: string; message: string; error: boolean }>
       *    doc: {}
       * } | null}
       */ (null),
      data: {
        doc: /** @type {any} */ ({ ...doc_min }),
      },
      activeTab: /** @type {React.ComponentProps<typeof View>['activeTab']} */ ('EDITOR'),
    })
    const handleError = useErrorHandler()

    return (
      <View
        activeTab={activeTab}
        isLoading={isLoading}
        isSaving={false}
        errors={errors}
        stripResult={stripResult}
        data={data}
        alert={alert}
        strict={strict}
        onSetStrict={(value) => {
          setState((state) => ({
            ...state,
            strict: value,
          }))
        }}
        onDownload={(doc) => {
          core.document
            .validate({ document: doc, strict: strict })
            .then(({ isValid }) => {
              if (!isValid) {
                setState((state) => ({
                  ...state,
                  alert: {
                    label: 'Validation',
                    description:
                      'Open validation issues: Your document is yet not CSAF 2.0 compliant!',
                    cancelLabel: 'Resume editing (Recommended)',
                    confirmLabel: 'Save invalid document',
                    onConfirm() {
                      downloadFile(
                        JSON.stringify(doc, null, 2),
                        `CSAF_2_0${isValid ? '' : '_invalid'}.json`
                      )
                      setState({ ...state, alert: null })
                    },
                    onCancel() {
                      setState({ ...state, alert: null })
                    },
                  },
                }))
              } else {
                downloadFile(JSON.stringify(doc, null, 2), 'CSAF_2_0.json')
              }
            })
            .catch(handleError)
        }}
        onOpen={(file) => {
          if (file.size > 1 * 1024 * 1024) {
            window.alert('File too large!')
            return
          }
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
            .validate({ document, strict: strict })
            .then((result) => {
              setState((state) => ({
                ...state,
                isLoading: false,
                errors: /** @type {ValidationError[]} */ (result.errors),
                activeTab: tab,
              }))
            })
            .catch(handleError)
        }}
        onValidate={React.useCallback(
          (doc) => {
            core.document
              .validate({ document: doc, strict: strict })
              .then((result) => {
                setState((state) => ({
                  ...state,
                  errors: /** @type {ValidationError[]} */ (result.errors),
                }))
              })
              .catch(handleError)
          },
          [handleError, strict]
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
              return doc
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
        onStrip={React.useCallback(
          (document) => {
            core.document
              .strip({ document, strict: strict })
              .then(({ document: doc, strippedPaths }) => {
                setState((state) => ({
                  ...state,
                  stripResult: {
                    strippedPaths,
                    doc,
                  },
                }))
              })
              .catch(handleError)
          },
          [handleError, strict]
        )}
        onExportCSAF={React.useCallback(
          (document) => {
            core.document
              .strip({ document, strict: strict })
              .then(({ document: doc }) => {
                downloadFile(JSON.stringify(doc, null, 2), 'CSAF_2_0.json')
              })
              .catch(handleError)
          },
          [handleError, strict]
        )}
        onExportHTML={React.useCallback((html) => {
          downloadFile(html, 'CSAF_2_0.html')
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

/**
 * @param {string} content
 * @param {string} fileName
 */
export default function downloadFile(content, fileName) {
  const string = btoa(content)
  const dataURI = `data:application/json;base64,${string}`
  const element = window.document.createElement('a')
  element.download = fileName
  element.href = dataURI
  element.click()
}
