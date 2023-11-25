import { defineStore } from 'pinia'
import {
  createData,
  deletData,
  editData,
  getPageListData,
} from '@/api/business/main'
import to from '@/utils/to'

export const interceptor = (pageName) => {
  let url = `/${pageName}`
  if (pageName === 'authUserRole') {
    url = '/role'
  }
  return url
}

const deepFindValue = (obj, key, isFirstValue = true) => {
  let finalData
  if (isFirstValue) {
    finalData = undefined
  } else {
    finalData = []
  }
  let isChange = false
  function getList(obj, key) {
    if (!isChange) {
      if (Reflect.toString.call(obj) === '[object Object]') {
        if (obj.hasOwnProperty(key)) {
          if (isFirstValue) {
            finalData = obj[key]
            isChange = true
          } else {
            finalData.push(obj[key])
          }
          return
        } else {
          const objKeys = Object.keys(obj)
          for (let objKey of objKeys) {
            getList(obj[objKey], key)
          }
        }
      }
    }
  }
  getList(obj, key)

  return finalData
}

const getConfig = (pageName, payload, requestUrl) => {
  let url = interceptor(pageName)
  if (!payload.queryInfo) {
    payload.queryInfo = {}
  }
  url += `/${requestUrl}`
  return {
    url,
    payloadInfo: payload,
  }
}
const deleteConfig = (pageName) => {
  return interceptor(pageName)
}
const businessStore = defineStore('business', {
  state: () => {
    return {
      listInfo: {},
    }
  },
  actions: {
    async getList(
      payload,
      listConfig = { listKey: 'rows', countKey: 'total' },
      handleList = (list) => list
    ) {
      const requestUrl = payload.requestUrl ?? 'list'
      // 获取数据
      const fn = async () => {
        const name = payload.pageName
        let pageName = name
        const getListName = `${name}List`
        let { url, payloadInfo } = getConfig(pageName, payload, requestUrl)

        const pageData = await getPageListData(url, {
          ...payloadInfo.queryInfo,
        })
        const list = deepFindValue(pageData, listConfig.listKey)
        const count = deepFindValue(pageData, listConfig.countKey)
        if (list) {
          this.listInfo[getListName] = handleList(list)
        }
        if (count) {
          this.listInfo[`${name}Count`] = count
        }
        return pageData
      }
      let [err, res] = await to(fn())
      if (err) {
        console.log(err)
      }
      return res
    },
    async deletDataAction(payload) {
      // 删除数据
      const fn = async () => {
        const { id, pageName } = payload
        const url = `${deleteConfig(pageName)}/${id}`
        let res = await deletData(url)
        return res
      }
      let [err, res] = await to(fn())
      if (err) {
        console.log(err)
      }
      return res
    },
    async createDataAction(payload, send = true) {
      // 添加数据
      const fn = async () => {
        const { pageName, newData } = payload
        const url = `/${pageName.toLowerCase()}`
        const res = await createData(url, { ...newData })
        return res
      }
      let [err, res] = await to(fn())
      if (err) {
        console.log(err)
      }
      return res
    },
    async editDataAction(payload) {
      // 编辑数据
      const fn = async () => {
        const { pageName, editInfo, id } = payload
        const url = `/${pageName.toLowerCase()}`
        let infoId
        if (payload.sendIdKey) {
          infoId = {
            [`${payload.sendIdKey}`]: id,
          }
        } else {
          infoId = {
            [`${pageName}Id`]: id,
          }
        }
        const info = { ...editInfo, ...infoId }
        let res = await editData(url, info)
        return res
      }
      let [err, res] = await to(fn())
      if (err) {
        console.log(err)
      }
      return res
    },
    resetData(payload) {
      const { pageName } = payload
      const getListName = `${pageName}List`
      this[getListName] = []
      this[`${pageName}Count`] = 0
    },
  },
  getters: {
    pageListData(state) {
      return (pageName) => {
        return state.listInfo[`${pageName}List`]
      }
    },
    listCount() {
      return (pageName) => {
        return this.listInfo[`${pageName}Count`]
      }
    },
  },
})
export default businessStore
