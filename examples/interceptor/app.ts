import axios from '../../src'

axios.interceptor.request.use(config => {
  config.headers.test += '1'
  return config
})

axios.interceptor.request.use(config => {
  config.headers.test += '2'
  return config
})

axios.interceptor.request.use(config => {
  config.headers.test += '3'
  return config
})

axios.interceptor.response.use(res => {
  res.data += '1'
  return res
})

const interceptor = axios.interceptor.response.use(res => {
  res.data += '2'
  return res
})

axios.interceptor.response.use(res => {
  res.data += '3'
  return res
})

axios.interceptor.response.eject(interceptor)

axios({
  url: '/interceptor/get',
  method: 'get',
  headers: {
    test: 'test'
  }
}).then(res => {
  console.log(res.data)
})
