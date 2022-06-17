import React from 'react'

export default React.forwardRef(
  /**
   * @param {import('./NewDocumentDialog/types.js').Props} props
   */
  ({ data, onSubmit }, ref) => {
    return (
      <dialog className="rounded" ref={ref} data-testid="new_document_dialog">
        {data ? (
          <>
            <form
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
              <select
                className="block border border-gray-400 py-1 px-2 w-full shadow-inner rounded"
                data-testid="new_document-templates-select"
                name="templateId"
                required
              >
                <option value="">-- Choose a template --</option>
                {data.templates.map((template) => (
                  <option key={template.templateId} value={template.templateId}>
                    {template.templateDescription}
                  </option>
                ))}
              </select>
              <button
                data-testid="new_document-create_document_button"
                className="mt-2 py-1 px-3 rounded shadow border border-blue-400 bg-blue-400 text-white hover:text-blue-400 hover:bg-white"
              >
                Erstellen
              </button>
            </form>
          </>
        ) : null}
      </dialog>
    )
  }
)
