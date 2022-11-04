import csafJsonSchema from './schema_files/csaf_json_schema.json'
import { expect, test } from '@jest/globals'
import {
  convertSchemaPropToMeta,
  createDefaultAdditionalProperties,
  extendWithAdditionalInfo, extendWithMetaInfo2,
  MetaDataType,
  MetaInfoObject,
  MetaInfoString,
  MetaProperty,
} from './metainfo'

test('import csaf json schema', () => {
  expect(csafJsonSchema.$defs.acknowledgments_t.title).toEqual(
    'List of acknowledgments'
  )

  // eslint-disable-next-line max-len
  const csafDoc = convertSchemaPropToMeta(
    '',
    [],
    csafJsonSchema,
    true,
    csafJsonSchema,
    new Map()
  )

  console.log(csafDoc)

  expect(csafDoc?.key).toEqual('')
  expect(csafDoc?.title).toEqual('Common Security Advisory Framework')
  const document = (csafDoc?.metaInfo as MetaInfoObject).propertyList[0]
  expect(document.key).toEqual('document')
  const acknowledgments = (document?.metaInfo as MetaInfoObject).propertyList[0]
  expect(acknowledgments.key).toEqual('acknowledgments')
})

test('create default additional properties', () => {
  const rootProperty: MetaProperty | null = convertSchemaPropToMeta(
    '',
    [],
    csafJsonSchema,
    true,
    csafJsonSchema,
    new Map()
  )

  const metaInfo2Data = {
    "document.notes": {
      "user_documentation": {
        "specification": "docs/user/document/notes-spec.en.md",
        "usage": { "generic": "docs/user/document/notes-usage.en.md" }
      },
      "field_title": "DocumentNotesTitle",
      "field_description": "DocumentNotesDescription",
      "relevance_levels": {
        "csaf_base": "want_to_have",
        "csaf_security_incident_response": "mandatory",
        "csaf_informational_advisory": "mandatory",
        "csaf_security_advisory": "best_practice",
        "csaf_vex": "want_to_have"
      }
    },
  }
  const additionalProperties = createDefaultAdditionalProperties(rootProperty, metaInfo2Data)
  expect(additionalProperties['document.notes']['propertyOrder']).toEqual([
    'audience',
    'category',
    'text',
    'title',
  ])
  const additionalPropertiesJsonString = JSON.stringify(additionalProperties)
  const readAdditionalProperties = JSON.parse(additionalPropertiesJsonString)
  expect(readAdditionalProperties['document.notes']['propertyOrder']).toEqual([
    'audience',
    'category',
    'text',
    'title',
  ])
  expect(readAdditionalProperties['document.notes']['user_documentation']).toEqual({
    "specification": "docs/user/document/notes-spec.en.md",
    "usage": { "generic": "docs/user/document/notes-usage.en.md"}
  })
})

function createMetaPropertyString(
  key: string,
  fullName: string[]
): MetaProperty {
  return {
    key: key,
    fullName: fullName,
    mandatory: true,
    type: MetaDataType.STRING,
    metaInfo: {
      minLength: 1,
    },
  }
}

function createMetaPropertyArray(
  key: string,
  fullName: string[],
  arrayType: MetaProperty
): MetaProperty {
  return {
    mandatory: true,
    key: 'acknowledgments',
    fullName: ['document', 'acknowledgments'],
    type: MetaDataType.ARRAY,
    metaInfo: {
      minItem: 1,
      arrayType: arrayType,
    },
  }
}

function createMetaPropertyObject(
  key: string,
  fullName: string[],
  propertyList: MetaProperty[]
): MetaProperty {
  return {
    key: key,
    fullName: fullName,
    type: MetaDataType.OBJECT,
    mandatory: true,
    metaInfo: {
      propertyList: propertyList,
    },
  }
}

test('extendWithAdditionalInfo - sort order', () => {
  const docAcknArrayPropType = createMetaPropertyString('', ['document','acknowledgments','names',])
  const docAcknProp = createMetaPropertyArray('acknowledgments',['document', 'acknowledgments'], docAcknArrayPropType)
  const docOrgProp = createMetaPropertyString('organization', ['document','organization',])
  const docObjectProp = createMetaPropertyObject('document',['document'],[docAcknProp, docOrgProp])
  const rootProperty = createMetaPropertyObject('', [], [docObjectProp])

  const propsToAdd = {
    document: {
      propertyOrder: ['organization', 'acknowledgments'],
    },
  }
  extendWithAdditionalInfo(rootProperty, propsToAdd)
  expect(
    rootProperty['metaInfo']['propertyList'][0]['metaInfo']['propertyList'][0][
      'key'
    ]
  ).toEqual('organization')
  expect(
    rootProperty['metaInfo']['propertyList'][0]['metaInfo']['propertyList'][1][
      'key'
    ]
  ).toEqual('acknowledgments')
})

test('extendWithAdditionalInfo - sort order with invalid properties', () => {
  const docAcknArrayPropType = createMetaPropertyString('', ['document','acknowledgments','names',])
  const docAcknProp = createMetaPropertyArray('acknowledgments',['document', 'acknowledgments'], docAcknArrayPropType)
  const docOrgProp = createMetaPropertyString('organization', ['document','organization',])
  const docObjectProp = createMetaPropertyObject('document',['document'],[docAcknProp, docOrgProp])
  const rootProperty = createMetaPropertyObject('', [], [docObjectProp])

  const propsToAdd = {
    document: {
      propertyOrder: ['wrongProp1', 'wrongProp2'],
    },
  }
  extendWithAdditionalInfo(rootProperty, propsToAdd)
  expect(
    rootProperty['metaInfo']['propertyList'][0]['metaInfo']['propertyList'][0][
      'key'
    ]
  ).toEqual('acknowledgments')
  expect(
    rootProperty['metaInfo']['propertyList'][0]['metaInfo']['propertyList'][1][
      'key'
    ]
  ).toEqual('organization')
})

test('extendWithMetaInfo2 - add relevance_levels', () => {
  const docAcknArrayPropType = createMetaPropertyString('', ['document','acknowledgments','names',])
  const docAcknProp = createMetaPropertyArray('acknowledgments',['document', 'acknowledgments'], docAcknArrayPropType)
  const docOrgProp = createMetaPropertyString('organization', ['document','organization',])
  const docObjectProp = createMetaPropertyObject('document',['document'],[docAcknProp, docOrgProp])
  const rootProperty = createMetaPropertyObject('', [], [docObjectProp])

  const propsToAdd = {
    'document.organization': {
      user_documentation: {
        specification: 'docs/user/document/acknowledgments-spec.en.md',
        usage: { generic: 'docs/user/document/acknowledgments-usage.en.md' },
      },
      field_title: 'DocumentAcknowledgmentsTitle',
      field_description: 'DocumentAcknowledgmentsDescription',
      relevance_levels: {
        csaf_base: 'optional',
        csaf_security_incident_response: 'optional',
        csaf_informational_advisory: 'optional',
        csaf_security_advisory: 'best_practice',
        csaf_vex: 'want_to_have',
      },
    },
  }

  extendWithMetaInfo2(rootProperty, propsToAdd)
  expect(rootProperty['metaInfo']['propertyList'][0]['metaInfo']['propertyList'][1]['key']).toEqual('organization');
  expect(rootProperty['metaInfo']['propertyList'][0]['metaInfo']['propertyList'][1]
    ['relevance_levels']['csaf_base']).toEqual('optional')
})
