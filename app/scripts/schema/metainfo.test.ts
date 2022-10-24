import csafJsonSchema from './schema_files/csaf_json_schema.json';
import convertedSchema from './generated/metainfo.json';
import {describe, expect, test} from '@jest/globals';
import {
  convertCsafSchema,
  convertSchemaPropToMeta,
  createDefaultAdditionalProperties,
  MetaInfoObject,
  MetaProperty
} from './metainfo';

test('import csaf json schema', () => {
    expect(csafJsonSchema.$defs.acknowledgments_t.title).toEqual('List of acknowledgments');

    // eslint-disable-next-line max-len
    const csafDoc: MetaProperty | null = convertSchemaPropToMeta('', [], csafJsonSchema, true, csafJsonSchema, new Map());

    console.log(csafDoc);

    expect(csafDoc?.key).toEqual('');
    expect(csafDoc?.title).toEqual('Common Security Advisory Framework');
    const document = (csafDoc?.metaInfo as MetaInfoObject).propertyList[0];
    expect(document.key).toEqual('document');
    const acknowledgments = (document?.metaInfo as MetaInfoObject).propertyList[0];
    expect(acknowledgments.key).toEqual('acknowledgments');
});

test('import converted csaf', () => {
    const rootProp: MetaProperty = convertedSchema as MetaProperty;
    expect(rootProp?.title).toEqual('Common Security Advisory Framework');
    expect(rootProp?.key).toEqual('');
    expect(rootProp?.title).toEqual('Common Security Advisory Framework');
    const document = (rootProp?.metaInfo as MetaInfoObject).propertyList[0];
    expect(document.key).toEqual('document');
    const acknowledgments = (document?.metaInfo as MetaInfoObject).propertyList[0];
    expect(acknowledgments.key).toEqual('acknowledgments');
});

test('create default additional properties', () => {

    const rootProperty: MetaProperty | null = convertSchemaPropToMeta('', [], csafJsonSchema, true, csafJsonSchema, new Map());
    const additionalProperties =  createDefaultAdditionalProperties(rootProperty);
    expect(additionalProperties["document.notes"]["propertyOrder"]).toEqual(["audience","category","text","title"]);
    const additionalPropertiesJsonString = JSON.stringify(additionalProperties);
    const readAdditionalProperties = JSON.parse(additionalPropertiesJsonString);
    expect(readAdditionalProperties["document.notes"]["propertyOrder"]).toEqual(["audience","category","text","title"]);
});

test('run export', () => {

  convertCsafSchema();
});