import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogLabel,
  AlertDialogOverlay,
} from '@reach/alert-dialog'
import '@reach/dialog/styles.css'
import React from 'react'

/**
 * @param {{
 *  label?: string
 *  description?: string
 *  yesLabel?: string
 *  noLabel?: string
 *  closeDeleteDialog(): void
 *  confirmDeleteDialog(): void
 * }} props
 */
export default function Alert({
  label = 'Please confirm',
  description = 'Are you sure?',
  yesLabel = 'OK',
  noLabel = 'Cancel',
  closeDeleteDialog,
  confirmDeleteDialog,
}) {
  const cancelRef = /** @type {React.RefObject<HTMLButtonElement>} */ (React.useRef())

  return (
    <AlertDialogOverlay
      onDismiss={closeDeleteDialog}
      leastDestructiveRef={cancelRef}
      className="z-10"
    >
      <AlertDialogContent className="rounded shadow-xl">
        <AlertDialogLabel className="text-xl mb-3">{label}</AlertDialogLabel>
        <AlertDialogDescription className="mb-3">
          {description}
        </AlertDialogDescription>
        <div className="alert-buttons flex justify-end items-center">
          <button
            type="button"
            className="py-1 px-3 rounded shadow border border-red-500 bg-red-500 hover:text-red-500 text-white hover:bg-white"
            onClick={confirmDeleteDialog}
          >
            {yesLabel}
          </button>
          <button
            type="button"
            className="ml-4 py-1 px-3 rounded shadow border border-gray-500 bg-gray-500 text-white hover:text-gray-500 hover:bg-white"
            ref={cancelRef}
            onClick={closeDeleteDialog}
          >
            {noLabel}
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialogOverlay>
  )
}
