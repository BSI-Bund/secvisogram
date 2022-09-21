import { AdvisoryState } from '../../shared/types'

export interface Props {
  formValues: { doc: {} }
  originalValues: { doc: {} }
  advisoryState: AdvisoryState | null
  defaultSource?:
    | 'CSAFJSON'
    | 'CSAFJSONSTRIPPED'
    | 'HTMLDOCUMENT'
    | 'PDFDOCUMENT'
    | 'MARKDOWN'
  html: string
  onDownload(doc: {}): void
  onExportCSAF(doc: {}): void
  onExportHTML(html: string, doc: {}): void
  onClose(): void
}
