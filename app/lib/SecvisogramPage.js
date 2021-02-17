import { get } from 'lodash'
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

const alertSaveInvalid = {
  label: 'Validation',
  description:
    'Open validation issues: Your document is yet not CSAF 2.0 compliant!',
  cancelLabel: 'Resume editing (Recommended)',
  confirmLabel: 'Save invalid document',
}

createCore().then((core) => {
  core.document.newDocMin().then((initialDoc) => {
    const SecvisogramPage = () => {
      const [
        {
          isLoading,
          isTabLocked,
          activeTab,
          data,
          errors,
          alert,
          stripResult,
          strict,
        },
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
          doc: initialDoc,
        },
        activeTab: /** @type {React.ComponentProps<typeof View>['activeTab']} */ ('EDITOR'),
        isTabLocked: false,
      })
      const handleError = useErrorHandler()

      return (
        <View
          activeTab={activeTab}
          isTabLocked={isTabLocked}
          isLoading={isLoading}
          isSaving={false}
          errors={errors}
          stripResult={stripResult}
          data={data}
          alert={alert}
          strict={strict}
          onLockTab={React.useCallback(() => {
            setState((state) => ({ ...state, isTabLocked: true }))
          }, [])}
          onUnlockTab={React.useCallback(() => {
            setState((state) => ({ ...state, isTabLocked: false }))
          }, [])}
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
                const fileName = createFileName(doc, isValid, 'json')
                if (!isValid) {
                  setState((state) => ({
                    ...state,
                    alert: {
                      ...alertSaveInvalid,
                      onConfirm() {
                        downloadFile(JSON.stringify(doc, null, 2), fileName)
                        setState({ ...state, alert: null })
                      },
                      onCancel() {
                        setState({ ...state, alert: null })
                      },
                    },
                  }))
                } else {
                  downloadFile(JSON.stringify(doc, null, 2), fileName)
                }
              })
              .catch(handleError)
          }}
          onOpen={(file) => {
            return new Promise((resolve, reject) => {
              const fileReader = new FileReader()
              fileReader.onerror = reject
              fileReader.onload = (e) => {
                try {
                  const parsedDoc = JSON.parse(
                    /** @type {string | undefined} */ (e.target?.result) ?? ''
                  )
                  setState((state) => ({
                    ...state,
                    data: {
                      ...state.data,
                      doc: parsedDoc,
                    },
                  }))
                  resolve(parsedDoc)
                } catch (err) {
                  reject(err)
                }
              }
              fileReader.readAsText(file)
            }).catch(handleError)
          }}
          onChangeTab={(tab, document) => {
            if (isTabLocked) return
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
                .validate({ document: document, strict: strict })
                .then(({ isValid }) => {
                  const fileName = createFileName(document, isValid, 'json')
                  core.document
                    .strip({ document, strict: strict })
                    .then(({ document: doc }) => {
                      downloadFile(JSON.stringify(doc, null, 2), fileName)
                    })
                    .catch(handleError)
                })
                .catch(handleError)
            },
            [handleError, strict]
          )}
          onExportHTML={React.useCallback(
            (html, doc) => {
              core.document
                .validate({ document: doc, strict: strict })
                .then(({ isValid }) => {
                  const fileName = createFileName(doc, isValid, 'html')
                  if (!isValid) {
                    setState((state) => ({
                      ...state,
                      alert: {
                        ...alertSaveInvalid,
                        onConfirm() {
                          downloadFile(html, fileName, 'text/html')
                          setState({ ...state, alert: null })
                        },
                        onCancel() {
                          setState({ ...state, alert: null })
                        },
                      },
                    }))
                  } else {
                    downloadFile(html, fileName, 'text/html')
                  }
                })
            },
            [strict]
          )}
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
})

/**
 * @param {string} content
 * @param {string} fileName
 * @param {string} type
 */
export default function downloadFile(
  content,
  fileName,
  type = 'application/json'
) {
  try {
    const string = btoa(content)
    const dataURI = `data:${type};base64,${string}`
    const element = window.document.createElement('a')
    element.download = fileName
    element.href = dataURI
    element.click()
  } catch (e) {
    alert('An error occured while serializing the download:\n\n' + e.message)
  }
}

/**
 * @param {{}} doc
 * @param {boolean} isValid
 * @param {string} extension
 */
function createFileName(doc, isValid, extension) {
  let trackingId = `${get(doc, 'document.tracking.id', '')}`
  if (trackingId.trim().length === 0) {
    trackingId = 'csaf_2_0'
  } else {
    trackingId = trackingId.replace(/([^a-z0-9]+)/gi, '_')
  }
  const fileName = `${trackingId}${isValid ? '' : '_invalid'}.${extension}`
  return fileName
}
