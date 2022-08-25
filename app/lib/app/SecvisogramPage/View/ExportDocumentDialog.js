import React from 'react'

export default React.forwardRef(
  /**
   * @param {import('./ExportDocumentDialog/types.js').Props} props
   */
  ({ defaultSource = 'CSAFJSON', data, onSubmit, onClose }, ref) => {
    const [source, setSource] = React.useState(
      /** @type {'CSAFJSON'
    | 'CSAFJSONSTRIPPED'
    | 'HTMLDOCUMENT'
    | 'PDFDOCUMENT'
    | 'MARKDOWN'} */
      defaultSource
    )
    const [isLocal, setIsLocal] = React.useState(
      /** @type {boolean} */ data.isSelectorPresetLocal
    )

    return (
      <dialog
        className="rounded p-0 w-full max-w-lg shadow"
        ref={ref}
        data-testid="export_document_dialog"
        onClose={onClose}
      >
        <>
          <form method="dialog" id={`export_document-close_form`} />
          <header className="w-full flex items-center justify-between border-b p-2">
            <h2 className="text-lg">Export Document</h2>
            <button
              type="submit"
              name="cancel"
              form={`export_document-close_form`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </header>
          <form
            id="export_document-form"
            method="dialog"
            onSubmit={() => {
              onSubmit({ source, isLocal })
            }}
          >
            {data.isSelectorVisible || data.isExportText ? (
              <div className="border border-t-0 px-4 pb-4 pt-2">
                {data.isExportText ? (
                  <div className="content-center pt-2">
                    <p className="block text-red-400 text-center">
                      {data.isExportText}
                    </p>
                  </div>
                ) : null}
                {data.isSelectorVisible ? (
                  <div className="flex flex-col gap-2 pt-2">
                    <select
                      className="block border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
                      onChange={(e) => {
                        if (e.target.value === 'server') {
                          setIsLocal(false)
                        } else {
                          setIsLocal(true)
                        }
                      }}
                    >
                      <option value={'local'}>local</option>
                      <option value={'server'}>server</option>
                    </select>
                  </div>
                ) : null}
              </div>
            ) : null}
            <div className="p-4 flex flex-col gap-2">
              <div>
                <label
                  className={`block p-4 border cursor-pointer${
                    source === 'CSAFJSON'
                      ? ' border-blue-400 rounded-t'
                      : ' rounded hover:shadow'
                  }`}
                  htmlFor="CSAFJSON"
                >
                  <input
                    data-testid="export_document-csaf-json_selector_button"
                    id="CSAFJSON"
                    type="radio"
                    name="exportDialogRadio"
                    value="CSAFJSON"
                    required
                    checked={source === 'CSAFJSON'}
                    onChange={() => setSource('CSAFJSON')}
                  />

                  <span className="inline-block ml-3">CSAF json</span>
                </label>
              </div>
              <div>
                <label
                  className={`block p-4 border cursor-pointer${
                    source === 'CSAFJSONSTRIPPED'
                      ? ' border-blue-400 rounded-t'
                      : ' rounded hover:shadow'
                  }`}
                  htmlFor="CSAFJSONSTRIPPED"
                >
                  <input
                    data-testid="export_document-csaf-json-stripped_selector_button"
                    id="CSAFJSONSTRIPPED"
                    type="radio"
                    name="exportDialogRadio"
                    value="CSAFJSONSTRIPPED"
                    required
                    checked={source === 'CSAFJSONSTRIPPED'}
                    onChange={() => setSource('CSAFJSONSTRIPPED')}
                  />
                  <span className="inline-block ml-3">
                    CSAF json (stripped)
                  </span>
                </label>
              </div>
              <div>
                <label
                  className={`block p-4 border cursor-pointer${
                    source === 'HTMLDOCUMENT'
                      ? ' border-blue-400 rounded-t'
                      : ' rounded hover:shadow'
                  }`}
                  htmlFor="HTMLDOCUMENT"
                >
                  <input
                    data-testid="export_document-html_selector_button"
                    id="HTMLDOCUMENT"
                    type="radio"
                    name="exportDialogRadio"
                    value="HTMLDOCUMENT"
                    required
                    checked={source === 'HTMLDOCUMENT'}
                    onChange={() => setSource('HTMLDOCUMENT')}
                  />
                  <span className="inline-block ml-3">HTML</span>
                </label>
              </div>
              <div>
                <label
                  className={`block p-4 border cursor-pointer${
                    source === 'PDFDOCUMENT'
                      ? ' border-blue-400 rounded-t'
                      : ' rounded hover:shadow'
                  }`}
                  htmlFor="PDFDOCUMENT"
                >
                  <input
                    data-testid="export_document-pdf_selector_button"
                    id="PDFDOCUMENT"
                    type="radio"
                    name="exportDialogRadio"
                    value="PDFDOCUMENT"
                    required
                    checked={source === 'PDFDOCUMENT'}
                    onChange={() => setSource('PDFDOCUMENT')}
                  />
                  <span className="inline-block ml-3">PDF</span>
                </label>
              </div>
              {!isLocal ? (
                <div>
                  <label
                    className={`block p-4 border cursor-pointer${
                      source === 'MARKDOWN'
                        ? ' border-blue-400 rounded-t'
                        : ' rounded hover:shadow'
                    }`}
                    htmlFor="MARKDOWN"
                  >
                    <input
                      data-testid="export_document-markdown_selector_button"
                      id="MARKDOWN"
                      type="radio"
                      name="exportDialogRadio"
                      value="MARKDOWN"
                      required
                      checked={source === 'MARKDOWN'}
                      onChange={() => setSource('MARKDOWN')}
                    />
                    <span className="inline-block ml-3">Markdown</span>
                  </label>
                </div>
              ) : null}
            </div>
          </form>
          <footer className="p-2 border-t flex justify-between items-center">
            <button
              data-testid="export_document-cancel_button"
              className="mt-2 py-1 px-3 rounded shadow border border-gray-400 bg-gray-400 text-white hover:text-gray-400 hover:bg-white"
              type="submit"
              form={`export_document-close_form`}
            >
              Cancel
            </button>
            <button
              data-testid="export_document-export_document_button"
              className="mt-2 py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
              type="submit"
              form={`export_document-form`}
            >
              Export
            </button>
          </footer>
        </>
      </dialog>
    )
  }
)
