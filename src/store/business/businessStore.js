import { defineStore } from 'pinia'
import {
  createData,
  deletData,
  editData,
  getPageListData,
} from '@/api/business/main'
import { deepFindValue } from './utils'
import to from '@/utils/to'
import { getUrl } from '@/views/pageName'

export const interceptor = (pageName) => {
  return getUrl(pageName) || `/${pageName}`
}
const getConfig = (pageName, payload, requestUrl, requestBaseUrl) => {
  let url = interceptor(pageName)
  url = `${requestBaseUrl}${url}`
  if (!payload.queryInfo) {
    payload.queryInfo = {}
  }
  url += `/${requestUrl}`
  return {
    url,
    payloadInfo: payload,
  }
}
const getListInfoKeys = (pageName, cacheKey = '') => {
  return {
    listName: `${pageName}${cacheKey}List`,
    countName: `${pageName}${cacheKey}Count`,
  }
}
const businessStore = defineStore('business', {
  state: () => {
    return {
      listInfo: {},
      pageSearchControl: {},
    }
  },
  actions: {
    async getList(
      payload,
      listConfig = { listKey: 'rows', countKey: 'total' },
      handleList = (list) => list
    ) {
      const {
        pageName,
        requestUrl = 'list',
        requestBaseUrl = '/',
        cacheKey = '',
      } = payload
      // let pageName = name
      if (!Object.hasOwn(this.pageSearchControl, `${pageName}SearchShow`)) {
        this.pageSearchControl[`${pageName}SearchShow`] = true
      }
      // 获取数据
      const { listName, countName } = getListInfoKeys(pageName, cacheKey)
      let { url, payloadInfo } = getConfig(
        pageName,
        payload,
        requestUrl,
        requestBaseUrl
      )
      const [pageData, err] = await to(
        getPageListData(url, {
          ...payloadInfo.queryInfo,
        })
      )
      const list = deepFindValue(pageData, listConfig.listKey)
      const count = deepFindValue(pageData, listConfig.countKey)
      if (list) {
        this.listInfo[listName] = handleList(list)
      }
      this.listInfo[countName] = count || 0
      if (err) {
        console.log(err)
      }
      return pageData
    },
    async deletDataAction(payload) {
      // 删除数据
      const { id, pageName, requestBaseUrl = '/' } = payload
      let url = ''
      if (payload.delUrl) {
        url = `${payload.delUrl}/${id}`
      } else {
        url = `${requestBaseUrl}${interceptor(pageName)}/${id}`
      }
      let [res, err] = await to(deletData(url))
      if (err) {
        console.log(err)
      }
      return res
    },
    async createDataAction(payload) {
      // 添加数据
      const { pageName, newData, requestBaseUrl = '/' } = payload
      const pageNameUrl = interceptor(pageName)
      const url = `${requestBaseUrl}${pageNameUrl}`
      const [res, err] = await to(createData(url, { ...newData }))
      if (err) {
        console.log(err)
      }
      return res
    },
    async editDataAction(payload) {
      // 编辑数据
      const { pageName, editInfo, id, requestBaseUrl = '/' } = payload
      const pageNameUrl = interceptor(pageName)
      const url = `${requestBaseUrl}${pageNameUrl}`
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
      const [res, err] = await to(editData(url, info))
      if (err) {
        console.log(err)
      }
      return res
    },
    handlePageSearch(pageName) {
      this.pageSearchControl[`${pageName}SearchShow`] =
        !this.pageSearchControl[`${pageName}SearchShow`]
    },
    resetData(pageName) {
      const { listName, countName } = getListInfoKeys(pageName, cacheKey)
      this.listInfo[listName] = []
      this.listInfo[countName] = 0
    },
  },
  getters: {
    pageListData(state) {
      return (pageName, cacheKey) => {
        const { listName } = getListInfoKeys(pageName, cacheKey)
        return state.listInfo[listName]
      }
    },
    listCount() {
      return (pageName, cacheKey) => {
        const { countName } = getListInfoKeys(pageName, cacheKey)
        return this.listInfo[countName]
      }
    },
  },
})
export default businessStore
