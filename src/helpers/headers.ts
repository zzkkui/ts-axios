import { isObject } from './utils'

function normalizeHeaderName(headers: any, normalizedName: string) {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any) {
  normalizeHeaderName(headers, 'Content-Type')
  if (isObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  if (!headers) {
    return {}
  }
  return headers.split('\r\n').reduce((prev: object, next: string) => {
    let [key, val]: string[] = next.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return prev
    }
    if (val) {
      let obj = Object.create(null)
      obj[key] = val.trim()
      return { ...prev, ...obj }
    }
  }, {})
}
