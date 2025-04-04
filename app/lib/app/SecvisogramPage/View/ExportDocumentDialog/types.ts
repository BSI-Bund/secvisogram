import { UiSchemaVersion } from '#lib/uiSchemas.js'
import { AdvisoryState } from '../../shared/types'

export interface Props {
  formValues: { doc: {} }
  originalValues: { doc: {} }
  documentIsValid: boolean
  advisoryState: AdvisoryState | null
  uiSchemaVersion: UiSchemaVersion
  defaultSource?:
    | 'CSAFJSON'
    | 'CSAFJSONSTRIPPED'
    | 'HTMLDOCUMENT'
    | 'PDFDOCUMENT'
    | 'MARKDOWN'
  onPrepareDocumentForTemplate(doc: {}): Promise<{ document: {} }>
  onDownload(doc: {}): void
  onExportCSAF(doc: {}): void
  onExportHTML(html: string, doc: {}): void
  onClose(): void
}
