import * as cvss_v2_0_json from './schema_files/cvss-v2.0.json';
import * as cvss_v3_0_json from './schema_files/cvss-v3.0.json';
import * as cvss_v3_1_json from './schema_files/cvss-v3.1.json';
import * as csaf_json_schema from './schema_files/csaf_json_schema.json';
import * as additional_props from './config/additionalProperties.json';
import prettier from 'prettier'

import fs from "fs";

// eslint-disable-next-line no-shadow
export enum MetaDataType {

  // eslint-disable-next-line no-unused-vars
  STRING = 'STRING',
  // eslint-disable-next-line no-unused-vars
  URI = 'URI',
  // eslint-disable-next-line no-unused-vars
  DATETIME = 'DATETIME',
  // eslint-disable-next-line no-unused-vars
  OBJECT = 'OBJECT',
  // eslint-disable-next-line no-unused-vars
  ARRAY = 'ARRAY',

  RECURSION = 'RECURSION',
}

export interface MetaProperty {

  key: string
  fullName: string[]
  title?: string;
  description?: string;
  type: MetaDataType;
  mandatory: boolean;
  // eslint-disable-next-line no-use-before-define
  metaInfo?: MetaInfoArray | MetaInfoString | MetaInfoObject | MetaInfoReference
  refTitle?: string
  refDescription?: string;
}

export interface MetaInfoObject {

  propertyList: MetaProperty[];
  minProperties?: number;
  maxProperties?: number;
}

export interface MetaInfoArray {

  minItem?: number;
  arrayType: MetaProperty | null;
  uniqueItems?: boolean;
}

export interface MetaInfoString {

  minLength?: number;
  examples?: string[];
  enumValues?: string[];
  pattern?: string;
  default?: string;
}

export interface MetaInfoReference {

  refType: string[] | undefined;
}

interface MetaPropertyHandler {
  (property: MetaProperty): void;
}

export interface SchemaProperty {

  title: string;
  description?: string;
  type?: string;
  required?: string[];
  minLength?: number;
  examples?: string[];
  enum?: string[];
  pattern?: string;
  default?: string;
  properties: object;
  minItems?: number;
  uniqueItems?: boolean;
  items?: SchemaProperty;
  format?: string;
  minProperties?: number;
  maxProperties?: number;
  oneOf?: SchemaProperty[];
}

function convertRef(
  key: string,
  parentFullName: string[],
  propertyToConvert: SchemaProperty,
  mandatory: boolean,
  root: SchemaProperty,
  parentRefs: Map<string, string[]>,
): null | MetaProperty {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  const refName = propertyToConvert['$ref'];
  let refType: MetaProperty | null = null;

  if (refName.startsWith('https://')) {
    let refJson: SchemaProperty = {title: 'unknown', properties: {}};
    if (refName === 'https://www.first.org/cvss/cvss-v2.0.json') {
      refJson = cvss_v2_0_json;
    } else if (refName === 'https://www.first.org/cvss/cvss-v3.0.json') {
      refJson = cvss_v3_0_json;
    } else if (refName === 'https://www.first.org/cvss/cvss-v3.1.json') {
      refJson = cvss_v3_1_json;
    }
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    refType = convertSchemaPropToMeta(key, parentFullName, refJson, false, refJson, parentRefs);
  } else if (parentRefs.has(refName)) {
    // recursion
    const metaInfo: MetaInfoReference = {
      refType: parentRefs.get(refName),
    };

    refType = {
      key,
      fullName: parentFullName.concat(key),
      title: propertyToConvert.title,
      type: MetaDataType.RECURSION,
      description: propertyToConvert.description,
      mandatory,
      metaInfo,
    };
  } else {
    const refPath: string[] = refName.split('/');
    let refNode = root;
    // refPath starts with # for example: #/$defs/product_id_t
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i < refPath.length; i++) {
      refNode = refNode[refPath[i]];
    }

    const refCopy = new Map(parentRefs);
    refCopy.set(refName, parentFullName.concat(key));
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    refType = convertSchemaPropToMeta(key, parentFullName, refNode, mandatory, root, refCopy);
    if (refType) {
      refType.refTitle = propertyToConvert.title;
      refType.refDescription = propertyToConvert.description;
    }
  }
  return refType;
}

