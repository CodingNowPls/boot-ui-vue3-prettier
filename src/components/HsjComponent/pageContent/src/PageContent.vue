<script setup>
import BaseTable from '@/base-component/BaseTable/index'
import emitter from '@/utils/hsj/bus'
import businessStore from '@/store/business/businessStore'
import { getInfo } from '@/api/business/main/index'
import { callWithAsyncErrorHandling } from '@/utils/globalUtil/catchError'
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
  dictObj: {
    type: Object,
    default: () => {
      return {}
    },
  },
  headerButtons: {
    type: Array,
    default: () => ['refresh', 'add', 'edit', 'delete'],
  },
})
const emit = defineEmits([
  'addClick',
  'editBtnClick',
  'beforeSend',
  'afterSend',
])
const store = businessStore()
const isLoading = ref(false)
const baseTabelRef = ref(null)
const searchDatas = ref({})
const paginationInfo = ref({
  pageNum: 1,
  pageSize: props.contentConfig?.defaultPageSize || 100,
})

if (props.contentConfig?.pagination) {
  paginationInfo.value = {
    pageNum: 1,
    pageSize: props.contentConfig?.defaultPageSize || 100,
  }
}

const finalSearchData = computed(() => {
  return { ...searchDatas.value, ...paginationInfo.value }
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
    },
    props.piniaConfig.listConfig
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
  await store.deletDataAction(
    {
      id: delData[props.idKey] ?? delData[props.pageName + 'Id'] ?? delData.id,
      pageName: props.pageName,
      requestUrl: props.requestUrl,
      searchData: {
        ...props.otherRequestOption,
        ...searchDatas.value,
      },
    },
    false
  )
  send(finalSearchData.value)
  isLoading.value = false
}

// 编辑按钮
const editClick = async (item, type) => {
  isLoading.value = true
  const fn = async () => {
    // console.log('admin: ', admin)
    let id = item[props.idKey] ?? item[props.pageName + 'Id'] ?? item.id
    let url = `/${props.pageName}/${id}`
    let res = await getInfo(url)
    if (res.data) {
      emit('editBtnClick', res.data, type)
    }
    return res
  }

  await callWithAsyncErrorHandling(fn)

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
const emitterListener = () => {
  const list = emitter.all.get(`search${props.pageName}Info`)
  let flag = false
  if (list) {
    let fun = list.find((item) => {
      return item === mittFunc
    })
    if (!fun) {
      flag = true
    }
  } else {
    flag = true
  }
  if (flag) {
    emitter.on(`search${props.pageName}Info`, mittFunc)
  }
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
  // store.resetData({ pageName: props.pageName })
  emitter.off(`search${props.pageName}Info`)
})
onActivated(() => {
  emitterListener()
})
onDeactivated(() => {
  emitter.off(`search${props.pageName}Info`)
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
      v-bind="contentConfig"
      :tableListener="tableListener"
    >
      <template #refresh> </template>
      <!-- 操作按钮 -->
      <!-- <template v-for="item in contentConfig.handleSlot" #[item]>
        <template v-if="item">
          <slot :name="item"></slot>
        </template>
      </template> -->

      <template #handleLeft>
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
          v-if="headerButtons.includes('add')"
          @click="addClick"
        >
          <SvgIcon :size="14" iconClass="plus"></SvgIcon>
          <span class="ml6">添加</span>
        </el-button>
        <el-button type="primary" v-if="headerButtons.includes('edit')">
          <SvgIcon :size="14" iconClass="pencil"></SvgIcon>
          <span class="ml6">编辑</span>
        </el-button>
        <el-button type="danger" v-if="headerButtons.includes('delete')">
          <SvgIcon :size="14" iconClass="trash"></SvgIcon>
          <span class="ml6">删除</span>
        </el-button>
        <slot name="handleLeft"></slot>
      </template>
      <template #handleRight>
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
          <div class="edit" v-if="showEdit">
            <el-button
              link
              type="primary"
              icon="Edit"
              @click="editClick(backData)"
            >
              修改
            </el-button>
          </div>
          <div class="del" v-if="showDelete">
            <el-popconfirm
              title="确定删除选中记录？"
              confirm-button-text="确认"
              cancel-button-text="取消"
              @confirm="deleteRow(backData)"
            >
              <template #reference>
                <el-button link type="danger" icon="Delete">删除 </el-button>
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
          <template v-if="item.isDict">
            <DictCpn
              :dictKey="item.slotName"
              :dictObj="dictObj"
              :backData="backData[item.prop]"
            ></DictCpn>
          </template>
          <slot :name="item.slotName" :backData="backData" v-else></slot>
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
  max-width: 150px;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 60px;
    text-align: center;
  }
}
.page-content :deep(.el-table__header) {
  .cell {
    color: var(--el-text-color-primary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
