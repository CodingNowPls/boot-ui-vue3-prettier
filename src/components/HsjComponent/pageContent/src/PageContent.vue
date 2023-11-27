<script setup>
import BaseTable from '@/base-component/BaseTable/index'
import emitter from '@/utils/hsj/bus'
import businessStore from '@/store/business/businessStore'
import { getInfo } from '@/api/business/main/index'
import to from '@/utils/to'
import DictCpn from './dictCpn.vue'
import { interceptor } from '@/store/business/businessStore'
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
  // 是否需要返回查询后的数据
  isGetListInfo: {
    type: Boolean,
    default: false,
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
        listConfig: { listKey: 'rows', countKey: 'total' },
        handleList: (list) => list,
      }
    },
  },
  idKey: {
    type: String,
  },
  requestUrl: {
    type: String,
    default: 'list',
  },
  showEdit: {
    type: Boolean,
    default: true,
  },
  showDelete: {
    type: Boolean,
    default: true,
  },
  dictMap: {
    type: Object,
    default: () => {
      return {}
    },
  },
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
  showPageSearch: {
    type: Boolean,
  },
  tableSelected: {
    type: Array,
    default: () => [],
  },
  permission: {
    type: Object,
    default: () => ({}),
  },
  requestBaseUrl: {
    type: String,
    default: '/',
  },
})
const emit = defineEmits([
  'addClick',
  'editBtnClick',
  'beforeSend',
  'afterSend',
  'triggerShowSearch',
  'onChangeShowColumn',
  'selectionChange',
  'editMoreClick',
])
const store = businessStore()
const { proxy } = getCurrentInstance()
const isLoading = ref(false)
const baseTabelRef = ref(null)
const searchDatas = ref({})
const paginationInfo = ref({
  pageNum: 1,
  pageSize: props.contentConfig?.defaultPageSize || 50,
})

if (props.contentConfig?.pagination) {
  paginationInfo.value = {
    pageNum: 1,
    pageSize: props.contentConfig?.defaultPageSize || 50,
  }
}

const finalSearchData = computed(() => {
  if (props.contentConfig.pagination) {
    return { ...searchDatas.value, ...paginationInfo.value }
  } else {
    return { ...searchDatas.value }
  }
})

