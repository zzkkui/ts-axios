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

export function deepMerge(...objs: any[]) {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isObject(val)) {
          if (isObject(result[key])) {
            // 如果 result[key] 有值并且是个对象，则 merge result[key] 和 val
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
