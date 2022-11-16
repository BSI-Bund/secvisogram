export type Property = Readonly<{
  key: string
  title?: string
  type: 'STRING' | 'ARRAY' | 'OBJECT' | 'RECURSION'
  fullName: ReadonlyArray<string>
  metaInfo: MetaInfo
  addMenuItemsForChildObjects?: boolean
}>

type MetaInfo = Readonly<{
  propertyList?: ReadonlyArray<Property>
  arrayType?: Property
}>
