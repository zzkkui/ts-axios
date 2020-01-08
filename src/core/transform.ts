import { AxiosTransformer } from '../types'

export function transform(
  data: any,
  headers: any,
  fn?: AxiosTransformer | AxiosTransformer[]
): any {
  if (!fn) {
    return data
  }
  if (!Array.isArray(fn)) {
    fn = [fn]
  }
  fn.forEach(fn => {
    data = fn(data, headers)
  })
  return data
}
