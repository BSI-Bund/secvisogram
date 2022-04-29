import React from 'react'
import CsafTab from './CsafTab.js'
import PreviewTab from './PreviewTab.js'

export interface Props {
  isLoading: boolean
  isSaving: boolean
  isTabLocked: boolean
  errors: import('../shared/types.js').ValidationError[]
  data: {
    doc: unknown
  } | null
  generatorEngineData: {
    name: string
    version: string
  }
  activeTab: 'EDITOR' | 'SOURCE' | 'PREVIEW' | 'CSAF-JSON' | 'DOCUMENTS'
  alert?: {
    confirmLabel: string
    cancelLabel: string
    label: string
    description: string
    onConfirm(): void
    onCancel(): void
  } | null
  stripResult: React.ComponentProps<typeof CsafTab>['stripResult']
  previewResult: React.ComponentProps<typeof PreviewTab>['previewResult']
  strict: boolean
  DocumentsTab: React.ComponentType<{}>
  onSetStrict(strict: boolean): void
  onDownload(doc: {}): void
  onOpen(file: File): Promise<void | {}>
  onChangeTab(
    tab: 'EDITOR' | 'SOURCE' | 'PREVIEW' | 'CSAF-JSON' | 'DOCUMENTS',
    document: {}
  ): void
  onValidate(document: {}): void
  onNewDocMin(): Promise<void | {}>
  onNewDocMax(): Promise<void | {}>
  onStrip(document: {}): void
  onPreview(document: {}): void
  onExportCSAF(doc: {}): void
  onExportHTML(html: string, doc: {}): void
  onLockTab(): void
  onUnlockTab(): void
  onCollectProductIds(document: {}): Promise<
    void | { id: string; name: string }[]
  >
  onCollectGroupIds(document: {}): Promise<
    void | { id: string; name: string }[]
  >
}
