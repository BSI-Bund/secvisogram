interface Data {
  advisories: Array<{
    advisoryId: string
    title: string
    owner: string
    workflowState: string
    allowedStateChanges: string[]
    deletable: boolean
    canCreateVersion: boolean
  }>
}

export interface Props {
  defaultData?: Data | null
  defaultError?: { title: string; message: string } | null
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
    callback: (result: { statusCode: number }) => void
  ): void
  onCreateNewVersion(params: { advisoryId: string }, callback: () => void): void
}
