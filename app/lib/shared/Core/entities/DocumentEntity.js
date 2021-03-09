/* eslint-disable no-prototype-builtins */
import { parse } from 'json-pointer'
import unset from 'lodash/fp/unset'
import isEmpty from 'lodash/isEmpty'
import cwec from '../cwec_4.3.json'
import icann from './DocumentEntity/subtags.json'

/**
 * This class abstracts central logic regarding the json-document used
 * multiple times within the `Core`.
 */
export default class DocumentEntity {
  /**
   * @param {{ schemaValidator: import('ajv').ValidateFunction<unknown>}} params
   */
  constructor({ schemaValidator }) {
    /** @private */
    this.schemaValidator = schemaValidator
  }

  /**
   * This method validates the given document and returns a result object.
   *
   * @param {{ document: {} }} params
   */
  validate({ document }) {
    return this.validateDoc(document)
  }

  /**
   * @typedef {Object} FullProductName
   * @property {string} name
   * @property {string} product_id
   */

  /**
   * @typedef {Object} Branch
   * @property {Array<Branch>} branches
   * @property {FullProductName} product
   */

  /**
   * @typedef {Object} ProductGroup
   * @property {string} summary
   * @property {string} group_id
   */

  /**
   * This method collects definitions of product ids and corresponding names and dataPaths in the given document and returns a result object.
   * @param {any} document
   * @returns {{id: string, name: string, dataPath: string}[]}
   */
  collectProductIds({ document }) {
    const entries = /** @type {{id: string, name: string, dataPath: string}[]} */ ([])

    const fullProductNames = document.product_tree?.full_product_names
    if (fullProductNames) {
      for (let i = 0; i < fullProductNames.length; ++i) {
        const fullProductName = fullProductNames[i]
        if (fullProductName.product_id) {
          entries.push({
            id: fullProductName.product_id,
            name: fullProductName.name ?? '',
            dataPath: `/product_tree/full_product_names/${i}/product_id`,
          })
        }
      }
    }

    const relationships = document.product_tree?.relationships
    if (relationships) {
      for (let i = 0; i < relationships.length; ++i) {
        const relationship = relationships[i]
        const fullProductName = relationship.full_product_name
        if (fullProductName) {
          if (fullProductName.product_id) {
            entries.push({
              id: fullProductName.product_id,
              name: fullProductName.name ?? '',
              dataPath: `/product_tree/relationships/${i}/full_product_name/product_id`,
            })
          }
        }
      }
    }

    const branches = document.product_tree?.branches
    if (branches) {
      traverseBranches(branches, entries, '/product_tree/branches')
    }

    return entries
  }

  /**
   * This method collects references to product ids and corresponding dataPaths in the given document and returns a result object.
   * @param {any} document
   * @returns {{id: string, dataPath: string}[]}
   */
  collectProductIdRefs({ document }) {
    const entries = /** @type {{id: string, dataPath: string}[]} */ ([])

    const productGroups = document.product_tree?.product_groups
    if (productGroups) {
      for (let i = 0; i < productGroups.length; ++i) {
        const productGroup = productGroups[i]
        const productIds = productGroup.product_ids
        if (productIds) {
          for (let j = 0; j < productIds.length; ++j) {
            const productId = productIds[j]
            if (productId) {
              entries.push({
                id: productId,
                dataPath: `/product_tree/product_groups/${i}/product_ids/${j}`,
              })
            }
          }
        }
      }
    }

    const relationshipGroups = document.product_tree?.relationships
    if (relationshipGroups) {
      for (let i = 0; i < relationshipGroups.length; ++i) {
        const relationshipGroup = relationshipGroups[i]
        const productRef = relationshipGroup.product_reference
        if (productRef) {
          entries.push({
            id: productRef,
            dataPath: `/product_tree/relationships/${i}/product_reference`,
          })
        }
        const relToProductRef = relationshipGroup.relates_to_product_reference
        if (relToProductRef) {
          entries.push({
            id: relToProductRef,
            dataPath: `/product_tree/relationships/${i}/relates_to_product_reference`,
          })
        }
      }
    }

    const vulnerabilities = document.vulnerabilities
    if (vulnerabilities) {
      for (let i = 0; i < vulnerabilities.length; ++i) {
        const vulnerability = vulnerabilities[i]
        collectRefsInProductStatus(
          `/vulnerabilities/${i}/product_status`,
          vulnerability,
          entries
        )
        collectProductRefsInRemediations(
          `/vulnerabilities/${i}/remediations`,
          vulnerability,
          entries
        )
        collectRefsInScores(
          `/vulnerabilities/${i}/scores`,
          vulnerability,
          entries
        )
        collectProductRefsInThreats(
          `/vulnerabilities/${i}/threats`,
          vulnerability,
          entries
        )
      }
    }

    return entries
  }

