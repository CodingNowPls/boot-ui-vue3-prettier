import { ElMessage } from 'element-plus'
export const interceptorsMes = {
  requestInterceptor(config) {
    if (config.data?.pathologicalType) {
      config.data.pathologicalTypeOne = config.data.pathologicalType[0]
      config.data.pathologicalTypeTwo = config.data.pathologicalType[1]
      delete config.data.pathologicalType
    }
    if (config.params?.pathologicalType) {
      config.params.pathologicalTypeOne = config.params.pathologicalType[0]
      config.params.pathologicalTypeTwo = config.params.pathologicalType[1]
      delete config.params.pathologicalType
    }
    return config
  },
  responseInterceptor(data) {
    let { msg } = data
    if (msg && msg != '' && msg !== '查询成功' && data.code === 200) {
      ElMessage({
        type: 'success',
        message: msg,
        grouping: true,
      })
    }
    return data
  },
}
export const interceptorsData = {
  responseInterceptor(res) {
    if (res.data) {
      const data = res.data
      let arr = []
      if (data.pathologicalTypeOne) {
        arr[0] = data.pathologicalTypeOne
      }
      if (data.pathologicalTypeTwo) {
        arr[1] = data.pathologicalTypeTwo
      }
      if (!data.pathologicalType && arr.length !== 0) {
        data.pathologicalType = arr
      }
    }
    return res
  },
}
