export interface Props {
  data: {
    templates: Array<{ templateId: string; templateDescription: string }>
  } | null
  onSubmit(params: { templateId: string }): void
}
