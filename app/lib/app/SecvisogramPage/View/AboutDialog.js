import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'

const secvisogramVersion = SECVISOGRAM_VERSION // eslint-disable-line

export default /**
 * @param { object } props
 * @param { () => void } props.onClose
 */ ({ onClose }) => {
  /** @type {React.MutableRefObject<HTMLDialogElement | null>} */
  const ref = React.useRef(null)
  React.useEffect(() => {
    ref.current?.showModal()
  }, [])

  return (
    <dialog
      className="rounded p-0 w-full max-w-lg shadow"
      ref={ref}
      data-testid="about_dialog"
      onClose={() => {
        onClose()
      }}
    >
      <header className="w-full flex items-center justify-between border-b p-2">
        <h2 className="text-lg">About Secvisogram</h2>
        <button
          type="submit"
          name="cancel"
          onClick={() => {
            ref.current?.close()
          }}
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
      <div className="border border-t-0 px-4 pb-4 pt-2">
        Version:{' '}
        <a
          href="https://github.com/secvisogram/secvisogram"
          className="underline"
        >
          <FontAwesomeIcon className="mx-1" icon={faCodeBranch} />
          <span>{secvisogramVersion}</span>
        </a>
        <br />
        License:{' '}
        <a
          href="https://github.com/secvisogram/secvisogram/blob/main/LICENSE.md"
          className="underline"
        >
          MIT
        </a>
        <br />
        For usage instructions check the{' '}
        <a
          href="https://secvisogram.github.io/secvisogram-documentation/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          CSAF Author Guide
        </a>
      </div>
    </dialog>
  )
}
