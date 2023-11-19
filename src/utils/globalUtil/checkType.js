export const toTypeString = (value) => Object.prototype.toString.call(value)

export const isObject = (val) => val !== null && typeof val === 'object'
export const isFunction = (val) => typeof val === 'function'
export const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
export const isMap = (val) => toTypeString(val) === '[object Map]'
export const isSet = (val) => toTypeString(val) === '[object Set]'

export const isDate = (val) => toTypeString(val) === '[object Date]'
export const isRegExp = (val) => toTypeString(val) === '[object RegExp]'

export const hasOwn = (val, key) => hasOwnProperty.call(val, key)
