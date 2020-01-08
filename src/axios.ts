import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'
import defaults from './defaults'

console.log(defaults)

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  // 给 request 内部绑定this
  const instance = Axios.prototype.request.bind(context)
  // const instance = Axios.prototype.request
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance(defaults)
// console.dir(axios)
// console.dir(axios.get('get').then(res => console.log(res)))

export default axios
