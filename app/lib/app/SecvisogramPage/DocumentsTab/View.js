import React from 'react'
import LoadingIndicator from '../View/LoadingIndicator.js'

/**
 * @param {import('./View/types.js').Props} props
 * @returns
 */
export default function DocumentsTabView({ defaultData = null, onGetData }) {
  const [data, setData] = React.useState(defaultData)

  React.useEffect(() => {
    let active = true

    onGetData((data) => {
      if (!active) return
      setData(data)
    })

    return () => {
      active = false
    }
  }, [onGetData])

  return (
    <div className="bg-white h-full">
      {!data ? (
        <LoadingIndicator label="Loading ..." />
      ) : (
        <div className="pt-4 mx-auto w-full max-w-4xl">
          <table className="border w-full">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">Document</th>
                <th className="p-2">Workflow State</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {data?.advisories.map((advisory) => (
                <tr
                  key={advisory.advisoryId}
                  data-testid={`advisory-${advisory.advisoryId}-list_entry`}
                >
                  <td className="p-2">
                    {advisory.title} | {advisory.owner}
                  </td>
                  <td className="p-2">
                    <span
                      data-testid={`advisory-${advisory.advisoryId}-list_entry-workflow_state`}
                    >
                      {advisory.workflowState}
                    </span>
                  </td>
                  <td className="p-2"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