function convertObject(
  key: string,
  parentFullName: string[],
  propertyToConvert: SchemaProperty,
  mandatory: boolean,
  root: SchemaProperty,
  parentRefs: Map<string, string[]>,
): null | MetaProperty {
  const requiredProperties: string[] = (propertyToConvert.required)
    ? propertyToConvert.required : [];
  const objectProperties = (propertyToConvert.properties) ? propertyToConvert.properties : [];

  const metaInfo: MetaInfoObject = {

    propertyList: [],
    minProperties: propertyToConvert.minProperties,
    maxProperties: propertyToConvert.maxProperties,
  };
  metaInfo.propertyList = [];

  const newFullName = (key) ? parentFullName.concat(key) : parentFullName;
  const result: MetaProperty = {
    key,
    fullName: newFullName,
    title: propertyToConvert.title,
    type: MetaDataType.OBJECT,
    description: propertyToConvert.description,
    mandatory,
    metaInfo,
  };

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const propName in objectProperties) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    const subProperty: MetaProperty | null = convertSchemaPropToMeta(
      propName,
      result.fullName,
      objectProperties[propName],
      requiredProperties.includes(propName),
      root,
      parentRefs,
    );
    if (subProperty) {
      metaInfo.propertyList.push(subProperty);
    }
  }
  return result;
}

function convertString(
  key: string,
  parentFullName: string[],
  propertyToConvert: SchemaProperty,
  mandatory: boolean,
): null | MetaProperty {
  let type = MetaDataType.STRING;
  if (propertyToConvert.format === 'uri') {
    type = MetaDataType.URI;
  } else if (propertyToConvert.format === 'date-time') {
    type = MetaDataType.DATETIME;
  }

  const metaInfo: MetaInfoString = {
    minLength: propertyToConvert.minLength,
    examples: propertyToConvert.examples,
    enumValues: propertyToConvert.enum,
    pattern: propertyToConvert.pattern,
    default: propertyToConvert.default,
  };

  const result: MetaProperty = {
    key,
    fullName: parentFullName.concat(key),
    type,
    title: propertyToConvert.title,
    description: propertyToConvert.description,
    mandatory,
    metaInfo,
  };
  return result;
}

function convertArray(
  key: string,
  parentFullName: string[],
  propertyToConvert: SchemaProperty,
  mandatory: boolean,
  root: SchemaProperty,
  parentRefs: Map<string, string[]>,
): null | MetaProperty {
  let arrayType: MetaProperty | null = null;
  if (propertyToConvert.items) {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define,max-len
    arrayType = convertSchemaPropToMeta('', parentFullName.concat(key), propertyToConvert.items, false, root, parentRefs);
    if (arrayType) {
      arrayType.fullName = parentFullName.concat(key);
    }
  }

  const metaInfo: MetaInfoArray = {
    minItem: propertyToConvert.minItems,
    uniqueItems: propertyToConvert.uniqueItems,
    arrayType,
  };

  const result: MetaProperty = {
    key,
    fullName: parentFullName.concat(key),
    title: propertyToConvert.title,
    type: MetaDataType.ARRAY,
    description: propertyToConvert.description,
    mandatory,
    metaInfo,
  };
  return result;
}

/**
 *
 *
 */
export function convertSchemaPropToMeta(
  key: string,
  parentFullName: string[],
  propertyToConvert: SchemaProperty,
  mandatory: boolean,
  root: SchemaProperty,
  parentRefs: Map<string, string[]>,
): null | MetaProperty {
  // eslint-disable-next-line @typescript-eslint/dot-notation
  if (propertyToConvert['$ref']) {
    return convertRef(key, parentFullName, propertyToConvert, mandatory, root, parentRefs);
  }
  if (propertyToConvert.type === 'object') {
    return convertObject(key, parentFullName, propertyToConvert, mandatory, root, parentRefs);
  }
  if (propertyToConvert.type === 'string') {
    return convertString(key, parentFullName, propertyToConvert, mandatory);
  }
  if (propertyToConvert.type === 'array') {
    return convertArray(key, parentFullName, propertyToConvert, mandatory, root, parentRefs);
  }
  if (propertyToConvert.oneOf) {
    const lastProperty = propertyToConvert.oneOf[propertyToConvert.oneOf.length - 1];
    return convertSchemaPropToMeta(key, parentFullName, lastProperty, mandatory, root, parentRefs);
  }
  return null;
}

