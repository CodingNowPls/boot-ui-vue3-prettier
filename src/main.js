import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/css/index.scss'

import store from './store/index'
import route from './router/index'
// 注册指令
import directive from './directive/index'
// svg图标
import 'virtual:svg-icons-register'
import elementIcons from '@/components/SvgIcon/svgicon'

// 全局组件
import SvgIcon from '@/components/SvgIcon/index.vue'
import BaseForm from '@/BaseComponent/BaseForm/index'
import BaseTable from '@/BaseComponent/BaseTable/index'
import PageContent from '@/components/HsjComponent/pageContent/index'
import PageDialog from '@/components/HsjComponent/pageDialog/index'
import PageSearch from '@/components/HsjComponent/pageSearch/index'
import DictTag from '@/components/DictTag'

import { parseTime } from '@/utils/ruoyi'

const app = createApp(App)

app.use(store)
app.use(route)
app.use(elementIcons)

app.config.globalProperties.parseTime = parseTime

app.component('SvgIcon', SvgIcon)
app.component('BaseForm', BaseForm)
app.component('BaseTable', BaseTable)
app.component('PageContent', PageContent)
app.component('PageDialog', PageDialog)
app.component('PageSearch', PageSearch)
app.component('DictTag', DictTag)
app.use(ElementPlus)
directive(app)
app.mount('#app')
