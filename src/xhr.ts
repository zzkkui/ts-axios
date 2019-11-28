import { AxiosRequestConfig } from './types'

let ASYNC: boolean = true

export default function xhr(config: AxiosRequestConfig) {
  const { data = null, url, method = 'get' } = config
  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, ASYNC)

  request.send(data)
}
