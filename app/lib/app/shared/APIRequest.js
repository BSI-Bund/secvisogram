export default class APIRequest {
  /**
   * @param {Request} request
   */
  constructor(request) {
    /** @protected */
    this.request = request
  }

  /**
   * @param {{ username: string; password: string }} credentials
   */
  basicAuth(credentials) {
    const headers = new Headers(this.request.headers)
    headers.set(
      'authorization',
      `Basic ${btoa(`${credentials.username}:${credentials.password}`)}`
    )
    return new APIRequest(new Request(this.request, { headers }))
  }

  /**
   * @param {string} contentType
   */
  produces(contentType) {
    const { request } = this
    const headers = new Headers(request.headers)
    headers.set('accept', contentType)
    return new APIRequest(
      new Request(request, {
        headers,
      })
    )
  }

  /**
   * @param {{}} body
   */
  jsonRequestBody(body) {
    const { request } = this
    const headers = new Headers(request.headers)
    headers.set('content-type', 'application/json')
    return new APIRequest(
      new Request(request, {
        headers,
        body: JSON.stringify(body),
      })
    )
  }

  async send() {
    const res = await fetch(this.request)
    if (!res.ok) {
      /** @type {any} */
      const error = new Error(res.statusText)
      error.status = res.status
      throw error
    }

    return res
  }
}