  /**
   * This method collects group ids and corresponding dataPaths in the given document and returns a result object.
   *
   * @param {any} document
   * @returns {{id: string, name: string, dataPath: string}[]}
   */
  collectGroupIds({ document }) {
    const entries = /** @type {{id: string, name: string, dataPath: string}[]} */ ([])

    const productGroups = document.product_tree?.product_groups
    if (productGroups) {
      for (let i = 0; i < productGroups.length; ++i) {
        const productGroup = productGroups[i]
        if (productGroup.group_id) {
          entries.push({
            id: productGroup.group_id,
            name: productGroup.summary ?? '',
            dataPath: `/product_tree/product_groups/${i}/group_id`,
          })
        }
      }
    }

    return entries
  }

  /**
   * This method collects references to group ids and corresponding dataPaths in the given document and returns a result object.
   * @param {any} document
   * @returns {{id: string, dataPath: string}[]}
   */
  collectGroupIdRefs({ document }) {
    const entries = /** @type {{id: string, dataPath: string}[]} */ ([])

    const vulnerabilities = document.vulnerabilities
    if (vulnerabilities) {
      for (let i = 0; i < vulnerabilities.length; ++i) {
        const vulnerability = vulnerabilities[i]
        collectGroupRefsInRemediations(
          `/vulnerabilities/${i}/remediations`,
          vulnerability,
          entries
        )
        collectGroupRefsInThreats(
          `/vulnerabilities/${i}/threats`,
          vulnerability,
          entries
        )
      }
    }

    return entries
  }

  /**
   * This method encapsulates the strip-algorithm to generate either a valid or
   * an empty document.
   *
   * @param {{ document: {} }} params
   */
  strip({ document }) {
    /** @type {Array<{ dataPath: string; message: string; error: boolean }>} */
    const strippedPaths = []

    /**
     * @param {{}} doc
     * @param {string} dataPath
     * @returns {{}}
     */
    const deleteEmptyNodes = (doc, dataPath) => {
      if (typeof doc === 'string' || typeof doc === 'number') return doc
      if (Array.isArray(doc))
        return doc.map((item, i) => deleteEmptyNodes(item, `${dataPath}/${i}`))
      return {
        ...Object.fromEntries(
          Object.entries(doc)
            .filter(([key, value]) => {
              const valueIsEmpty =
                value === '' ||
                value === null ||
                (typeof value === 'object' && isEmpty(value))

              if (valueIsEmpty) {
                strippedPaths.push({
                  dataPath: `${dataPath}/${key}`,
                  message: 'value was empty',
                  error: false,
                })
              }
              return !valueIsEmpty
            })
            .map(([key, value]) => [
              key,
              deleteEmptyNodes(value, `${dataPath}/${key}`),
            ])
        ),
      }
    }

    const documentWithoutEmptyNodes = deleteEmptyNodes(document, '')
    let errorStrippedDocument = documentWithoutEmptyNodes
    /**
     * @type {Array<{
     *    message?: string
     *    dataPath: string
     *  }>}
     */
    let errors
    do {
      errors = this.validateDoc(errorStrippedDocument).errors
      errorStrippedDocument = JSON.parse(
        JSON.stringify(
          errors.reduce((updatedDoc, error) => {
            strippedPaths.push({
              dataPath: error.dataPath,
              error: true,
              message: /** @type {string} */ (error.message),
            })
            const parsedDataPath = parse(error.dataPath).join('.')
            if (parsedDataPath === '') return {}
            return unset(parsedDataPath, updatedDoc)
          }, errorStrippedDocument),
          (_, value) => {
            if (Array.isArray(value)) {
              return value.filter((e) => e !== undefined)
            }
            return value
          }
        )
      )
    } while (
      errors &&
      errors.length &&
      Object.keys(errorStrippedDocument).length > 0
    )
    return { document: errorStrippedDocument, strippedPaths }
  }

  /**
   * This method extends the current document with data required for preview and returns the extended document.
   *
   * @param {{ document: any }} params
   */
  preview({ document }) {
    const templateDoc = { ...document }
    return { document: templateDoc }
  }

