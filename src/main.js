import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/el-notification.css'

import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/css/index.scss'

import store from './store/index'
import route from './router/index'
import directive from './directive/index'

// 注册指令
import plugins from './plugins/index.js' // plugins
import { download } from '@/utils/hsj/service/index'
// svg图标
import 'virtual:svg-icons-register'
import elementIcons from '@/components/SvgIcon/svgicon'

// 全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import BaseForm from '@/base-component/BaseForm/index'
import BaseTable from '@/base-component/BaseTable/index'
import PageContent from '@/components/HsjComponent/pageContent/index'
import PageDialog from '@/components/HsjComponent/pageDialog/index'
import PageSearch from '@/components/HsjComponent/pageSearch/index'
import DictTag from '@/components/DictTag'

import { useDict } from '@/utils/dict'
import {
  parseTime,
  resetForm,
  addDateRange,
  handleTree,
  selectDictLabel,
  selectDictLabels,
} from '@/utils/ruoyi'

const app = createApp(App)

app.use(store)
app.use(route)
app.use(plugins)
app.use(elementIcons)

app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

app.component('SvgIcon', SvgIcon)
app.component('BaseForm', BaseForm)
app.component('BaseTable', BaseTable)
app.component('PageContent', PageContent)
app.component('PageDialog', PageDialog)
app.component('PageSearch', PageSearch)
app.component('DictTag', DictTag)

directive(app)

app.mount('#app')
