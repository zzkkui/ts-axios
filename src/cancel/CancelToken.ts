import { CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

/**
 * @description reason 是 对象
 * @param {reason: Cancel}
 * @param {promise: Promise}
 *
 * @export
 * @class CancelToken
 */
export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel

  constructor(executor: CancelExecutor) {
    let resolvePromise: ResolvePromise
    // 定义一个 pending 的 Promise
    this.promise = new Promise(resolve => {
      // 把 resolve 暴露出去， 以便异步执行 resolve，再执行 then 回调
      resolvePromise = resolve
    })

    // executor = c => { cancel = c }
    // c == message => {
    //   if (this.reason) {
    //     return
    //   }
    //   this.reason = new Cancel(message)
    //   resolvePromise(this.reason)
    // }
    executor(message => {
      if (this.reason) {
        return
      }
      this.reason = new Cancel(message)
      resolvePromise(this.reason)
    })
  }

  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }

  static source(): CancelTokenSource {
    let cancel!: Canceler
    // 这里会把 c(executor) 的参数赋值给 cancel 暴露出去
    // 执行 cancel 其实是执行 executor 的参数，从而执行了 Promise 的 resolve
    const token = new CancelToken(c => {
      cancel = c
    })
    return {
      cancel,
      token
    }
  }
}