/**
 * Iterate recursive over the property tree and call the handler for every node
 * @param root start node
 * @param handler handler
 */
function iterateOverProperties(root: MetaProperty, handler: MetaPropertyHandler) {

  handler(root);
  if (root.type === MetaDataType.ARRAY) {
    //iterate over the array type
    root.fullName
    const array = root.metaInfo as MetaInfoArray;
    iterateOverProperties(array.arrayType, handler);
  } else if (root.type === MetaDataType.OBJECT) {
    //iterate all properties of the object
    const object = root.metaInfo as MetaInfoObject;
    object.propertyList.forEach(property => iterateOverProperties(property, handler));
  }
}

/**
 * Create the default additional properties for every object node on the property tree.
 * Create a propertyOrder for every object in the tree with all sub properties of the object
 * @param rootProperty root of the property tree
 */
export function createDefaultAdditionalProperties(rootProperty: MetaProperty) {

  const additionalProperties = {};

  function createPropertiesHandler(property: MetaProperty): void {
    if (property.type === MetaDataType.OBJECT) {
      const object = property.metaInfo as MetaInfoObject;
      const properties = object.propertyList
        .map(metaProp => metaProp.key);
      const fullPropName = property.fullName.join('.');
      additionalProperties[fullPropName] = {propertyOrder: properties};
    }
  }

  iterateOverProperties(rootProperty, createPropertiesHandler);
  return additionalProperties;
}

/**
 * Extends every object in the tree with the properties defined on the additional_props JSON
 * @param rootProperty root node of the tree
 */
export function extendWithAdditionalInfo(rootProperty: MetaProperty) {

  function extendPropertiesHandler(property: MetaProperty): void {
    if (property.type === MetaDataType.OBJECT) {
      const fullPropName = property.fullName.join('.');
      const add_prop = additional_props[fullPropName];
      if (add_prop) {
        Object.assign(property, add_prop);

      }
    }
  }

  iterateOverProperties(rootProperty, extendPropertiesHandler);
}

/**
 * write the metadata of the property tree as JSON file
 * @param rootProperty
 */
function writeMetadataJson(rootProperty: MetaProperty) {

  const jsonMetainfo = JSON.stringify(rootProperty);
  fs.writeFile('./generated/metainfo.json', jsonMetainfo, 'utf8', err => {
    if (err) {
      console.log(`Error writing metadata json file: ${err}`)
    } else {
      console.log(`Metainfo File is written successfully!`)
    }
  })
}

/**
 * write the list of the default additional properties as JSON file
 * @param rootProperty
 */
function writeDefaultAdditionalProperties(rootProperty: MetaProperty) {

  const additionalProperties = createDefaultAdditionalProperties(rootProperty);
  const jsonOrderMapping = JSON.stringify(additionalProperties);
  fs.writeFile('./generated/additionalProperties.json', jsonOrderMapping, 'utf8', err => {
    if (err) {
      console.log(`Error writing file: ${err}`)
    } else {
      console.log(`Additional Properties File is written successfully!`)
    }
  })
}

function writeExtendedMetaInfoAsJavascript(rootProperty: MetaProperty) {

  const extendedSchemaJson = JSON.stringify(rootProperty)
  const outputFile = './generated/schema.js'
  const prettierString = prettier.format(
    '/** @typedef {import(\'./shared/types\').Property} Property */\n' +
    `export default (${extendedSchemaJson})`,
    {
      parser: 'typescript',
      singleQuote: true
    }
  )
  fs.writeFile(outputFile, prettierString, 'utf8', err => {
    if (err) {
      console.log(`Error writing file: ${err}`)
    } else {
      console.log(`Schema Javascript File is written successfully!`)
    }
  })
}

export function convertCsafSchema() {

  const rootProperty: MetaProperty | null = convertSchemaPropToMeta('', [], csaf_json_schema, true, csaf_json_schema, new Map());

  const fs = require('fs')
  if (!fs.existsSync('./generated')) {
    fs.mkdirSync('./generated');
  }

  writeMetadataJson(rootProperty);
  writeDefaultAdditionalProperties(rootProperty);

  extendWithAdditionalInfo(rootProperty);
  writeExtendedMetaInfoAsJavascript(rootProperty);
}

convertCsafSchema()