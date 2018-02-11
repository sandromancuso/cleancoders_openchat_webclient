const matchHost = /^.*\/\/[^/]+:?[0-9]?\//i

const getURI = response => response.config.url.replace(matchHost, '')
const getMethod = response => response.config.method.toUpperCase()
const createErrorText = response => `${getMethod(response)} /${getURI(response)}`

class APIError extends Error {
  constructor (response) {
    super(createErrorText(response))
    this.name = response.data
  }
}

export default APIError
