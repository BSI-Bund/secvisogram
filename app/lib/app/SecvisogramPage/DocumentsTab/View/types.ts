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
  onLoadAdvisory(
    params: { advisoryId: string },
    callback: (advisory: { csaf: string }) => void
  ): void
  onOpenAdvisory(params: { advisory: { csaf: {} } }, callback: () => void): void
}
