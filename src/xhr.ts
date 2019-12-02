import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'

let ASYNC: boolean = true

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config
    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, ASYNC)

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      const responseHeaders = request.getAllResponseHeaders()
      const responseData =
        responseType && responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      resolve(response)
    }

    Object.keys(headers).forEach((name: string) => {
      if (data === null && name.toLowerCase() === 'content-Type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
