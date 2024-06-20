export const authUserRole = 'authUserRole'
export const authRole = 'authRole'

const map = new Map()
map.set([authUserRole, authRole], '/role')
export const getUrl = (pageName) => {
  const mapSize = map.size
  const iterator = map.keys()
  for (let i = 0; i < mapSize; i++) {
    const key = iterator.next().value
    if (key.includes(pageName)) {
      return map.get(key)
    }
    if (key.done) {
      return false
    }
  }
}
