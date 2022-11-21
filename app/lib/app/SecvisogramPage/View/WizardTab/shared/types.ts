export type Property = Readonly<{
  key: string
  title?: string
  type: 'STRING' | 'ARRAY' | 'OBJECT' | 'RECURSION'
  fullName: ReadonlyArray<string>
  description?: string
  mandatory?: boolean
  enum?: ReadonlyArray<string>
  pattern?: string
  minLength?: number
  addMenuItemsForChildObjects?: boolean
  metaInfo: MetaInfo
  metaData?: any
}>

type MetaInfo = Readonly<{
  propertyList?: ReadonlyArray<Property>
  arrayType?: Property
}>