watch(
  () => paginationInfo.value,
  (newValue) => {
    send(finalSearchData.value)
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
      requestBaseUrl: props.requestBaseUrl,
    },
    props.piniaConfig.listConfig,
    props.piniaConfig.handleList
  )
  if (isSuccess) {
    emit('afterSend', store[`${props.pageName}List`])
  }
  isLoading.value = false
}
// 表格数据
const dataList = computed(() => {
  const list = store.pageListData(props.pageName)
  return list ? list : []
})
// 总数量
const listCount = computed(() => {
  return store[`listCount`](props.pageName)
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
  let id = item[props.idKey] ?? item[props.pageName + 'Id'] ?? item.id
  if (id || id === 0) {
    let url = `${props.requestBaseUrl}${interceptor(props.pageName)}/${id}`
    let [err, res] = await to(getInfo(url))
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

// 其他的插槽
const otherSlot = props.contentConfig?.tableItem?.filter((item) => {
  if (item.slotName === 'createAt') return false
  if (item.slotName === 'updateTime') return false
  if (item.slotName === 'todo') return false
  if (item.slotName === 'otherColumn') return false
  return true
})

const sortChange = (shortData) => {
  let isAsc = ''
  let orderByColumn = 'createTime'
  if (shortData.order === 'ascending') {
    isAsc = 'asc'
  } else if (shortData.order === 'descending') {
    isAsc = 'desc'
  }
  if (shortData.prop) {
    if (shortData.prop === 'createTimeString') {
      orderByColumn = 'createTime'
    } else {
      orderByColumn = shortData.prop
    }
  }
  let orderObj = {}
  if (isAsc && isAsc != '') {
    orderObj = {
      orderByColumn,
      isAsc,
    }
  } else {
    // 如果没有排序就使用默认的查询条件的排序属性
    for (const [key, value] of Object.entries(props.descConfig)) {
      searchDatas.value[key] = value
    }
  }
  searchDatas.value = Object.assign(
    {},
    { ...searchDatas.value },
    { ...orderObj }
  )
  send(finalSearchData.value)
}
const refresh = () => {
  send(finalSearchData.value)
}
const mittFunc = async (searchFormData) => {
  searchDatas.value = Object.assign({}, searchDatas.value, searchFormData)
  if (searchDatas.value.hasOwnProperty('searchLoading')) {
    delete searchDatas.value.searchLoading
  }
  await send(finalSearchData.value)
  if (searchFormData.searchLoading) searchFormData.searchLoading.value = false
}
const maxHeight = ref(500)
const mittResize = (searchHeight) => {
  const header = document.getElementsByClassName('el-header')[0]
  const pagination = document.getElementsByClassName('lmw-pagination-footer')[0]
  let viewportHeight = window.innerHeight - searchHeight - 34
  if (header) {
    viewportHeight -= header.clientHeight
  }
  if (pagination) {
    viewportHeight -= pagination.clientHeight
  }
  maxHeight.value = viewportHeight
}
const emitterListener = () => {
  emitter.on(`search${props.pageName}Info`, mittFunc)
  emitter.on(`change${props.pageName}Size`, mittResize)
}

const columnChecked = ref([])
watch(
  () => props.contentConfig.tableItem,
  () => {
    props.contentConfig.tableItem.forEach((item) => {
      if (item.prop) {
        columnChecked.value.push(item.prop)
      }
    })
  },
  {
    immediate: true,
  }
)
let filterArr = []
const onChangeShowColumn = (checked, prop) => {
  if (checked) {
    filterArr = filterArr.filter((item) => item !== prop)
  } else {
    filterArr = [...filterArr, prop]
  }
  emit('onChangeShowColumn', filterArr)
}

const triggerShowSearch = () => {
  emit('triggerShowSearch')
}
const editMoreClick = () => {
  emit('editMoreClick')
}

const hasSlot = (slots, arr) => {
  return arr.some((key) => slots.hasOwnProperty(key))
}

onMounted(() => {
  if (props.autoDesc) {
    for (const [key, value] of Object.entries(props.descConfig)) {
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
  emitterListener()
})

onUnmounted(() => {
  emitter.off(`search${props.pageName}Info`)
  emitter.off(`change${props.pageName}Size`)
})
onActivated(() => {
  emitterListener()
})
onDeactivated(() => {
  emitter.off(`search${props.pageName}Info`)
  emitter.off(`change${props.pageName}Size`)
})
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
  <div class="page-content" v-loading="isLoading">
    <BaseTable
      ref="baseTabelRef"
      @sortChange="sortChange"
      v-model:paginationInfo="paginationInfo"
      :dataList="dataList"
      :listCount="listCount"
      :tableListener="tableListener"
      :maxHeight="maxHeight"
      v-bind="contentConfig"
    >
      <!-- 操作按钮 -->
      <template
        v-if="hasSlot($slots, ['handleLeft']) || headerButtons.length !== 0"
        #handleLeft
      >
        <div class="flex">
          <el-button
            v-if="headerButtons.includes('refresh')"
            type="info"
            color="#40485b"
            @click="refresh"
          >
            <SvgIcon iconClass="refresh" :size="13"></SvgIcon>
          </el-button>
          <el-button
            type="primary"
            class="order5"
            v-if="headerButtons.includes('add')"
            v-hasPermi="[permission.add]"
            @click="addClick"
          >
            <SvgIcon :size="14" iconClass="plus"></SvgIcon>
            <span class="ml6">添加</span>
          </el-button>
          <el-button
            type="primary"
            class="order10"
            v-if="headerButtons.includes('edit')"
            :disabled="tableSelected.length === 0"
            v-hasPermi="[permission.edit]"
            @click="editMoreClick"
          >
            <SvgIcon :size="14" iconClass="pencil"></SvgIcon>
            <span class="ml6">编辑</span>
          </el-button>
          <div v-hasPermi="[permission.del]" class="ml12 order15">
            <el-popconfirm
              v-if="headerButtons.includes('delete')"
              title="确定删除选中记录？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              confirmButtonType="danger"
              :hide-after="0"
              @confirm="deleteRow(tableSelected)"
            >
              <template #reference>
                <el-button type="danger" :disabled="tableSelected.length === 0">
                  <SvgIcon :size="14" iconClass="trash"></SvgIcon>
                  <span class="ml6">删除</span>
                </el-button>
              </template>
            </el-popconfirm>
          </div>

          <slot name="handleLeft"></slot>
        </div>
      </template>
      <template
        v-if="hasSlot($slots, ['handleRight']) || headerButtons.length !== 0"
        #handleRight
      >
        <div
          class="table-search-button-group"
          v-if="
            headerButtons.includes('columnDisplay') ||
            headerButtons.includes('comSearch')
          "
        >
          <el-dropdown
            v-if="headerButtons.includes('columnDisplay')"
            :max-height="380"
            :hide-on-click="false"
          >
            <el-button
              class="table-search-button-item"
              :class="
                headerButtons.includes('columnDisplay') ? 'right-border' : ''
              "
              plain
            >
              <SvgIcon size="14" iconClass="el-icon-Grid" />
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-checkbox-group v-model="columnChecked">
                  <el-dropdown-item
                    v-for="(item, idx) in contentConfig.tableItem"
                    :key="idx"
                  >
                    <el-checkbox
                      v-if="item.prop"
                      @change="onChangeShowColumn($event, item.prop)"
                      size="small"
                      :label="item.prop"
                      >{{ item.label }}
                    </el-checkbox>
                  </el-dropdown-item>
                </el-checkbox-group>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <el-tooltip
            v-if="headerButtons.includes('comSearch')"
            :content="showPageSearch ? '关闭搜索' : '展开搜索'"
            placement="top"
          >
            <el-button
              class="table-search-button-item"
              @click="triggerShowSearch"
              plain
            >
              <SvgIcon size="14" iconClass="el-icon-Search" />
            </el-button>
          </el-tooltip>
        </div>
        <slot name="handleRight"></slot>
      </template>
      <template #createTime="{ backData }">
        {{ backData.createTime }}
      </template>
      <template #updateTime="{ backData }">
        {{ timeFormat(backData.updateAt) }}
      </template>
      <template #expand="{ backData }">
        <div>
          <slot name="expand" :backData="backData"></slot>
        </div>
      </template>
      <template #todo="{ backData }">
        <div class="todo">
          <slot name="todoSlot" :backData="backData"></slot>
          <div class="edit order5" v-if="showEdit">
            <el-button
              v-if="showEdit"
              v-hasPermi="[permission.edit]"
              type="primary"
              size="small"
              @click="editClick(backData)"
            >
              <SvgIcon :size="10" iconClass="pencil"></SvgIcon>
              <span class="ml6">编辑</span>
            </el-button>
          </div>
          <div
            class="del order10"
            v-if="showDelete"
            v-hasPermi="[permission.del]"
          >
            <el-popconfirm
              title="确定删除选中记录？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              confirmButtonType="danger"
              :hide-after="0"
              @confirm="deleteRow(backData)"
            >
              <template #reference>
                <el-button type="danger" size="small">
                  <SvgIcon :size="10" iconClass="trash"></SvgIcon>
                  <span class="ml6">删除</span>
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>

      <template
        v-for="item in otherSlot"
        :key="item.prop"
        #[item.slotName]="{ backData }"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :backData="backData"></slot>
        </template>
        <template v-if="item.isDict">
          <DictCpn
            :value="backData[item.prop]"
            :dictList="dictMap[backData.prop]"
          ></DictCpn>
        </template>
      </template>
      <template
        v-for="item in otherSlot"
        :key="item.prop"
        #[`${item.slotName}Header`]
      >
        <slot :name="item.slotName + 'Header'"></slot>
      </template>
    </BaseTable>
  </div>
</template>

<style scoped lang="scss">
.todo {
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
}
.page-content :deep(.el-table__header) {
  .cell {
    color: var(--el-text-color-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.table-search-button-group {
  display: flex;
  margin-left: 12px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  overflow: hidden;
  button:focus,
  button:active {
    color: #000;
    background-color: var(--ba-bg-color-overlay);
  }
  button:hover {
    color: #000;
    background-color: var(--el-color-info-light-7);
  }
  .table-search-button-item {
    height: 30px;
    border: none;
    border-radius: 0;
  }
  .el-button + .el-button {
    margin: 0;
  }
  .right-border {
    border-right: 1px solid var(--el-border-color);
  }
  :deep(.el-button:focus-visible) {
    outline: none;
    outline-offset: 0;
  }
}

html.dark {
  .table-search-button-group {
    button:focus,
    button:active {
      background-color: var(--el-color-info-dark-2);
    }
    button:hover {
      background-color: var(--el-color-info-light-7);
    }
    button {
      background-color: #898a8d;
      el-icon {
        color: white !important;
      }
    }
  }
}
</style>