  /**
   * @param {unknown} doc
   * @private
   */
  validateDoc(doc) {
    let isValid = this.schemaValidator(doc)
    /**
     * @type {Array<{
     *    message?: string
     *    dataPath: string
     *  }>}
     */
    const errors = this.schemaValidator.errors ?? []
    if (hasLangField(doc)) {
      if (!icann.subtags.find((s) => s.subtag === doc.document.lang)) {
        isValid = false
        errors.push({
          message: 'is not a valid language-tag',
          dataPath: '/document/lang',
        })
      }
    }
    if (hasSourceLangField(doc)) {
      if (!icann.subtags.find((s) => s.subtag === doc.document.source_lang)) {
        isValid = false
        errors.push({
          message: 'is not a valid language-tag',
          dataPath: '/document/source_lang',
        })
      }
    }
    if (hasVulnerabilities(doc)) {
      for (let i = 0; i < doc.vulnerabilities.length; ++i) {
        const vulnerability = doc.vulnerabilities[i]
        if (vulnerabilityHasCWEFields(vulnerability)) {
          const entry = cwec.weaknesses.find(
            (w) => w.id === vulnerability.cwe.id
          )
          if (!entry) {
            isValid = false
            errors.push({
              dataPath: `/vulnerabilities/${i}/cwe/id`,
              message: 'no weakness with this id is recognized',
            })
            continue
          }
          if (entry.name !== vulnerability.cwe.name) {
            isValid = false
            errors.push({
              dataPath: `/vulnerabilities/${i}/cwe/name`,
              message: 'the name does not match the weakness with the given id',
            })
            continue
          }
        }
      }
    }
    const productIds = this.collectProductIds({ document: doc })
    const duplicateProductIds = findDuplicateEntries(productIds)
    if (duplicateProductIds.length > 0) {
      isValid = false
      duplicateProductIds.forEach((duplicateProductId) => {
        errors.push({
          message: 'duplicate definition product id',
          dataPath: duplicateProductId.dataPath,
        })
      })
    }
    const groupIds = this.collectGroupIds({ document: doc })
    const duplicateGroupIds = findDuplicateEntries(groupIds)
    if (duplicateGroupIds.length > 0) {
      isValid = false
      duplicateGroupIds.forEach((duplicateEntry) => {
        errors.push({
          message: 'duplicate definition product group id',
          dataPath: duplicateEntry.dataPath,
        })
      })
    }
    const productIdRefs = this.collectProductIdRefs({ document: doc })
    const missingProductDefinitions = findMissingDefinitions(
      productIds,
      productIdRefs
    )
    if (missingProductDefinitions.length > 0) {
      isValid = false
      missingProductDefinitions.forEach((missingProductDefinition) => {
        errors.push({
          message: 'definition of product id missing',
          dataPath: missingProductDefinition.dataPath,
        })
      })
    }
    const groupIdRefs = this.collectGroupIdRefs({ document: doc })
    const missingGroupDefinitions = findMissingDefinitions(
      groupIds,
      groupIdRefs
    )
    if (missingGroupDefinitions.length > 0) {
      isValid = false
      missingGroupDefinitions.forEach((missingGroupDefinition) => {
        errors.push({
          message: 'definition of group id missing',
          dataPath: missingGroupDefinition.dataPath,
        })
      })
    }

    return {
      isValid,
      errors: errors,
    }
  }
}

/**
 * @param {any} doc
 * @returns {doc is { document: { lang: string } }}
 */
const hasLangField = (doc) =>
  doc && doc.document && typeof doc.document.lang === 'string' ? true : false

/**
 * @param {any} doc
 * @returns {doc is { document: { source_lang: string } }}
 */
const hasSourceLangField = (doc) =>
  doc && doc.document && typeof doc.document.source_lang === 'string'
    ? true
    : false

/**
 * @param {any} doc
 * @returns {doc is { vulnerabilities: Array<unknown> }}
 */
const hasVulnerabilities = (doc) =>
  doc && Array.isArray(doc.vulnerabilities) ? true : false

/**
 * @param {any} vulnerability
 * @returns {vulnerability is { cwe: { id: string; name: string } }}
 */
const vulnerabilityHasCWEFields = (vulnerability) =>
  vulnerability &&
  vulnerability.cwe &&
  typeof vulnerability.cwe.id === 'string' &&
  typeof vulnerability.cwe.name === 'string'
    ? true
    : false

/**
 * @param {Array<Branch>} branches
 * @param {{id: string, name: string, dataPath: string}[]} entries
 * @param {string} dataPath
 */
const traverseBranches = (branches, entries, dataPath) => {
  for (let i = 0; i < branches.length; ++i) {
    const branch = branches[i]
    const branchDataPath = `${dataPath}/${i}`
    const fullProductName = branch.product
    if (fullProductName) {
      if (fullProductName.product_id) {
        entries.push({
          id: fullProductName.product_id,
          name: fullProductName.name ?? '',
          dataPath: `${branchDataPath}/product/product_id`,
        })
      }
    }
    if (branch.branches)
      traverseBranches(branch.branches, entries, `${branchDataPath}/branches`)
  }
}

/**
 * @param {{id: string, name: string, dataPath: string}[]} entries
 */
