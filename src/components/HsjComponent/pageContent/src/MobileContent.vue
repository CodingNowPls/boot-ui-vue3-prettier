<script setup>
import emitter from '@/utils/hsj/bus'
import businessStore from '@/store/business/businessStore'
import { getInfo } from '@/api/business/main/index'
import to from '@/utils/to'
import { interceptor } from '@/store/business/businessStore'
import { antiShake } from '@/utils/hsj/utils'
import DictCpn from './dictCpn.vue'

const props = defineProps({
  // table的配置
  contentConfig: {
    type: Object,
    default: () => {},
  },
  // table的事件监听
  tableListener: {
    type: Object,
    default: () => {},
  },
  // 页面名称与PageSearch和PageDialog的一致，每个页面必须唯一
  pageName: {
    type: String,
    required: true,
  },
  // 页面第一次进入的查询条件
  firstSendOption: {
    type: Object,
  },
  // 是否自动发送查询请求
  autoSend: {
    type: Boolean,
    default: true,
  },
  // 是否自动排序
  autoDesc: {
    type: Boolean,
    default: true,
  },
  // 排序的参数
  descConfig: {
    type: Object,
    default: () => {
      return {
        orderByColumn: 'createTime',
        isAsc: 'desc',
      }
    },
  },
  // 其他查询条件
  otherRequestOption: {
    type: Object,
    default: () => {},
  },
  piniaConfig: {
    type: Object,
    default: () => {
      return {
        // 接口请求到数据后从哪些字段中读取数据和总条数
        listConfig: { listKey: 'rows', countKey: 'total' },
        // 接口请求完毕后需要对请求到的list进行哪些二次处理
        handleList: (list) => list,
      }
    },
  },
  // 删除和getInfo接口所需要传入的id需要从row的哪个字段来取
  idKey: {
    type: String,
  },
  // 列表请求地址
  // 规则是 requestBaseUrl+ interceptor(pageName) + requestUrl
  requestBaseUrl: {
    type: String,
    default: '/',
  },
  requestUrl: {
    type: String,
    default: 'list',
  },
  // 显示编辑按钮
  showEdit: {
    type: Boolean,
    default: true,
  },
  // 显示编辑删除
  showDelete: {
    type: Boolean,
    default: true,
  },
  // 列表的数据字典反显用
  dictMap: {
    type: Object,
    default: () => {
      return {}
    },
  },
  // header需要显示哪些按钮
  headerButtons: {
    type: Array,
    default: () => [
      'refresh',
      'add',
      'edit',
      'delete',
      'columnDisplay',
      'comSearch',
    ],
  },
  tableSelected: {
    type: Array,
    default: () => [],
  },
  // 权限
  permission: {
    type: Object,
    default: () => ({}),
  },
  // 当你使用了todo的插槽后，会显示编辑和删除两个按钮。
  // 如果你需要根据列表的状态来控制这两个按钮可以传入这个函数
  handleEditShow: {
    type: Function,
    default: () => {
      return true
    },
  },
  // 同上
  handleDeleteShow: {
    type: Function,
    default: () => {
      return true
    },
  },
  // 删除的url 注意只能配置前一部分url
  // 例如 page/list/1 这个id 1 不能在这里配置，还是需要用过配置idKey来从row中读取
  delUrl: {
    type: String,
  },
  // 如果该组件计算的table的maxHeight不符合预期，那么可以通过这个参数来调整
  maxHeightDecrement: {
    type: Number,
    default: 0,
  },
  // table需要隐藏的列
  tableHideItems: {
    type: Array,
    default: () => [],
  },
  // 当页面会存在打开多个的时候会出现缓存问题，可以用这个区分缓存
  cacheKey: {
    type: [String, Number],
    default: '',
  },
})
const emit = defineEmits([
  'addClick',
  'editBtnClick',
  'beforeSend',
  'afterSend',
  'onChangeShowColumn',
  'selectionChange',
  'editMoreClick',
])
const store = businessStore()
const proxy = inject('proxy')
const isLoading = ref(false)
const baseTabelRef = ref(null)
const searchDatas = ref({})
const paginationInfo = ref({
  pageNum: 1,
  pageSize: props.contentConfig?.defaultPageSize || 10,
})

