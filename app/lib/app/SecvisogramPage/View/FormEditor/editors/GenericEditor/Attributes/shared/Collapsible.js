import React from 'react'
import { t } from 'i18next'

/**
 *
 *
 * @param {{
 *  startCollapsed: boolean
 *  title: string
 *  children: string | JSX.Element | JSX.Element[]
 * }} props
 */
export default function Collapsible({ startCollapsed, title, children }) {
  const [isCollapsed, setIsCollapsed] = React.useState(startCollapsed)

  return (
    <div className="flex flex-col">
      <button
        className="border border-gray-400 py-1 px-2 hover:bg-gray-200 rounded"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? t('menu.collapsibleShow') : t('menu.collapsibleHide')}{' '}
        {title}
      </button>
      {!isCollapsed ? <div>{children}</div> : null}
    </div>
  )
}
