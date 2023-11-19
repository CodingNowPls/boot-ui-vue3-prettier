import { BASE_URL, TIME_OUT } from './request/config'
import LmwAxios from './request/index'
import errorCode from '@/utils/errorCode'
import { ElNotification, ElMessage } from 'element-plus'
import { getToken } from '@/utils/auth'
import session from '@/utils/hsj/useSession'
export let isRelogin = { show: false }
const LmwRequest = new LmwAxios({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 单个实例的拦截
  interceptors: {
    // 请求拦截
    requestInterceptor: (config) => {
      // 是否需要设置 token
      const isToken = (config.headers || {}).isToken === false
      // 是否需要防止数据重复提交
      const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
      if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      }
      if (
        !isRepeatSubmit &&
        (config.method === 'post' || config.method === 'put')
      ) {
        const requestObj = {
          url: config.url,
          data:
            typeof config.data === 'object'
              ? JSON.stringify(config.data)
              : config.data,
          time: new Date().getTime(),
        }
        const requestSize = Object.keys(JSON.stringify(requestObj)).length // 请求数据大小
        const limitSize = 5 * 1024 * 1024 // 限制存放数据5M
        if (requestSize >= limitSize) {
          console.warn(
            `[${config.url}]: ` +
              '请求数据大小超出允许的5M限制，无法进行防重复提交验证。'
          )
          return config
        }
        const sessionObj = session.get('sessionObj')
        if (sessionObj) {
          const s_url = sessionObj.url // 请求地址
          const s_data = sessionObj.data // 请求数据
          const s_time = sessionObj.time // 请求时间
          const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
          if (
            s_data === requestObj.data &&
            requestObj.time - s_time < interval &&
            s_url === requestObj.url
          ) {
            const message = '数据正在处理，请勿重复提交'
            console.warn(`[${s_url}]: ` + message)
            return Promise.reject(new Error(message))
          } else {
            session.set('sessionObj', requestObj)
          }
        } else {
          session.set('sessionObj', requestObj)
        }
      }
      return config
    },
    requestInterceptorCatch: (error) => {
      Promise.reject(error)
      return error
    },
    //  响应拦截
    responseInterceptor: (res) => {
      // 未设置状态码则默认成功状态
      const code = res.data.code || 200
      // 获取错误信息
      const msg = errorCode[code] || res.data.msg || errorCode['default']
      // 二进制数据则直接返回
      if (
        res.request.responseType === 'blob' ||
        res.request.responseType === 'arraybuffer'
      ) {
        return Promise.resolve(res.data)
      }
      if (code === 401) {
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
      } else if (code === 500) {
        ElMessage.error({
          message: msg ?? '后端 500 报错',
          showClose: true,
          duration: 5000,
          grouping: true,
        })
        return Promise.reject(`msg:${msg},code:${code}`)
      } else if (code !== 200) {
        ElNotification.error({
          title: msg,
        })
        return Promise.reject(res.data)
      } else {
        return Promise.resolve(res.data)
      }
    },
    responseInterceptorCatch: (error) => {
      let { message } = error
      if (message) {
        if (message == 'Network Error') {
          message = '后端接口连接异常'
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时'
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substr(message.length - 3) + '异常'
        }
        if (error.response.status !== 304) {
          ElMessage({
            message: message,
            type: 'error',
            duration: 5 * 1000,
            showClose: true,
          })
        }
      }
      return Promise.reject(error)
    },
  },
})
export default LmwRequest
export const request = (config) => {
  return LmwRequest.request(config)
}
