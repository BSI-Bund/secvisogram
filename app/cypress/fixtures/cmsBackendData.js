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
 * @param {import('./cmsBackendData/types').Sample} sample
 * @param {object} params
 * @param {string} params.advisoryId
 * @returns
 */
export function getAdvisory(sample, { advisoryId }) {
  const advisory = sample.advisories.find((a) => a.advisoryId === advisoryId)
  if (!advisory) throw new Error('Advisory not found')
  return advisory
}

export function getCreateAdvisoryResponse() {
  return {
    id: '9690e3a3-614f-44be-8709-3aa8d58b6cb5',
    revision: '2-efaa5db9409b2d4300535c70aaf6a66b',
  }
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
