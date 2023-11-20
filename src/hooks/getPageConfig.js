import { isRef } from 'vue'

export default (config, dictsMap) => {
  for (const [key, dict] of Object.entries(dictsMap)) {
    const fromItem = config.formItems?.find((item) => {
      return item.field === key
    })
    if (fromItem) {
      if (isRef(fromItem.options)) {
        fromItem.options.value = dict.value || dict || []
      } else {
        fromItem.options = dict.value || dict || []
      }
    }
  }
  return config
}
