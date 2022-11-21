export type Property = Readonly<{
  key: string
  title?: string
  type: 'STRING' | 'ARRAY' | 'OBJECT' | 'RECURSION'
  fullName: ReadonlyArray<string>
  description: string
  mandatory?: boolean
  enum?: string[]
  pattern?: string
  minLength?: number
  addMenuItemsForChildObjects?: boolean
  metaInfo: MetaInfo
  metaData?: MetaData
}>

type MetaInfo = Readonly<{
  propertyList?: ReadonlyArray<Property>
  arrayType?: Property
}>

type MetaData = Readonly<{
  uiType?:
    | 'STRING_DATETIME'
    | 'STRING_URI'
    | 'STRING_ENUM'
    | 'STRING_MULTI_LINE'
    | 'STRING_PRODUCT_ID'
    | 'STRING_GROUP_ID'
    | 'OBJECT_CWE'
    | 'OBJECT_CVSS_2'
    | 'OBJECT_CVSS_3'
    | 'ARRAY_REVISION_HISTORY'
  options?: string[]
  freeSolo?: boolean
}>
