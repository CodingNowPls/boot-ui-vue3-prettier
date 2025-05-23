import { login, logout, getInfo } from '@/api/login.js'
import { getToken, setToken, removeToken } from '@/utils/auth.js'
import { parseTime } from '@/utils/hsj/timeFormat'
import defAva from '@/assets/images/avatar.png'

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: [],
    nickName: '',
    loginTime: '',
  }),
  actions: {
    // 登录
    login(userInfo) {
      const userName = userInfo.userName.trim()
      const password = userInfo.password.trim()
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(userName, password, code, uuid)
          .then((res) => {
            setToken(res.token)
            this.token = res.token
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            const user = res.user
            const avatar =
              user.avatar == '' || user.avatar == null
                ? defAva
                : import.meta.env.VITE_APP_BASE_API + user.avatar

            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              this.roles = res.roles
              this.permissions = res.permissions
            } else {
              this.roles = ['ROLE_DEFAULT']
            }
            this.name = user.userName
            this.nickName = user.nickName
            this.avatar = avatar
            this.loginTime = parseTime(new Date().getTime())
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    // 退出系统
    logOut() {
      return new Promise((resolve, reject) => {
        logout(this.token).finally(() => {
          this.token = ''
          this.roles = []
          this.permissions = []
          removeToken()
          resolve()
        })
      })
    },
  },
})

export default useUserStore
