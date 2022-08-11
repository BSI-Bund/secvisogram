export interface Props {
  data: {
    isExportText: string
    isSelectorVisible: boolean
    isSelectorPresetLocal: boolean
  } | null
  defaultSource?:
    | 'CSAFJSON'
    | 'CSAFJSONSTRIPPED'
    | 'HTMLDOCUMENT'
    | 'PDFDOCUMENT'
    | 'MARKDOWN'
  onSubmit(
    params:
      | { source: 'CSAFJSON'; isLocal: boolean }
      | { source: 'CSAFJSONSTRIPPED'; isLocal: boolean }
      | { source: 'HTMLDOCUMENT'; isLocal: boolean }
      | { source: 'PDFDOCUMENT'; isLocal: boolean }
      | { source: 'MARKDOWN'; isLocal: boolean }
  ): void
}
