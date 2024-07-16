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
      const requestBaseUrl = payload.requestBaseUrl ?? '/'
      // 获取数据
      const fn = async () => {
        const name = payload.pageName
        let pageName = name
        const getListName = `${name}List`
        let { url, payloadInfo } = getConfig(
          pageName,
          payload,
          requestUrl,
          requestBaseUrl
        )

        const pageData = await getPageListData(url, {
          ...payloadInfo.queryInfo,
        })
        const list = deepFindValue(pageData, listConfig.listKey)
        const count = deepFindValue(pageData, listConfig.countKey)
        if (list) {
          this.listInfo[getListName] = handleList(list)
        }
        this.listInfo[`${name}Count`] = count || 0
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
        const { id, pageName, requestBaseUrl = '/' } = payload
        let url = ''
        if (payload.delUrl) {
          url = `${payload.delUrl}/${id}`
        } else {
          url = `${requestBaseUrl}${interceptor(pageName)}/${id}`
        }
        let res = await deletData(url)
        return res
      }
      let [err, res] = await to(fn())
      if (err) {
        console.log(err)
      }
      return res
    },
    async createDataAction(payload) {
      // 添加数据
      const fn = async () => {
        const { pageName, newData, requestBaseUrl = '/' } = payload
        const pageNameUrl = interceptor(pageName)
        const url = `${requestBaseUrl}${pageNameUrl}`
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
        let res = await editData(url, info)
        return res
      }
      let [err, res] = await to(fn())
      if (err) {
        console.log(err)
      }
      return res
    },
    resetData(pageName) {
      const getListName = `${pageName}List`
      this.listInfo[getListName] = []
      this.listInfo[`${pageName}Count`] = 0
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
