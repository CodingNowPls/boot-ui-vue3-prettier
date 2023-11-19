import { isRef, ref } from 'vue'
import { isFunction } from '@/utils/globalUtil/checkType'
import useDictsStore from '@/store/business/dicts'
const dictsStore = useDictsStore()

export default (dictsMap) => {
  const dictsObj = ref({})
  for (const [key, value] of Object.entries(dictsMap)) {
    dictsObj.value[key] = []
    if (typeof value === 'string') {
      dictsStore.getDicts(key, value).then((res) => {
        dictsObj.value[key] = res
      })
    } else if (isFunction(value)) {
      dictsObj.value[key] = value().then((res) => {
        dictsObj.value[key] = res
      })
    } else if (value.hasOwnProperty('path')) {
      dictsStore.getDicts(key, value).then((res) => {
        dictsObj.value[key] = res
      })
    } else {
      dictsObj.value[key] = value
    }
  }
  return dictsObj
}

export const getComputedConfig = (config, dictsMap) => {
  for (const [key, value] of Object.entries(dictsMap)) {
    const fromItem = config.formItems?.find((item) => {
      return item.field === key
    })
    if (fromItem) {
      if (isRef(fromItem.options)) {
        fromItem.options.value = value || []
      } else {
        fromItem.options = value || []
      }
    }
  }
  return config
}
