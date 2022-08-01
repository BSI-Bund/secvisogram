# BSI CSAF Validator Lib

- [About The Project](#about-the-project)
- [Getting started](#getting-started)
- [How to use](#how-to-use)
  - [Api](#api)
    - [Interfaces](#interfaces)
    - [Module schemaTests.js](#module-schematestsjs)
    - [Module mandatoryTests.js](#module-mandatorytestsjs)
    - [Module optionalTests.js](#module-optionaltestsjs)
    - [Module informativeTests.js](#module-informativetestsjs)
    - [Module validate.js](#module-validatejs)
    - [Module strip.js](#module-stripjs)
    - [Module cwe.js](#module-cwejs)
- [Testing](#testing)
- [Contributing](#contributing)
- [Dependencies](#dependencies)

## About The Project

This JavaScript library is intended to include logic that can be shared across application working with CSAF.

[(back to top)](#bsi-csaf-validator-lib)

## Getting Started

Currently, there is no npm package. You can include this library as a 
subtree in your repository. After that you can reference the modules from within your JavaScript application.

- include as git subtree
  ```sh
  git subtree add --prefix csaf-validator-lib https://github.com/secvisogram/csaf-validator-lib.git main --squash
  ```

- install dependencies
  ```sh
  cd csaf-validator-lib && npm ci --prod
  ```

[(back to top)](#bsi-csaf-validator-lib)

## How to use

- example usage
  ```js
  import validate from '../csaf-validator-lib/validate.js'
  
  const document = '{}'
  const tests = [
    {
      type: 'preset',
      name: 'mandatory'
    },
    {
      type: 'test',
      name: 'optionalTest_6_2_1'
    }
  ]
  
  const result = await validate(tests, document)
  ```

[(back to top)](#bsi-csaf-validator-lib)

### API

#### Interfaces

```typescript
interface Result {
  isValid: boolean
  warnings: Array<{ message: string; instancePath: string }>
  errors: Array<{ message?: string; instancePath: string }>
  infos: Array<{ message: string; instancePath: string }>
}
```

```typescript
interface TestResult {
  isValid?: boolean
  warnings?: Array<{ message: string; instancePath: string }>
  errors?: Array<{ message?: string; instancePath: string }>
  infos?: Array<{ message: string; instancePath: string }>
}
```

```typescript
/**
 * Every document test has its identifier set as the functions name. You can access
 * it using `<myTest>.name`
 */
type DocumentTest = (doc: any) => TestResult | Promise<TestResult>
```

[(back to top)](#bsi-csaf-validator-lib)

#### Module `schemaTests.js`

```typescript
export const csaf_2_0_strict: DocumentTest
export const csaf_2_0: DocumentTest
```

[(back to top)](#bsi-csaf-validator-lib)

#### Module `mandatoryTests.js`

```typescript
export const mandatoryTest_6_1_1: DocumentTest
export const mandatoryTest_6_1_2: DocumentTest
export const mandatoryTest_6_1_3: DocumentTest
export const mandatoryTest_6_1_4: DocumentTest
export const mandatoryTest_6_1_5: DocumentTest
export const mandatoryTest_6_1_6: DocumentTest
export const mandatoryTest_6_1_7: DocumentTest
export const mandatoryTest_6_1_9: DocumentTest
export const mandatoryTest_6_1_10: DocumentTest
export const mandatoryTest_6_1_11: DocumentTest
export const mandatoryTest_6_1_12: DocumentTest
export const mandatoryTest_6_1_13: DocumentTest
export const mandatoryTest_6_1_14: DocumentTest
export const mandatoryTest_6_1_15: DocumentTest
export const mandatoryTest_6_1_16: DocumentTest
export const mandatoryTest_6_1_17: DocumentTest
export const mandatoryTest_6_1_18: DocumentTest
export const mandatoryTest_6_1_19: DocumentTest
export const mandatoryTest_6_1_20: DocumentTest
export const mandatoryTest_6_1_21: DocumentTest
export const mandatoryTest_6_1_22: DocumentTest
export const mandatoryTest_6_1_23: DocumentTest
export const mandatoryTest_6_1_24: DocumentTest
export const mandatoryTest_6_1_25: DocumentTest
export const mandatoryTest_6_1_26: DocumentTest
export const mandatoryTest_6_1_27_1: DocumentTest
export const mandatoryTest_6_1_27_2: DocumentTest
export const mandatoryTest_6_1_27_3: DocumentTest
export const mandatoryTest_6_1_27_4: DocumentTest
export const mandatoryTest_6_1_27_5: DocumentTest
export const mandatoryTest_6_1_27_6: DocumentTest
export const mandatoryTest_6_1_27_7: DocumentTest
export const mandatoryTest_6_1_27_8: DocumentTest
export const mandatoryTest_6_1_27_9: DocumentTest
export const mandatoryTest_6_1_27_10: DocumentTest
export const mandatoryTest_6_1_27_11: DocumentTest
export const mandatoryTest_6_1_28: DocumentTest
export const mandatoryTest_6_1_29: DocumentTest
export const mandatoryTest_6_1_30: DocumentTest
export const mandatoryTest_6_1_31: DocumentTest
export const mandatoryTest_6_1_32: DocumentTest
export const mandatoryTest_6_1_33: DocumentTest
```

[(back to top)](#bsi-csaf-validator-lib)

#### Module `optionalTests.js`

```typescript
export const optionalTest_6_2_1: DocumentTest
export const optionalTest_6_2_2: DocumentTest
export const optionalTest_6_2_3: DocumentTest
export const optionalTest_6_2_4: DocumentTest
export const optionalTest_6_2_5: DocumentTest
export const optionalTest_6_2_6: DocumentTest
export const optionalTest_6_2_7: DocumentTest
export const optionalTest_6_2_8: DocumentTest
export const optionalTest_6_2_9: DocumentTest
export const optionalTest_6_2_10: DocumentTest
export const optionalTest_6_2_11: DocumentTest
export const optionalTest_6_2_12: DocumentTest
export const optionalTest_6_2_13: DocumentTest
```

[(back to top)](#bsi-csaf-validator-lib)

#### Module `informativeTests.js`

```typescript
export const informativeTest_6_3_1: DocumentTest
export const informativeTest_6_3_2: DocumentTest
export const informativeTest_6_3_3: DocumentTest
export const informativeTest_6_3_4: DocumentTest
export const informativeTest_6_3_5: DocumentTest
export const informativeTest_6_3_6: DocumentTest
export const informativeTest_6_3_7: DocumentTest
```

[(back to top)](#bsi-csaf-validator-lib)

#### Module `validate.js`

```typescript
type ValidateFn = (
  tests: DocumentTest[],
  document: any
) => Promise<{
  tests: Array<{ name: string } & Result>
  isValid: boolean
}>

export default ValidateFn
```

[(back to top)](#bsi-csaf-validator-lib)

#### Module `strip.js`

```typescript
type StripFn = (
  tests: DocumentTest[],
  document: any
) => Promise<{
  document: any
  strippedPaths: {
    instancePath: string
    message: string
    error: boolean
  }[]
}>

export default StripFn
```

[(back to top)](#bsi-csaf-validator-lib)

#### Module `cwe.js`

```typescript
export const weaknesses: Array<{ id: string; name: string }>
```

[(back to top)](#bsi-csaf-validator-lib)

## Testing

Tests are implemented using [mocha](https://mochajs.org/). They can be run using the following command:

```sh
npm test
```

[(back to top)](#bsi-csaf-validator-lib)

## Contributing

You can find our guidelines here [CONTRIBUTING.md](https://github.com/secvisogram/secvisogram/blob/main/CONTRIBUTING.md)

[(back to top)](#bsi-csaf-validator-lib)

## Dependencies

For the complete list of dependencies please take a look at [package.json](https://github.com/secvisogram/csaf-validator-lib/blob/main/package.json)

- [Ajv JSON schema validator](https://github.com/ajv-validator/ajv)
- [JSON Schema formats for Ajv](https://github.com/ajv-validator/ajv-formats)
- [bcp47](https://github.com/gagle/node-bcp47)
- [cvss2js](https://github.com/sparticvs/cvss2js)
- [json-pointer](https://github.com/manuelstofer/json-pointer)
- [lodash](https://lodash.com/)

[(back to top)](#bsi-csaf-validator-lib)
