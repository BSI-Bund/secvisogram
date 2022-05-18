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
