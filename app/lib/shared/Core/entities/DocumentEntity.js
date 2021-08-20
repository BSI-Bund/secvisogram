/* eslint-disable no-prototype-builtins */
import { parse } from 'json-pointer'
import { cloneDeep } from 'lodash'
import unset from 'lodash/fp/unset'
import isEmpty from 'lodash/isEmpty'
import { major, prerelease, valid } from 'semver'
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
    const entries =
      /** @type {{id: string, name: string, dataPath: string}[]} */ ([])

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
    const entries =
      /** @type {{id: string, name: string, dataPath: string}[]} */ ([])

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
   * This method extends a copy of the current document with data required for the preview and returns the copy.
   *
   * @param {{ document: any }} params
   */
  preview({ document }) {
    const templateDoc = cloneDeep(document)
    const productIds = this.collectProductIds({ document: templateDoc })
    const groupIds = this.collectGroupIds({ document: templateDoc })

    if (templateDoc.document) {
      templateDoc.document.max_base_score = retrieveMaxBaseScore(
        templateDoc.vulnerabilities
      )
      addDocumentNotesPreviewAttributes(templateDoc.document)
    }

    if (templateDoc.product_tree) {
      addProductTreePreviewAttributes(templateDoc.product_tree, productIds)
    }

    const vulnerabilities = templateDoc.vulnerabilities
    if (vulnerabilities) {
      for (let i = 0; i < vulnerabilities.length; ++i) {
        const vulnerability = vulnerabilities[i]
        addProductStatusPreviewAttributes(vulnerability, productIds)
        addRemediationsPreviewAttributes(vulnerability, productIds, groupIds)
        addVulnerabilityNotesPreviewAttributes(vulnerability)
      }
    }

    templateDoc.removeTrailingComma = () => {
      return function (
        /** @type {string} */ text,
        /** @type {function} */ render
      ) {
        var textWithTrailingComma = /** @type {string} */ (render(text))
        const lastIndex = textWithTrailingComma.lastIndexOf(',')
        return lastIndex > 0
          ? textWithTrailingComma.substring(0, lastIndex)
          : textWithTrailingComma
      }
    }

    templateDoc.upperCase = () => {
      return function (
        /** @type {string} */ text,
        /** @type {function} */ render
      ) {
        var renderedText = /** @type {string} */ (render(text))
        return renderedText.charAt(0).toUpperCase() + renderedText.slice(1)
      }
    }

    templateDoc.replaceUnderscores = () => {
      return function (
        /** @type {string} */ text,
        /** @type {function} */ render
      ) {
        var renderedText = /** @type {string} */ (render(text))
        return renderedText.replaceAll('_', ' ')
      }
    }

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

    // 6.1.16 Latest Document Version
    if (
      hasTrackingRevisionHistory(doc) &&
      hasTrackingVersionField(doc) &&
      doc.document.tracking.revision_history.length > 0
    ) {
      if (
        doc.document.tracking.revision_history
          .slice()
          .sort(
            (a, z) => new Date(z.date).getTime() - new Date(a.date).getTime()
          )[0]
          .number.split('+')[0] !== doc.document.tracking.version.split('+')[0]
      ) {
        isValid = false
        errors.push({
          message: 'version does not match latest revision',
          dataPath: '/document/tracking/version',
        })
      }
    }

    // 6.1.17 Document Status Draft
    if (
      hasTrackingVersionField(doc) &&
      hasTrackingStatusField(doc) &&
      doc.document.tracking.status !== 'draft' &&
      (doc.document.tracking.version === '0' ||
        (valid(doc.document.tracking.version) &&
          (major(doc.document.tracking.version) === 0 ||
            prerelease(doc.document.tracking.version))))
    ) {
      isValid = false
      errors.push({
        message: 'the status is not compatible with the version',
        dataPath: '/document/tracking/status',
      })
    }

    // 6.1.18 Released Revision History
    if (
      hasTrackingVersionField(doc) &&
      hasTrackingStatusField(doc) &&
      hasTrackingRevisionHistory(doc) &&
      (doc.document.tracking.status === 'final' ||
        doc.document.tracking.status === 'interim') &&
      doc.document.tracking.revision_history.some(
        (h) => h.number === '0' || (valid(h.number) && major(h.number) === 0)
      )
    ) {
      isValid = false
      errors.push({
        message:
          'some revision-history entries are not compatible with the status',
        dataPath: '/document/tracking/status',
      })
    }

    // 6.1.19 Revision History Entries for Pre-release Versions
    if (
      hasTrackingVersionField(doc) &&
      hasTrackingStatusField(doc) &&
      hasTrackingRevisionHistory(doc)
    ) {
      for (let i = 0; i < doc.document.tracking.revision_history.length; ++i) {
        const entry = doc.document.tracking.revision_history[i]
        if (valid(entry.number) && prerelease(entry.number)) {
          isValid = false
          errors.push({
            message: 'contains prerelease part',
            dataPath: `/document/tracking/revision_history/${i}/number`,
          })
        }
      }
    }

    // 6.1.20 Non-draft Document Version
    if (
      hasTrackingVersionField(doc) &&
      hasTrackingStatusField(doc) &&
      (doc.document.tracking.status === 'final' ||
        doc.document.tracking.status === 'interim') &&
      valid(doc.document.tracking.version) &&
      prerelease(doc.document.tracking.version)
    ) {
      isValid = false
      errors.push({
        message: 'pre-release part is not allowed for status',
        dataPath: `/document/tracking/version`,
      })
    }

    // 6.1.22 Multiple Definition in Revision History
    if (
      hasTrackingVersionField(doc) &&
      hasTrackingStatusField(doc) &&
      hasTrackingRevisionHistory(doc)
    ) {
      /** @type {Record<string, number[]>} */
      let dupes = {}
      doc.document.tracking.revision_history.forEach((item, index) => {
        dupes[item.number] = dupes[item.number] ?? []
        dupes[item.number].push(index)
        if (dupes[item.number].length > 1) {
          isValid = false
          errors.push({
            message: 'version was already used',
            dataPath: `/document/tracking/revision_history/${index}/number`,
          })
        }
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
 * @returns {doc is { document: { tracking: { revision_history: Array<{ number: string; date: string }> } } }}
 */
const hasTrackingRevisionHistory = (doc) =>
  Array.isArray(doc?.document?.tracking?.revision_history) &&
  doc?.document?.tracking?.revision_history.every(
    (/** @type {any} */ r) =>
      typeof r.number === 'string' && typeof r.date === 'string'
  )

/**
 * @param {any} doc
 * @returns {doc is { document: { tracking: { version: string } } }}
 */
const hasTrackingVersionField = (doc) =>
  typeof doc?.document?.tracking?.version === 'string'

/**
 * @param {any} doc
 * @returns {doc is { document: { tracking: { status: string } } }}
 */
const hasTrackingStatusField = (doc) =>
  typeof doc?.document?.tracking?.status === 'string'

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

/**
 * Retrieve the maximum baseScore of all scores
 *
 * @param {{scores: {cvss_v3: {baseScore: string}}[]}[]} vulnerabilities
 */
const retrieveMaxBaseScore = (vulnerabilities) => {
  if (!vulnerabilities) return '0'
  let maxBaseScore = 0
  for (let i = 0; i < vulnerabilities.length; ++i) {
    const vulnerability = vulnerabilities[i]
    const scores = vulnerability.scores
    if (scores) {
      for (let i = 0; i < scores.length; ++i) {
        const score = scores[i]
        const baseScore = Number(score.cvss_v3?.baseScore) ?? 0
        if (maxBaseScore < baseScore) {
          maxBaseScore = baseScore
        }
      }
    }
  }
  return maxBaseScore.toString()
}

/**
 * Categorize all document notes by category
 *
 * @param {any} document
 */
const addDocumentNotesPreviewAttributes = (document) => {
  const summary = []
  const details = []
  const general = []
  const description = []
  const other = []
  const faq = []
  const legalDisclaimer = []
  const unknown = []

  const notes = document.notes
  if (notes) {
    for (let i = 0; i < notes.length; ++i) {
      const note = notes[i]
      switch (note.category) {
        case 'summary':
          summary.push(note)
          break
        case 'details':
          details.push(note)
          break
        case 'general':
          general.push(note)
          break
        case 'description':
          description.push(note)
          break
        case 'other':
          other.push(note)
          break
        case 'faq':
          faq.push(note)
          break
        case 'legal_disclaimer':
          legalDisclaimer.push(note)
          break
        default:
          unknown.push(note)
      }
    }
  }

  document.notes_summary = summary
  document.notes_details = details
  document.notes_general = general
  document.notes_description = description
  document.notes_other = other
  document.notes_faq = faq
  document.notes_legal_disclaimer = legalDisclaimer
  document.notes_unknown = unknown
}

/**
 * Add attributes to all product groups
 *
 * @param {{product_groups: []}} productTree
 * @param {{id: string, name: string}[]} productIds
 */
const addProductTreePreviewAttributes = (productTree, productIds) => {
  const productGroups = productTree.product_groups
  if (productGroups) {
    for (let i = 0; i < productGroups.length; ++i) {
      const productGroup = productGroups[i]
      extendProductGroup(productGroup, productIds)
    }
  }
}

/**
 * Add the full product name to all product groups
 *
 * @param {{product_ids: any}} productGroup
 * @param {{id: string, name: string}[]} extProductIds
 */
const extendProductGroup = (productGroup, extProductIds) => {
  if (productGroup) {
    const extendedProductIds = []
    let productIds = productGroup.product_ids
    if (productIds) {
      for (let i = 0; i < productIds.length; ++i) {
        let productId = productIds[i]
        if (productId) {
          extendedProductIds.push({
            id: productId,
            name: extProductIds.find((e) => e.id === productId)?.name ?? '',
          })
        }
      }
    }
    productGroup.product_ids = extendedProductIds
  }
}

/**
 * Add the full product name to all products in product status
 *
 * @param {{scores: [], product_status: any}} vulnerability
 * @param {*} productIds
 */
const addProductStatusPreviewAttributes = (vulnerability, productIds) => {
  const extendedScoreIds = createExtendedScoreIds(
    vulnerability.scores,
    productIds
  )
  const productStatus = vulnerability.product_status
  if (productStatus) {
    productStatus.known_affected = extendProductStatus(
      productStatus.known_affected,
      extendedScoreIds,
      productIds
    )
    productStatus.first_affected = extendProductStatus(
      productStatus.first_affected,
      extendedScoreIds,
      productIds
    )
    productStatus.last_affected = extendProductStatus(
      productStatus.last_affected,
      extendedScoreIds,
      productIds
    )
    productStatus.known_not_affected = extendProductStatus(
      productStatus.known_not_affected,
      extendedScoreIds,
      productIds
    )
    productStatus.recommended = extendProductStatus(
      productStatus.recommended,
      extendedScoreIds,
      productIds
    )
    productStatus.fixed = extendProductStatus(
      productStatus.fixed,
      extendedScoreIds,
      productIds
    )
    productStatus.first_fixed = extendProductStatus(
      productStatus.first_fixed,
      extendedScoreIds,
      productIds
    )
    productStatus.under_investigation = extendProductStatus(
      productStatus.under_investigation,
      extendedScoreIds,
      productIds
    )
  }
}

/**
 * Collect all product ids with the matching name, vectorString and baseScore
 *
 * @param {*} scores
 * @param {{id: string, name: string}[]} productIds
 */
const createExtendedScoreIds = (scores, productIds) => {
  const extendedProductIds = []
  if (scores) {
    for (let i = 0; i < scores.length; ++i) {
      const score = scores[i]
      const products = score.products
      if (products) {
        for (let j = 0; j < products.length; ++j) {
          const productId = products[j]
          if (productId) {
            extendedProductIds.push({
              id: productId,
              name: productIds.find((e) => e.id === productId)?.name ?? '',
              vectorString: score.cvss_v3?.vectorString ?? '',
              baseScore: score.cvss_v3?.baseScore ?? '',
            })
          }
        }
      }
    }
  }
  return extendedProductIds
}

/**
 * Add full product name to product status
 *
 * @param {any} refs
 * @param {{id: string}[]} extendedScoreIds
 * @param {{id: string;
 *          name: string;
 *        }[]} productIds
 */
const extendProductStatus = (refs, extendedScoreIds, productIds) => {
  const extendedProductStatus = []
  if (refs) {
    for (let i = 0; i < refs.length; ++i) {
      let ref = refs[i]
      if (ref) {
        extendedProductStatus.push(
          extendedScoreIds.find((e) => e.id === ref) ?? {
            id: ref,
            name:
              productIds.find((productId) => productId.id === ref)?.name ?? '',
          }
        )
      }
    }
  }
  return extendedProductStatus
}

/**
 * Categorize all remediations by category
 *
 * @param {any} vulnerability
 * @param {any} productIds
 * @param {any} groupIds
 */
const addRemediationsPreviewAttributes = (
  vulnerability,
  productIds,
  groupIds
) => {
  const vendorFix = []
  const mitigation = []
  const workaround = []
  const noneAvailable = []
  const noFixPlanned = []
  const unknown = []
  const remediations = vulnerability.remediations
  if (remediations) {
    for (let i = 0; i < remediations.length; ++i) {
      const remediation = remediations[i]
      extendRemediation(remediation, productIds, groupIds)
      switch (remediation.category) {
        case 'vendor_fix':
          vendorFix.push(remediation)
          break
        case 'mitigation':
          mitigation.push(remediation)
          break
        case 'workaround':
          workaround.push(remediation)
          break
        case 'none_available':
          noneAvailable.push(remediation)
          break
        case 'no_fix_planned':
          noFixPlanned.push(remediation)
          break
        default:
          unknown.push(remediation)
      }
    }
  }

  vulnerability.remediations_vendor_fix = vendorFix.sort(sortByDate)
  vulnerability.remediations_mitigation = mitigation.sort(sortByDate)
  vulnerability.remediations_workaround = workaround.sort(sortByDate)
  vulnerability.remediations_none_available = noneAvailable.sort(sortByDate)
  vulnerability.remediations_no_fix_planned = noFixPlanned.sort(sortByDate)
  vulnerability.remediations_unknown = unknown.sort(sortByDate)
}

/**
 * Add full product name to remediations
 *
 * @param {{product_ids: any, group_ids: any}} remediation
 * @param {{id: string, name: string}[]} extProductIds
 * @param {{id: string, name: string}[]} extGroupIds
 */
const extendRemediation = (remediation, extProductIds, extGroupIds) => {
  if (remediation) {
    const extendedProductIds = []
    let productIds = remediation.product_ids
    if (productIds) {
      for (let i = 0; i < productIds.length; ++i) {
        let productId = productIds[i]
        if (productId) {
          extendedProductIds.push({
            id: productId,
            name: extProductIds.find((e) => e.id === productId)?.name ?? '',
          })
        }
      }
    }
    remediation.product_ids = extendedProductIds

    const extendedGroupIds = []
    let groupIds = remediation.group_ids
    if (groupIds) {
      for (let i = 0; i < groupIds.length; ++i) {
        let productId = groupIds[i]
        if (productId) {
          extendedGroupIds.push({
            id: productId,
            name: extGroupIds.find((e) => e.id === productId)?.name ?? '',
          })
        }
      }
    }
    remediation.group_ids = extendedGroupIds
  }
}

/**
 * @param {{date: string}} a
 * @param {{date: string}} b
 */
const sortByDate = (a, b) => {
  if (!a && !b) return 0
  if (!a) return 1
  if (!b) return -1
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

/**
 * Categorize all vulnerability notes by category
 *
 * @param {any} vulnerability
 */
const addVulnerabilityNotesPreviewAttributes = (vulnerability) => {
  const summary = []
  const details = []
  const general = []
  const description = []
  const other = []
  const faq = []
  const legalDisclaimer = []
  const unknown = []

  const notes = vulnerability.notes
  if (notes) {
    for (let i = 0; i < notes.length; ++i) {
      const note = notes[i]
      switch (note.category) {
        case 'summary':
          summary.push(note)
          break
        case 'details':
          details.push(note)
          break
        case 'general':
          general.push(note)
          break
        case 'description':
          description.push(note)
          break
        case 'other':
          other.push(note)
          break
        case 'faq':
          faq.push(note)
          break
        case 'legal_disclaimer':
          legalDisclaimer.push(note)
          break
        default:
          unknown.push(note)
      }
    }
  }

  vulnerability.notes_summary = summary
  vulnerability.notes_details = details
  vulnerability.notes_general = general
  vulnerability.notes_description = description
  vulnerability.notes_other = other
  vulnerability.notes_faq = faq
  vulnerability.notes_legal_disclaimer = legalDisclaimer
  vulnerability.notes_unknown = unknown
}
