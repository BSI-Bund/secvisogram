import templates from './cmsBackendData/templates.js'
import testsSample from './samples/cmsBackendData/tests.js'

const users = /** @type {const} */ ([
  {
    user: 'editor',
    preferredUsername: 'editor',
    email: '',
    groups: ['editor'],
  },
])

/**
 * @param {import('./cmsBackendData/types').Sample} sample
 * @returns
 */
export function getAdvisories(sample) {
  return sample.advisoriesList
}

/**
 * @param {object} params
 * @param {string} params.advisoryId
 * @returns
 */
export function getAdvisory({ advisoryId }) {
  const advisory = testsSample.advisories.find(
    (a) => a.advisoryId === advisoryId
  )
  if (!advisory) throw new Error('Advisory not found')
  return advisory
}

export function getCreateAdvisoryResponse() {
  return {
    id: '9690e3a3-614f-44be-8709-3aa8d58b6cb5',
    revision: '2-efaa5db9409b2d4300535c70aaf6a66b',
  }
}

export function getTemplates() {
  return templates
}

export function getGetTemplatesResponse() {
  return templates.map((t) => ({
    templateId: t.templateId,
    templateDescription: t.templateDescription,
  }))
}

/**
 * @param {object} params
 * @param {{ templateContent: {} }} params.template
 */
export function getGetTemplateContentResponse({ template }) {
  return template.templateContent
}

/**
 * @param {object} params
 * @param {{ advisoryId: string }} params.advisory
 */
export function getGetAdvisoryDetailResponse({ advisory }) {
  const res = testsSample.advisories.find(
    (a) => a.advisoryId === advisory.advisoryId
  )
  if (!res) throw new Error('Advisory not found')
  return res
}

/**
 * @param {(typeof users)[number]} user
 */
export function getUserInfo(user) {
  return user
}

export function getUsers() {
  return users
}
