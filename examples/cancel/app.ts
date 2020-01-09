import axios, { Canceler } from '../../src'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios
  .get('/cancel/get')
  .then(res => {
    console.log(res)
  })
  .catch(function(e) {
    if (axios.isCancel(e)) {
      console.log('Request canceled', e.message)
    }
  })

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e)
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

axios
  .get('/cancel/get', {
    cancelToken: new CancelToken(c => {
      cancel = c
    })
  })
  .catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })

setTimeout(() => {
  cancel('123456')
}, 200)
