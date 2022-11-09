import { faFileLines } from '@fortawesome/free-regular-svg-icons'
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faComment,
  faExclamationTriangle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import SideBarContext from '../shared/context/SideBarContext.js'
import CommentPanel from './CommentPanel.js'
import ErrorPanel from './ErrorPanel.js'
import InfoPanel from './InfoPanel.js'

export default function SideBar() {
  const sideBarData = React.useContext(SideBarContext)

  return (
    <>
      <div className="flex h-full bg-gray-300 border-l border-gray-400 wizard-menu-shadow">
        {sideBarData.sideBarIsOpen ? (
          <div className="w-72 p-3 bg-gray-200 overflow-auto">
            {sideBarData.sideBarContent === 'ERRORS' ? (
              <ErrorPanel selectedPath={sideBarData.sideBarSelectedPath} />
            ) : sideBarData.sideBarContent === 'COMMENTS' ? (
              <CommentPanel selectedPath={sideBarData.sideBarSelectedPath} />
            ) : sideBarData.sideBarContent === 'DOCUMENTATION' ? (
              <InfoPanel selectedPath={sideBarData.sideBarSelectedPath} />
            ) : null}
          </div>
        ) : null}
        <div className="flex-col">
          {[
            { targetString: 'ERRORS', icon: faExclamationTriangle },
            { targetString: 'COMMENTS', icon: faComment },
            { targetString: 'DOCUMENTATION', icon: faFileLines },
          ].map(({ targetString, icon }) => (
            <div key={targetString}>
              <button
                data-testid={`sideBar-${targetString}-button`}
                className={
                  'p-3 w-full hover:bg-gray-200 ' +
                  (sideBarData.sideBarIsOpen &&
                  sideBarData.sideBarContent === targetString
                    ? 'bg-gray-200'
                    : '')
                }
                onClick={() => {
                  sideBarData.setSideBarContent(targetString)
                  if (!sideBarData.sideBarIsOpen) {
                    sideBarData.setSideBarIsOpen(true)
                  }
                }}
              >
                <FontAwesomeIcon className="fa-2x" icon={icon} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div
        className="mt-auto h-12 w-full col-start-2 col-end-2 bg-gray-300 border-l border-gray-400 wizard-menu-shadow"
        onClick={() => sideBarData.setSideBarIsOpen(!sideBarData.sideBarIsOpen)}
      >
        <button className="w-full h-full bg-gray-200 hover:bg-gray-100">
          {sideBarData.sideBarIsOpen ? (
            <>
              <FontAwesomeIcon className="fa-xs" icon={faAngleDoubleRight} />{' '}
              collapse Sidebar
            </>
          ) : (
            <FontAwesomeIcon className="fa-xs" icon={faAngleDoubleLeft} />
          )}
        </button>
      </div>
    </>
  )
}
