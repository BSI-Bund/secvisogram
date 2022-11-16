export type Schema = ObjectSchema | ArraySchema | StringSchema | Ref

export type Defs = Record<string, Schema | undefined>

type CommonSchemaFields = {
  title?: string
  description?: string
}

export interface ObjectSchema extends CommonSchemaFields {
  type: 'object'
  properties: Record<string, Schema>
}

export interface ArraySchema extends CommonSchemaFields {
  type: 'array'
  items: Schema
}

export interface StringSchema extends CommonSchemaFields {
  type: 'string'
  format?: string
  pattern?: string
  uniqueItems?: boolean
  examples?: string[]
  minLength?: number
  enum?: string[]
}

export interface Ref extends CommonSchemaFields {
  $ref: string
}

export interface CommonUiSchemaFields {
  title?: string
  description?: string
  addMenuItemsForChildObjects?: boolean
  key: string
  metaData?: {
    uiType?: string
  }
}

export interface ArrayUiSchema extends CommonUiSchemaFields {
  type: 'ARRAY'
  metaInfo: {
    arrayType: UiSchema
  }
}

export interface ObjectUiSchema extends CommonUiSchemaFields {
  type: 'OBJECT'
  metaInfo: {
    propertyList: UiSchema[]
  }
}

export interface RecursionUiSchema extends CommonUiSchemaFields {
  type: 'RECURSION'
  metaInfo: {}
}

export interface StringUiSchema extends CommonUiSchemaFields {
  type: 'STRING'
  metaInfo: {}
}

export type UiSchema =
  | ArrayUiSchema
  | ObjectUiSchema
  | RecursionUiSchema
  | StringUiSchema
  | { type: 'UNKNOWN' }
