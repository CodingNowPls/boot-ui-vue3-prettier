import { ElMessage } from 'element-plus'
import { isFunction, isPromise } from './checkType'

export function callWithErrorHandling(fn, ...args) {
  let res
  try {
    res = args ? fn(...args) : fn()
  } catch (error) {
    handleError(error)
  }
  return res
}

export function callWithAsyncErrorHandling(fn, ...args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, ...args)
    if (res && isPromise(res)) {
      return new Promise((resolve, reject) => {
        res
          .then((info) => {
            return resolve(info)
          })
          .catch((error) => {
            handleError(error)
            // 为了方便使用await进行调用所以这里采用了resolve，没用reject
            // reject(error)
            resolve(false)
          })
      })
    }
  }
}

const handleError = (error) => {
  ElMessage.error({
    message: 'Front end Error: ' + error,
  })
  return error
}
