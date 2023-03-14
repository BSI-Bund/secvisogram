export interface Props {
  data: {
    advisoryId: string
    allowedStateChanges: string[]
    currentReleaseDate: string
  } | null
  onSubmit(params: {
    workflowState: string
    documentTrackingStatus: string | null
    proposedTime: Date | null
  }): void
  onClose(): void
}
