import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faComment,
  faExclamationTriangle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'
import ErrorPanel from './ErrorPanel.js'
import InfoPanel from './InfoPanel.js'
import CommentPanel from './CommentPanel.js'
import React from 'react'
import SideBarContext from '../shared/context/SideBarContext.js'

export default function SideBar() {
  const sideBarData = React.useContext(SideBarContext)

  return (
    <>
      <div className="flex h-full w-3 justify-center items-center bg-gray-300 border-l border-black">
        <button
          onClick={() =>
            sideBarData.setSideBarIsOpen(!sideBarData.sideBarIsOpen)
          }
        >
          <FontAwesomeIcon
            className="fa-xs"
            icon={
              sideBarData.sideBarIsOpen ? faAngleDoubleRight : faAngleDoubleLeft
            }
          />
        </button>
      </div>
      {sideBarData.sideBarIsOpen ? (
        <div className="h-full w-96 bg-gray-300 p-1.5">
          <div className="flex justify-evenly bg-gray-300">
            {[
              { targetString: 'ERRORS', icon: faExclamationTriangle },
              { targetString: 'COMMENTS', icon: faComment },
              { targetString: 'DOCUMENTATION', icon: faInfoCircle },
            ].map(({ targetString, icon }) => (
              <div key={targetString} className="w-full">
                <button
                  className={
                    'p-3 w-full ' +
                    (sideBarData.sideBarContent === targetString
                      ? 'bg-gray-200'
                      : '')
                  }
                  onClick={() => {
                    sideBarData.setSideBarContent(targetString)
                  }}
                >
                  <FontAwesomeIcon className="fa-2x" icon={icon} />
                </button>
              </div>
            ))}
          </div>
          <div className="p-3 h-full w-full bg-gray-200 overflow-auto">
            {sideBarData.sideBarContent === 'ERRORS' ? (
              <ErrorPanel selectedPath={sideBarData.sideBarSelectedPath} />
            ) : sideBarData.sideBarContent === 'COMMENTS' ? (
              <CommentPanel selectedPath={sideBarData.sideBarSelectedPath} />
            ) : sideBarData.sideBarContent === 'DOCUMENTATION' ? (
              <InfoPanel selectedPath={sideBarData.sideBarSelectedPath} />
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  )
}