if (props.contentConfig?.pagination) {
  paginationInfo.value = {
    pageNum: 1,
    pageSize: props.contentConfig?.defaultPageSize || 10,
  }
}
// 所有的搜索条件的汇总
const finalSearchData = computed(() => {
  if (props.contentConfig.pagination) {
    return { ...searchDatas.value, ...paginationInfo.value }
  } else {
    return { ...searchDatas.value }
  }
})

watch(
  () => paginationInfo.value,
  (newValue, oldValue) => {
    console.log(1111)
    // 当pageSize发生变化时将pageNum设置成第一页
    if (newValue.pageSize !== oldValue.pageSize) {
      paginationInfo.value.pageNum = 1
    }
    antiShakeSend(finalSearchData.value)
  },
  {
    deep: true,
  }
)

const send = async (searchInfo) => {
  isLoading.value = true
  emit('beforeSend', searchInfo)
  // 调用获取list的Store
  let isSuccess = await store.getList(
    {
      pageName: props.pageName,
      requestUrl: props.requestUrl,
      queryInfo: {
        ...props.otherRequestOption,
        ...searchInfo,
      },
      cacheKey: props.cacheKey,
      requestBaseUrl: props.requestBaseUrl,
    },
    props.piniaConfig.listConfig,
    props.piniaConfig.handleList
  )
  if (isSuccess) {
    emit('afterSend', store.pageListData(props.pageName, props.cacheKey))
  }
  isLoading.value = false
}
const antiShakeSend = antiShake(send, 66)
// 表格数据
const dataList = computed(() => {
  const list = store.pageListData(props.pageName, props.cacheKey)
  return list ? list : []
})
// 总数量
const listCount = computed(() => {
  return store.listCount(props.pageName, props.cacheKey) ?? 0
})
// 删除按钮
const deleteRow = async (delData) => {
  isLoading.value = true
  let id = ''
  if (Array.isArray(delData)) {
    const ids = delData.map((item) => {
      return item[props.idKey] ?? item[props.pageName + 'Id'] ?? item.id
    })
    id = ids.toString()
  } else {
    id = delData[props.idKey] ?? delData[props.pageName + 'Id'] ?? delData.id
  }
  if (id || id === 0) {
    await to(
      store.deletDataAction({
        id,
        pageName: props.pageName,
        requestUrl: props.requestUrl,
        requestBaseUrl: props.requestBaseUrl,
        delUrl: props.delUrl,
      })
    )
    await to(send(finalSearchData.value))
  } else {
    proxy.$modal.notifyWarning('未获取到有效Id')
  }
  isLoading.value = false
}

// 编辑按钮
const editClick = async (item, type) => {
  isLoading.value = true
  // 取出当前点击这一行数据的id 优先props传入的idKey
  let id = item[props.idKey] ?? item[props.pageName + 'Id'] ?? item.id
  if (id || id === 0) {
    // 拼接getInfo请求的url地址
    let url = `${props.requestBaseUrl}${interceptor(props.pageName)}/${id}`
    let [res] = await to(getInfo(url))
    if (res?.data) {
      emit('editBtnClick', res.data, type, res)
    }
  } else {
    proxy.$modal.notifyWarning('未获取到有效Id')
  }
  isLoading.value = false
}

const addClick = () => {
  emit('addClick')
}

