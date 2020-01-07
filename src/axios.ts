import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helpers/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()
  // 给 request 内部绑定this
  const instance = Axios.prototype.request.bind(context)
  // const instance = Axios.prototype.request
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()
// console.dir(axios)
// console.dir(axios.get('get').then(res => console.log(res)))

export default axios
