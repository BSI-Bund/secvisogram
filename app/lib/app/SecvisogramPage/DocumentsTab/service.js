import APIRequest from '../../shared/APIRequest.js'

export async function getData() {
  const res = await new APIRequest(new Request('/api/2.0/advisories/'))
    .produces('application/json')
    .send()
  const advisories = await res.json()
  return { advisories }
}
