import { AxiosRequestConfig } from './types'

let ASYNC: boolean = true

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get', headers } = config
  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, ASYNC)
  Object.keys(headers).forEach((name: string) => {
    if (data === null && name.toLowerCase() === 'content-Type') {
      delete headers[name]
    } else {
      request.setRequestHeader(name, headers[name])
    }
  })
  request.send(data)
}
