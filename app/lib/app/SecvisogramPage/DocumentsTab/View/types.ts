interface Data {
  advisories: Array<{
    advisoryId: string
    title: string
    owner: string
    workflowState: string
    allowedStateChanges: string[]
  }>
}

export interface Props {
  defaultData?: Data | null
  onGetData(callback: (data: Data) => void): void
  onDeleteAdvisory(params: { advisoryId: string }, callback: () => void): void
  onOpenAdvisory(params: { advisoryId: string }, callback: () => void): void
  onChangeWorkflowState(
    params: {
      advisoryId: string
      workflowState: string
      documentTrackingStatus: string | null
      proposedTime: Date | null
    },
    callback: () => void
  ): void
}
