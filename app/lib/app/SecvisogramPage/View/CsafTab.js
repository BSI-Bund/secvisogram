import { t } from 'i18next'
import React from 'react'

/**
 * @typedef {Array<{ instancePath: string; message: string; error: boolean }>} StrippedPathArray
 */

/**
 * Defines the layout of the csaf tab.
 *
 * @param {{
 *  stripResult: {
 *    strippedPaths: Array<{ instancePath: string; message: string; error: boolean }>
 *    doc: {}
 *  } | null
 *  onStrip(): void
 * }} props
 */
export default function CsafTab({ stripResult, onStrip }) {
  /**
   * Strips the document initially.
   */
  React.useEffect(() => {
    onStrip()
  }, [onStrip])

  return (
    <div className="csaf-document flex h-full mr-3 bg-white">
      <div className="p-3 w-full">
        <div className={'relative h-full'}>
          <section className="absolute top-0 right-0 bottom-0 left-0 h-full bg-white flex flex-col">
            {stripResult === null ? (
              <div>{t('menu.loadingData')}</div>
            ) : (
              <div className="h-full border overflow-auto">
                <pre className="text-sm whitespace-pre-wrap p-3">
                  {JSON.stringify(stripResult.doc, null, 2)}
                </pre>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}
