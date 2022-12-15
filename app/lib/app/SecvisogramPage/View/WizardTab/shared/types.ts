export type Property = Readonly<{
  key: string
  title?: string
  type: 'STRING' | 'ARRAY' | 'OBJECT' | 'RECURSION' | 'NUMBER'
  fullName: ReadonlyArray<string>
  description?: string
  mandatory?: boolean
  enum?: ReadonlyArray<string>
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
  addMenuItemsForChildObjects?: boolean
  uiType?:
    | 'STRING_DATETIME'
    | 'STRING_URI'
    | 'STRING_ENUM'
    | 'STRING_WITH_OPTIONS'
    | 'STRING_MULTI_LINE'
    | 'STRING_PRODUCT_ID'
    | 'STRING_GROUP_ID'
    | 'OBJECT_CWE'
    | 'OBJECT_CVSS_2'
    | 'OBJECT_CVSS_3'
    | 'ARRAY_REVISION_HISTORY'
  relevanceLevels?: {
    csaf_base: RelevanceLevel
    csaf_security_incident_response: RelevanceLevel
    csaf_informational_advisory: RelevanceLevel
    csaf_security_advisory: RelevanceLevel
    csaf_vex: RelevanceLevel
  }
  userDocumentation?: {
    specification: string
    usage: string
  }
  title?: string
  description?: string
  i18n?: {
    title: string
    description: string
  }
  options?: ReadonlyArray<string>
  disable?: {
    ifStandaloneMode: boolean
    ifServerMode: boolean
  }
  itemName?: {
    itemNameTranslationKey: string
    itemNameField?: string
  }
}>

type RelevanceLevel =
  | 'mandatory'
  | 'want_to_have'
  | 'best_practice'
  | 'nice_to_know'
  | 'optional'
