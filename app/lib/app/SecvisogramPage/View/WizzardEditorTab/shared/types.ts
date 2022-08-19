// export enum MetaDataType {
//
//     // eslint-disable-next-line no-unused-vars
//     STRING = 'STRING',
//     // eslint-disable-next-line no-unused-vars
//     URI = 'URI',
//     // eslint-disable-next-line no-unused-vars
//     DATETIME = 'DATETIME',
//     // eslint-disable-next-line no-unused-vars
//     OBJECT = 'OBJECT',
//     // eslint-disable-next-line no-unused-vars
//     ARRAY = 'ARRAY',
// }

export interface MenuItem {
  title: string
  metaInfo: MetaProperty
  traversedJsonPath: string[]
  viewType: 'EDITOR' | 'LIST' | 'MENU' | 'INVISIBLE' | undefined
  subMenuItems: MenuItem[]
}

export interface MetaProperty {
  key: string
  fullName: string[]
  title: string
  description?: string
  type: string
  mandatory: boolean
  metaInfo: MetaInfoArray | MetaInfoString | MetaInfoObject
  refTitle?: string
  refDescription?: string
  addMenuItemsForChildObjects?: boolean
}

export interface MetaInfoObject {
  propertyList: MetaProperty[]
  minProperties: number
  maxProperties: number
}

export interface MetaInfoArray {
  minItem?: number
  arrayType: MetaProperty
  uniqueItems?: boolean
}

export interface MetaInfoString {
  minLength?: number
  examples?: string[]
  enumValues?: string[]
  pattern?: string
  default?: string
}
