import { createApp } from 'vue'
import App from './App.vue'

import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/css/index.scss'

import store from './store/index'
import route from './router/index'

// 注册指令
import plugins from './plugins/index.js' // plugins

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

const app = createApp(App)

app.use(store)
app.use(route)
app.use(plugins)
app.use(elementIcons)

app.component('SvgIcon', SvgIcon)
app.component('BaseForm', BaseForm)
app.component('BaseTable', BaseTable)
app.component('PageContent', PageContent)
app.component('PageDialog', PageDialog)
app.component('PageSearch', PageSearch)

app.mount('#app')
