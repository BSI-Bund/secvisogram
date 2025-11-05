import Ajv from 'ajv/dist/jtd.js'

const ajv = new Ajv()

const fullProductNameSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product_identification_helper: {
      additionalProperties: true,
      optionalProperties: {
        serial_numbers: { elements: { type: 'string' } },
      },
    },
  },
})

const branchSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    branches: {
      elements: {
        additionalProperties: true,
        properties: {},
      },
    },
    product: fullProductNameSchema,
  },
})

const validateBranch = ajv.compile(branchSchema)

/*
  This is the jtd schema that needs to match the input document so that the
  test is activated. If this schema doesn't match, it normally means that the input
  document does not validate against the csaf JSON schema or optional fields that
  the test checks are not present.
 */
const inputSchema = /** @type {const} */ ({
  additionalProperties: true,
  optionalProperties: {
    product_tree: {
      additionalProperties: true,
      optionalProperties: {
        branches: {
          elements: branchSchema,
        },
        full_product_names: {
          elements: fullProductNameSchema,
        },
        relationships: {
          elements: {
            additionalProperties: true,
            optionalProperties: {
              full_product_name: fullProductNameSchema,
            },
          },
        },
      },
    },
  },
})

const validate = ajv.compile(inputSchema)

/**
 * @typedef {import('ajv/dist/core').JTDDataType<typeof branchSchema>} Branch
 * @typedef {import('ajv/dist/core').JTDDataType<typeof fullProductNameSchema>} FullProductName
 */

/**
 * Checks if the `stringToCheck` includes more than one unescaped `*` character. A `*` character
 * can be escaped by prefixing it with a backslash (`\`).
 *
 * @param {string} stringToCheck
 * @return {boolean}
 */
export function containMultipleUnescapedStars(stringToCheck) {
  const regex = /\*/g
  return (
    (stringToCheck
      .replace(/\\\*/g, '') // remove escaped '*'
      .match(regex)?.length ?? 0) > 1 // check if there is more than 1 unescaped '*'
  )
}

/**
 * Validates all given serial numbers and
 * check whether they contain multiple unescaped stars
 *
 * @param {Array<string> | undefined} serialNumbers serial_numbers to check
 * @return {Array<string>} indexes of the serial_numbers that invalid
 */
export function checkSerialNumbers(serialNumbers) {
  /** @type {Array<string>}*/
  const invalidNumbers = []
  if (serialNumbers) {
    for (let i = 0; i < serialNumbers.length; i++) {
      const serialNumber = serialNumbers[i]
      if (containMultipleUnescapedStars(serialNumber)) {
        invalidNumbers.push('' + i)
      }
    }
  }
  return invalidNumbers
}

/**
 * For each serial number, it MUST be tested
 * that it does not contain multiple unescaped stars.
 *
 * @param {unknown} doc
 */
export function mandatoryTest_6_1_44(doc) {
  /*
    The `ctx` variable holds the state that is accumulated during the test run and is
    finally returned by the function.
   */
  const ctx = {
    errors:
      /** @type {Array<{ instancePath: string; message: string }>} */ ([]),
    isValid: true,
  }

  if (!validate(doc)) {
    return ctx
  }

  doc.product_tree?.branches?.forEach((branch, index) => {
    checkBranch(`/product_tree/branches/${index}`, branch)
  })

  doc.product_tree?.full_product_names?.forEach((fullProduceName, index) => {
    checkFullProductName(
      `/product_tree/full_product_names/${index}`,
      fullProduceName
    )
  })

  doc.product_tree?.relationships?.forEach((relationship, index) => {
    const fullProductName = relationship.full_product_name
    if (fullProductName) {
      checkFullProductName(
        `/product_tree/relationships/${index}/full_product_name`,
        fullProductName
      )
    }
  })

  return ctx

  /**
   *  Check whether the serial numbers contain multiple unescaped stars for a full product name object
   *
   * @param {string} prefix The instance path prefix of the "full product name". It is
   *    used to generate error messages.
   * @param {FullProductName} fullProductName The "full product name" object.
   */
  function checkFullProductName(prefix, fullProductName) {
    const invalidNumberIndexes = checkSerialNumbers(
      fullProductName.product_identification_helper?.serial_numbers
    )
    invalidNumberIndexes.forEach((invalidNumberIndex) => {
      ctx.isValid = false
      ctx.errors.push({
        instancePath: `${prefix}/product_identification_helper/serial_numbers/${invalidNumberIndex}`,
        message: 'Serial number contains multiple unescaped stars',
      })
    })
  }

  /**
   * Check whether the model numbers contain multiple unescaped stars for the given branch object
   * and its branch children.
   *
   * @param {string} prefix The instance path prefix of the "branch". It is
   *    used to generate error messages.
   * @param {Branch} branch The "branch" object.
   */
  function checkBranch(prefix, branch) {
    const invalidNumberIndexes = checkSerialNumbers(
      branch.product?.product_identification_helper?.serial_numbers
    )
    invalidNumberIndexes.forEach((invalidNumberIndex) => {
      ctx.isValid = false
      ctx.errors.push({
        instancePath: `${prefix}/product/product_identification_helper/serial_numbers/${invalidNumberIndex}`,
        message: 'Serial number contains multiple unescaped stars',
      })
    })
    branch.branches?.forEach((branch, index) => {
      if (validateBranch(branch)) {
        checkBranch(`${prefix}/branches/${index}`, branch)
      }
    })
  }
}
