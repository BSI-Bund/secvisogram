interface Data {
  advisories: Array<{
    advisoryId: string
    title: string
    owner: string
    workflowState: string
  }>
}

export interface Props {
  defaultData?: Data | null
  onGetData(callback: (data: Data) => void): void
  onDeleteAdvisory(params: { advisoryId: string }, callback: () => void): void
}