// 页面数据刷新函数
const refresh = () => {
  send(finalSearchData.value)
}
// 页面的mitt监听事件
const mittFunc = async (searchFormData) => {
  searchDatas.value = Object.assign({}, searchDatas.value, searchFormData)
  // searchLoading是pageSearch的loading效果，这里删除是为了防止代入到查询条件中
  if (searchDatas.value.hasOwnProperty('searchLoading')) {
    delete searchDatas.value.searchLoading
  }
  // resetPaginationInfo是用于判断是否将pageNum重置到第一页再进行搜索
  if (searchDatas.value.hasOwnProperty('resetPaginationInfo')) {
    delete searchDatas.value.resetPaginationInfo
  }
  if (searchFormData.resetPaginationInfo) {
    paginationInfo.value.pageNum = 1
  }
  await send(finalSearchData.value)
  // 网络请求完毕，loading设置成false
  if (searchFormData.searchLoading) searchFormData.searchLoading.value = false
}
const visibilityHeight = ref(100)
const mittResize = (searchHeight) => {
  if (typeof searchHeight === 'number') {
    visibilityHeight.value = searchHeight
  }
}
// 判断页面是否已经进行监听过，主要用于页面keep-alive后防止多次监听使用
let isListen = false
// 页面事件监听
const onListener = () => {
  if (!isListen) {
    isListen = true
    emitter.on(`search${props.pageName}Info`, mittFunc)
    emitter.on(`change${props.pageName}Size`, mittResize)
    window.addEventListener('resize', mittResize)
  }
}
// 取消页面监听事件
const offListener = () => {
  emitter.off(`search${props.pageName}Info`)
  emitter.off(`change${props.pageName}Size`)
  window.removeEventListener('resize', mittResize)
  isListen = false
}

let headerItem = []
let hasTodo = false
let centerItem = []
let footerSlot = []
const columnsFilter = () => {
  // 列的权限判断
  const tableItem = props.contentConfig.tableItem.filter((item) => {
    if (!item.permission) return true
    return proxy.hasPermi(item.permission)
  })
  tableItem.forEach((item) => {
    if (item.mobileSlot === 'header') {
      headerItem.push(item)
    }
    if (item.mobileSlot === 'footer') {
      footerSlot.push(item.prop + 'Slot')
    }
    if (item.prop === 'todo') {
      hasTodo = true
      footerSlot.push(item.prop + 'Slot')
    }
    if (!item.mobileSlot) {
      centerItem.push(item)
    }
  })
  props.contentConfig.tableItem = tableItem
}
const handleToTop = () => {
  const main = document.querySelector('.el-main')
  main?.scrollTo(0, 0)
}
const init = () => {
  columnsFilter()
}
let mainEl = null
onMounted(() => {
  // 判断是否需要自动排序
  if (props.autoDesc) {
    let shortData = {}
    // 默认使用elTableConfig的defaultSort，再使用外界传入了descConfig
    if (props.contentConfig?.elTableConfig?.defaultSort) {
      const sort = props.contentConfig.elTableConfig.defaultSort
      shortData.orderByColumn = sort.prop
      if (sort.order === 'ascending') {
        shortData.isAsc = 'asc'
      } else if (sort.order === 'descending') {
        shortData.isAsc = 'desc'
      }
    } else if (props.descConfig) {
      shortData = props.descConfig
    }
    for (const [key, value] of Object.entries(shortData)) {
      searchDatas.value[key] = value
    }
  }
  if (props.autoSend) {
    let obj = {
      ...props.firstSendOption,
    }
    obj = Object.assign({}, obj, finalSearchData.value)
    send({
      ...obj,
    })
  }
  mainEl = document.querySelector('.el-main')
  mittResize()
  onListener()
})
onUnmounted(() => {
  offListener()
})
onActivated(() => {
  onListener()
})
onDeactivated(() => {
  offListener()
})

init()
defineExpose({
  finalSearchData,
  refresh,
  baseTabelRef,
  deleteRow,
  editClick,
  dataList,
})
</script>

