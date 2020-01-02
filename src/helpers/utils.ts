const _toString = Object.prototype.toString

export function toRawType(val: any) {
  return _toString.call(val).slice(8, -1)
}

export function isDate(val: any): val is Date {
  return toRawType(val) === 'Date'
}

export function isObject(val: any): val is Object {
  return toRawType(val) === 'Object'
}

export function extend<T, U>(to: T, from: U) {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
