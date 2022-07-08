import React from 'react'

export default React.forwardRef(
  /**
   * @param {import('./NewDocumentDialog/types.js').Props} props
   */
  ({ data, onSubmit }, ref) => {
    return (
      <dialog
        className="rounded p-0 w-full max-w-lg shadow"
        ref={ref}
        data-testid="new_document_dialog"
      >
        {data ? (
          <>
            <form method="dialog" id={`new_document-close_form`} />
            <header className="w-full flex items-center justify-between border-b p-2">
              <h2 className="text-lg">Create new document</h2>
              <button
                type="submit"
                name="cancel"
                form={`new_document-close_form`}
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
              id="new_document-form"
              method="dialog"
              onSubmit={(e) => {
                const formData = new FormData(
                  /** @type {HTMLFormElement} */ (e.target)
                )
                const templateId = /** @type {string} */ (
                  formData.get('templateId')
                )
                onSubmit({ templateId })
              }}
            >
              <div className="p-4">
                <select
                  className="block border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
                  data-testid="new_document-templates-select"
                  name="templateId"
                  required
                >
                  <option value="">-- Choose a template --</option>
                  {data.templates.map((template) => (
                    <option
                      key={template.templateId}
                      value={template.templateId}
                    >
                      {template.templateDescription}
                    </option>
                  ))}
                </select>
              </div>
            </form>
            <footer className="p-2 border-t flex justify-between items-center">
              <button
                data-testid="new_document-cancel_button"
                className="mt-2 py-1 px-3 rounded shadow border border-gray-400 bg-gray-400 text-white hover:text-gray-400 hover:bg-white"
                type="submit"
                form={`new_document-close_form`}
              >
                Cancel
              </button>
              <button
                data-testid="new_document-create_document_button"
                className="mt-2 py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
                type="submit"
                form={`new_document-form`}
              >
                Create
              </button>
            </footer>
          </>
        ) : null}
      </dialog>
    )
  }
)
