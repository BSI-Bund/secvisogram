<div id="top"></div>

<!-- PROJECT LOGO -->
<br />
<div align="center">
<h3 align="center">csaf-validator-lib</h3>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li>
          <a href="#api">API</a>
          <ul>
            <li><a href="#interfaces">Interfaces</a></li>
            <li><a href="#module-schematestsjs">Module schemaTests.js</a></li>
            <li><a href="#module-mandatorytestsjs">Module mandatoryTests.js</a></li>
            <li><a href="#module-optionaltestsjs">Module optionalTests.js</a></li>
            <li><a href="#module-informativetestsjs">Module informativeTests.js</a></li>
            <li><a href="#module-validatejs">Module validate.js</a></li>
            <li><a href="#module-stripjs">Module strip.js</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#testing">Testing</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This JavaScript library is intended to include logic that can be shared across application working with CSAF.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Include this repository as a git subtree and install the dependencies. After that you can reference the modules from within your JavaScript application.

### Prerequisites

Include this as a subtree in your repository.

- git subtree
  ```sh
  git subtree add --prefix csaf-validator-lib https://github.com/secvisogram/csaf-validator-lib.git main --squash
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Installation

- Install dependencies
  ```sh
  cd csaf-validator-lib && npm ci --prod
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

- Import the modules in your source
  ```js
  import * as optionalTests from './csaf-validator-lib/optionalTests.js'
  ```

<p align="right">(<a href="#top">back to top</a>)</p>

### API

<p align="right">(<a href="#top">back to top</a>)</p>

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

<p align="right">(<a href="#top">back to top</a>)</p>

#### Module `schemaTests.js`

```typescript
export const csaf_2_0_strict: DocumentTest
export const csaf_2_0: DocumentTest
```

<p align="right">(<a href="#top">back to top</a>)</p>

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

<p align="right">(<a href="#top">back to top</a>)</p>

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

<p align="right">(<a href="#top">back to top</a>)</p>

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

<p align="right">(<a href="#top">back to top</a>)</p>

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

<p align="right">(<a href="#top">back to top</a>)</p>

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

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- TESTING -->

## Testing

Tests are implemented using [mocha](https://mochajs.org/). They can be run using the following command:

```sh
npm test
```

<p align="right">(<a href="#top">back to top</a>)</p>
