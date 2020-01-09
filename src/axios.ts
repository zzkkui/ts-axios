import { AxiosRequestConfig, AxiosStatic } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'
import mergeConfig from './core/mergeConfig'
import CancelToken from './cancel/CancelToken'
import Cancel, { isCancel } from './cancel/Cancel'

// console.log(defaults)

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config)
  // 给 request 内部绑定this
  const instance = Axios.prototype.request.bind(context)
  // const instance = Axios.prototype.request
  extend(instance, context)
  return instance as AxiosStatic
}

const axios = createInstance(defaults)
// console.dir(axios)
// console.dir(axios.get('get').then(res => console.log(res)))

axios.create = (config: AxiosRequestConfig) => createInstance(mergeConfig(defaults, config))
axios.CancelToken = CancelToken
axios.Cancel = Cancel
axios.isCancel = isCancel

console.dir(axios)

export default axios
