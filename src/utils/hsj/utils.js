// 判断是否是手机端
export const isMobile = () => {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  return flag
}
// formConfig排序
export const sortConfig = (items) => {
  items.sort((cur, pre) => {
    if (!cur.order) {
      cur.order = 0
    }
    if (!pre.order) {
      pre.order = 0
    }
    return cur.order - pre.order
  })
}

// 数据字典数据存储
export function dictMap(dict, list) {
  dict.value = list.map((item) => {
    return {
      label: item.dictLabel,
      value: item.dictValue,
    }
  })
}

// 表格合并
export const objectSpanMethod = (rowObj, config, tableData, unique) => {
  let { row, column, rowIndex, columnIndex } = rowObj
  // 通过递归获取单元格所占大小
  let nowRowSpan = 1
  const recursionRowSpan = (row, rowIndex, str, data) => {
    let num = 0
    // row[str] == data[rowIndex - 1][str]这个用来判断是否合并，可以改为自己的判断方法
    // 判断上一行字段的值与当前行值是否一致
    if (
      nowRowSpan == 1 &&
      rowIndex > 0 &&
      row[str] == data[rowIndex - 1][str] &&
      row[unique] == data[rowIndex - 1][unique]
    ) {
      return 0
    }
    // 判断下一行字段的值与该行值是否一致
    if (
      rowIndex + 1 < data.length &&
      row[str] == data[rowIndex + 1][str] &&
      row[unique] == data[rowIndex + 1][unique]
    ) {
      nowRowSpan++
      num = rowIndex + 1
      return recursionRowSpan(data[num], num, str, data)
    } else {
      num = nowRowSpan
      nowRowSpan = 1
      return num
    }
  }

  let num = 1
  for (const [key, value] of Object.entries(config)) {
    if (columnIndex == key) {
      num = recursionRowSpan(row, rowIndex, value, tableData)
    }
  }
  return {
    rowspan: num,
    colspan: 1,
  }
}

/**
 * @param {Function} fn 要防抖的函数
 * @param {Number} time 防抖时间
 * @param {Boolean} now 是否立即执行传入的函数
 * @param {Function} callback 接收传入函数的返回值的回调
 * @returns
 */

export function antiShake(fn, time = 500, now = false, callback) {
  //防抖
  let timer
  let isNow = false
  let debounce = function (...args) {
    if (timer) clearTimeout(timer)
    if (!isNow && now) {
      const res = fn.apply(this, args)
      if (res) {
        callback && callback(res)
      }
      isNow = true
    } else {
      timer = setTimeout(() => {
        const res = fn.apply(this, args)
        if (res) {
          callback && callback(res)
        }
        isNow = false
      }, time)
    }
  }
  debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isNow = false
  }
  return debounce
}

// 生成随机值
export const generateUnique = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0
    let v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// 深拷贝
export const deepClone = (obj) => {
  if (obj === null) return obj
  if (obj === undefined) return obj
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  if (typeof obj !== 'object') return obj
  let cloneObj = new obj.constructor()
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      cloneObj[i] = deepClone(obj[i])
    }
  }
  return cloneObj
}
export const isDesktop = () => {
  const userAgent = navigator.userAgent
  return !/(mobile|android|iphone|ipad|iemobile|ipod touch)/i.test(userAgent)
}
