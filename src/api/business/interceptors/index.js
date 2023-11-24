import { ElNotification } from 'element-plus'
export const interceptorsMes = {
  requestInterceptor(config) {
    return config
  },
  responseInterceptor(data) {
    // let { msg } = data
    // if (msg && msg != '' && msg !== '查询成功' && data.code === 200) {
    //   ElNotification({
    //     type: 'success',
    //     message: msg,
    //   })
    // }
    return data
  },
}
export const interceptorsData = {
  responseInterceptor(res) {
    return res
  },
}
