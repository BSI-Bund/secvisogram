import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogLabel,
  AlertDialogOverlay,
} from '@reach/alert-dialog'
import { t } from 'i18next'
import React, { useState } from 'react'

/**
 * @param {{
 *  label?: string
 *  description: string
 *  confirmLabel: string
 *  cancelLabel: string
 *  confirm(): void
 * }} params
 */
export const useAlert = ({
  label = t('alert.pleaseConfirm'),
  description,
  confirmLabel,
  cancelLabel,
  confirm,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)

  return {
    show,
    hide,
    Alert: () => (
      <>
        {isVisible && (
          <Alert
            label={label}
            description={description}
            cancelLabel={cancelLabel}
            confirmLabel={confirmLabel}
            onCancel={hide}
            onConfirm={confirm}
          />
        )}
      </>
    ),
  }
}

/**
 * @param {{
 *  label?: string
 *  description: string
 *  confirmLabel: string
 *  cancelLabel: string
 *  onConfirm(): void
 *  onCancel(): void
 * }} params
 */
const Alert = ({
  label = t('alert.pleaseConfirm'),
  description,
  confirmLabel,
  cancelLabel,
  onCancel,
  onConfirm,
}) => {
  const cancelRef = /** @type {React.RefObject<HTMLButtonElement>} */ (
    React.useRef()
  )

  return (
    <>
      <AlertDialogOverlay
        onDismiss={onCancel}
        leastDestructiveRef={cancelRef}
        className="z-10"
      >
        <AlertDialogContent data-testid="alert" className="rounded shadow-xl">
          <AlertDialogLabel className="text-xl mb-3">{label}</AlertDialogLabel>
          <AlertDialogDescription className="mb-3">
            {description}
          </AlertDialogDescription>
          <div className="alert-buttons flex justify-end items-center">
            <button
              data-testid="alert-confirm_button"
              type="button"
              className="py-1 px-3 rounded shadow border border-red-500 bg-red-500 hover:text-red-500 text-white hover:bg-white"
              onClick={onConfirm}
            >
              {confirmLabel}
            </button>
            <button
              data-testid="alert-refute_button"
              type="button"
              className="ml-4 py-1 px-3 rounded shadow border border-gray-500 bg-gray-500 text-white hover:text-gray-500 hover:bg-white"
              ref={cancelRef}
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          </div>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </>
  )
}

export default Alert
