/**
 * 合并策略
 */
import { AxiosRequestConfig } from '../types'
import { deepMerge, isObject } from '../helpers/utils'

const strats = Object.create(null)
// const strats = {} as any

const defaultStrat = (val1: any, val2: any): any => (typeof val2 !== 'undefined' ? val2 : val1)

const fromVal2Strat = (val1: any, val2: any): any => {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const deepMergeStrat = (val1: any, val2: any): any => {
  if (isObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isObject(val1)) {
    return deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysFromVal = ['url', 'params', 'data']
const stratKeysDeepStrat = ['headers']

stratKeysFromVal.forEach((key: string) => {
  strats[key] = fromVal2Strat
})

stratKeysDeepStrat.forEach((key: string) => {
  strats[key] = deepMergeStrat
})

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {}
  }

  const config = Object.create(null)
  // const config = {} as any

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2![key])
  }

  return config
}
