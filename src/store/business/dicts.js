import { getDicts } from '@/api/system/dict/data'
import { callWithAsyncErrorHandling } from '@/utils/globalUtil/catchError'
import { isObject } from '@/utils/globalUtil/checkType'
function getOptions(list) {
  return list.map((item) => {
    return {
      label: item.dictLabel,
      value: item.dictValue,
      origin: item,
    }
  })
}
function objectValue(value) {
  return new Promise(async (resolve, reject) => {
    if (value.type === 'cascader') {
      let res = await getDicts(value.path)
      resolve(res.data)
    }
  })
}
const dictStore = defineStore('dictsStroe', {
  state: () => ({
    dictsList: {},
  }),
  actions: {
    async getDicts(key, value, type) {
      const fn = async () => {
        if (!this.dictsList[key] || key === 'status') {
          if (isObject(value)) {
            let res = await objectValue(value)
            this.dictsList[key] = res
          } else {
            let res = await getDicts(value)
            this.dictsList[key] = getOptions(res.data)
          }
        }
        return this.dictsList[key]
      }
      let res = await callWithAsyncErrorHandling(fn)
      return res
    },
    useDicts(key) {
      return this.dictsList[key] || {}
    },
    setDicts(key, value) {
      this.dictsList[key] = value
    },
  },
})

export default dictStore
