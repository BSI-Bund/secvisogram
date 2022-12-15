# Editor Metadata Script

## About

The Secvisogram editor generates its UI based on the input from
'finalFileNameHere'.
This file contains information from two sources. The CSAF JSON Schema and
additional properties from 'additionalMetadata.json' like the order of
elements, paths to documentation or i18n translation strings.

## Properties

### `addMenuItemsForChildObjects`

The UI can combine parent and child in one menu. This can make sense if
there are many nested objects, each having only a few or no fields.

Example:
```json
"addMenuItemsForChildObjects": true
```

### `uiType`

Some fields need additional logic that can not be derived from the CSAF schema.
This field specifies the correct input component for the given json path.

Available uiTypes:
- STRING_DATETIME
- STRING_URI
- STRING_ENUM
- STRING_WITH_OPTIONS
- STRING_MULTI_LINE
- STRING_PRODUCT_ID
- STRING_GROUP_ID
- OBJECT_CWE
- OBJECT_CVSS_2
- OBJECT_CVSS_3
- ARRAY_REVISION_HISTORY

The `importUiMetaData.js` script can detect `STRING_DATETIME`, `STRING_URI`
and `STRING_ENUM` on its own. All other uiTypes must be provided in the
`metaData.js` file.

### `propertyOrder`

By default, the input fields and menu entries will use the order provided by
the CSAF JSON schema. If you want to change this you can specify the new
order here. You can only specify a subset since all remaining fields will be
displayed in the previous order at the end.

If we have the following object:
```json
{
  "field_a": "",
  "field_b": "",
  "field_c": "",
  "field_d": "",
  "field_e": ""
}
```

You could change the order like so:
```json
"propertyOrder": [
  "field_c",
  "field_a",
  "field_b"
]
```

This would result in the following order `field_c, field_a, field_b, field_d,
field_e`

### `i18n`

The editor will use the translation string specified here to display the
title and description.

```json
"i18n": {
  "title": "",
  "description": ""
},
```

### `userDocumentation`

Specifies the path to user documentation. Currently only the 'usage' file is
displayed in the sidebar.

```json
"userDocumentation": {
  "specification": "docs/user/fileName-spec.en.md",
  "usage": "docs/user/fileName-usage.en.md"
},
```

### `relevanceLevels`

The editor can disable input fields depending on the currently active editor
levels and the selected document profile.

Available profiles:
- csaf_base
- csaf_security_incident_response
- csaf_informational_advisory
- csaf_security_advisory
- csaf_vex

Available relevance levels:
- mandatory
- best_practice
- want_to_have
- optional

Example:
```json
"relevanceLevels": {
  "csaf_base": "optional",
  "csaf_security_incident_response": "optional",
  "csaf_informational_advisory": "optional",
  "csaf_security_advisory": "best_practice",
  "csaf_vex": "want_to_have"
}
```

### `disable`

Some fields need to be disabled depending on the current mode of the Editor.

```json
"disable": {
  "ifStandaloneMode": false,
  "ifServerMode": true
}
```

### `itemName`

For arrays an item name can be given that is shown in the list of items.
This can either be a value of a field in a sub-object for arrays of objects or a translation string.
For a field value use `itemNameField`, for a translation string use `itemNameTranslationKey`.
`itemNameField` will take precedence.
In case no data is provided, the fallback will be retrieved from the translation string `arrays.defaultItemName`.
Translated strings (from `itemName` and `defaultItemName`) will automatically be completed with the item's index.

```json
"itemName": {
  "itemNameTranslationKey": ""
  "itemNameField": ""
}
```