<template>
  <div class="pageContent" v-loading="isLoading">
    <div
      class="data-card mb12"
      v-for="row in dataList"
      :key="row[idKey] ?? row[pageName + 'Id'] ?? row.id"
    >
      <div class="card-header" v-for="field in headerItem">
        <div class="order-number">
          <slot :name="field.slotName + 'Header'" :backData="row">
            <span class="label"> {{ field.label }}： </span>
          </slot>
          <slot :name="field.slotName" :backData="row">
            <span class="value">{{ row[field.prop] }}</span>
          </slot>
        </div>
      </div>
      <div class="info-list">
        <div class="info-row">
          <div
            v-for="field in centerItem"
            :key="field.prop"
            class="info-item"
            :class="{ 'full-width': field.width >= 180 }"
          >
            <template v-if="field.prop !== 'todo'">
              <slot :name="field.slotName + 'Header'" :backData="row">
                <span class="label"> {{ field.label }}： </span>
              </slot>
              <slot :name="field.slotName" :backData="row">
                <template v-if="field.isDict">
                  <DictCpn
                    :value="row[field.prop]"
                    :options="dictMap[field.prop]"
                  ></DictCpn>
                </template>
                <span v-else class="value">{{ row[field.prop] }}</span>
              </slot>
            </template>
          </div>
        </div>
      </div>
      <div class="card-footer mobileFooter">
        <template v-if="hasTodo">
          <el-button
            class="edit order5"
            v-if="showEdit && handleEditShow(row)"
            v-hasPermi="[permission.edit]"
            type="primary"
            size="small"
            @click="editClick(row)"
          >
            <SvgIcon :size="12" iconClass="pencil"></SvgIcon>
            <span class="ml6">编辑</span>
          </el-button>
          <el-popconfirm
            title="确定删除选中记录？"
            confirm-button-text="确认"
            cancel-button-text="取消"
            confirmButtonType="danger"
            :hide-after="0"
            @confirm="deleteRow(row)"
            v-if="hasPermi(permission.del)"
          >
            <template #reference>
              <el-button
                class="del order10"
                type="danger"
                size="small"
                v-if="showDelete && handleDeleteShow(row)"
              >
                <SvgIcon :size="12" iconClass="trash"></SvgIcon>
                <span class="ml6">删除</span>
              </el-button>
              <span></span>
            </template>
          </el-popconfirm>
        </template>
        <template v-for="slotName in footerSlot">
          <slot :name="slotName" :backData="row"></slot>
        </template>
      </div>
    </div>
    <!-- <el-empty v-if="listCount" description="暂无数据" /> -->
    <el-backtop
      target=".el-main"
      :right="10"
      :bottom="60"
      :visibility-height="visibilityHeight"
    />
    <div
      class="footer lmw-pagination-footer"
      v-if="contentConfig.pagination && listCount > paginationInfo.pageSize"
    >
      <span>
        <span class="primary"> {{ listCount }}条 </span>
      </span>
      <el-pagination
        @size-change="handleToTop"
        @current-change="handleToTop"
        v-model:current-page="paginationInfo.pageNum"
        v-model:page-size="paginationInfo.pageSize"
        layout="prev, pager, next"
        :total="listCount"
        :pager-count="5"
        background
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pageContent {
  background-color: var(--ba-bg-color);
}
.data-card {
  position: relative;
  background: var(--ba-bg-color-overlay);
  border-radius: 12px;
  margin-bottom: 12px;
  .card-content {
    display: flex;
    flex-direction: column;
  }
  // 头部样式
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--el-border-color);
    .order-number {
      font-size: 15px;
      .label {
        color: var(--el-text-color-primary);
        font-weight: 500;
      }
      .value {
        color: var(--el-color-primary);
        font-weight: 500;
      }
    }
  }
  // 信息列表样式
  .info-list {
    padding: 16px;
    .info-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px 24px;
    }
    .info-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;
      &.full-width {
        grid-column: 1 / -1;
        white-space: normal;
      }
      .label {
        color: #666;
        margin-right: 4px;
      }
      .value {
        color: var(--el-text-color-primary);
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  // 底部操作区
  .card-footer {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    padding: 12px 16px;
    :deep(.el-button) {
      margin: 4px !important;
    }
  }
}
// 响应式处理
@media screen and (max-width: 768px) {
  .data-card {
    .info-list {
      padding: 12px;
      .info-row {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px;
      }
    }
    .info-item {
      font-size: 13px;
    }
    .card-footer {
      padding: 12px;
      flex-wrap: wrap;
    }
  }
}
// 超窄屏幕处理
@media screen and (max-width: 375px) {
  .data-card {
    .info-list .info-row {
      grid-template-columns: 1fr;
    }
  }
}
.footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  :deep(.btn-prev) {
    margin: 0 2px;
  }
  :deep(.btn-next) {
    margin: 0 0 0 2px;
  }
  :deep(.el-pager li) {
    margin: 0 1px;
  }
  :deep(.el-pagination) {
    padding: 0px;
  }
  background-color: var(--ba-bg-color-overlay);
  padding: 10px 10px;
}
</style>
