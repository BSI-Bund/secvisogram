export interface Property {
  key: string
  title: string
  type: string
  fullName: string[]
  metaInfo: MetaInfo
}

interface MetaInfo {
  propertyList?: Array<Property>
  arrayType?: Property
}
