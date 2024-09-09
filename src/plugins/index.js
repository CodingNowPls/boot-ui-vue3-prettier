import tab from './tab'
import auth from './auth'
import modal from './modal'
import $download from './download'
import isSmallScreen from './isSmallScreen'
// export default function installPlugins(app) {
//   // 页签操作
//   app.config.globalProperties.$tab = tab
//   // 认证对象
//   app.config.globalProperties.$auth = auth
//   // 模态框对象
//   app.config.globalProperties.$modal = modal
//   // 下载文件
//   app.config.globalProperties.$download = download
//   // 是否为小屏幕
//   app.config.globalProperties.$isSmallScreen = isSmallScreen()
// }
export { tab, auth, modal, $download, isSmallScreen }