const findDuplicateEntries = (entries) => {
  const lookup = entries.reduce((/** @type {any} */ a, entry) => {
    a[entry.id] = ++a[entry.id] || 0
    return a
  }, {})

  return entries.filter((entry) => lookup[entry.id])
}

/**
 * @param {{id: string}[]} entries
 * @param {{id: string, dataPath: string}[]} refs
 */
const findMissingDefinitions = (entries, refs) => {
  return refs.filter(
    (ref) => entries.find((e) => e.id === ref.id) === undefined
  )
}

/**
 * @param {string[]} refs
 * @param {string} dataPath
 * @param {{id: string, dataPath: string}[]} entries
 */
const findRefsInProductStatus = (refs, dataPath, entries) => {
  if (refs) {
    for (let i = 0; i < refs.length; ++i) {
      const ref = refs[i]
      if (ref) {
        entries.push({
          id: ref,
          dataPath: `${dataPath}/${i}`,
        })
      }
    }
  }
}

/**
 * @param {string} dataPath
 * @param {{product_status: any}} vulnerability
 * @param {*} entries
 */
const collectRefsInProductStatus = (dataPath, vulnerability, entries) => {
  findRefsInProductStatus(
    vulnerability.product_status?.first_affected,
    `${dataPath}/first_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.first_fixed,
    `${dataPath}/first_fixed`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.fixed,
    `${dataPath}/fixed`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.known_affected,
    `${dataPath}/known_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.known_not_affected,
    `${dataPath}/known_not_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.last_affected,
    `${dataPath}/last_affected`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.recommended,
    `${dataPath}/recommended`,
    entries
  )
  findRefsInProductStatus(
    vulnerability.product_status?.under_investigation,
    `${dataPath}/under_investigation`,
    entries
  )
}

/**
 * @param {string} dataPath
 * @param {{remediations: any}} vulnerability
 * @param {*} entries
 */
const collectProductRefsInRemediations = (dataPath, vulnerability, entries) => {
  const remediations = vulnerability.remediations
  if (remediations) {
    for (let i = 0; i < remediations.length; ++i) {
      const remediation = remediations[i]
      const productIds = remediation.product_ids
      if (productIds) {
        for (let j = 0; j < productIds.length; ++j) {
          const productId = productIds[j]
          if (productId) {
            entries.push({
              id: productId,
              dataPath: `${dataPath}/${i}/product_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} dataPath
 * @param {{scores: any}} vulnerability
 * @param {*} entries
 */
const collectRefsInScores = (dataPath, vulnerability, entries) => {
  const scores = vulnerability.scores
  if (scores) {
    for (let i = 0; i < scores.length; ++i) {
      const score = scores[i]
      const products = score.products
      if (products) {
        for (let j = 0; j < products.length; ++j) {
          const productId = products[j]
          if (productId) {
            entries.push({
              id: productId,
              dataPath: `${dataPath}/${i}/products/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} dataPath
 * @param {{threats: any}} vulnerability
 * @param {*} entries
 */
const collectProductRefsInThreats = (dataPath, vulnerability, entries) => {
  const threats = vulnerability.threats
  if (threats) {
    for (let i = 0; i < threats.length; ++i) {
      const threat = threats[i]
      const productIds = threat.product_ids
      if (productIds) {
        for (let j = 0; j < productIds.length; ++j) {
          const productId = productIds[j]
          if (productId) {
            entries.push({
              id: productId,
              dataPath: `${dataPath}/${i}/product_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} dataPath
 * @param {{remediations: any}} vulnerability
 * @param {*} entries
 */
const collectGroupRefsInRemediations = (dataPath, vulnerability, entries) => {
  const remediations = vulnerability.remediations
  if (remediations) {
    for (let i = 0; i < remediations.length; ++i) {
      const remediation = remediations[i]
      const groupIds = remediation.group_ids
      if (groupIds) {
        for (let j = 0; j < groupIds.length; ++j) {
          const groupId = groupIds[j]
          if (groupId) {
            entries.push({
              id: groupId,
              dataPath: `${dataPath}/${i}/group_ids/${j}`,
            })
          }
        }
      }
    }
  }
}

/**
 * @param {string} dataPath
 * @param {{threats: any}} vulnerability
 * @param {*} entries
 */
const collectGroupRefsInThreats = (dataPath, vulnerability, entries) => {
  const threats = vulnerability.threats
  if (threats) {
    for (let i = 0; i < threats.length; ++i) {
      const threat = threats[i]
      const groupIds = threat.group_ids
      if (groupIds) {
        for (let j = 0; j < groupIds.length; ++j) {
          const groupId = groupIds[j]
          if (groupId) {
            entries.push({
              id: groupId,
              dataPath: `${dataPath}/${i}/group_ids/${j}`,
            })
          }
        }
      }
    }
  }
}
