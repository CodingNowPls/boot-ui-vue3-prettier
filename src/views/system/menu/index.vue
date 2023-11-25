<script setup name="Menu">
import getSearchConfig from './config/searchConfig'
import getContentConfig from './config/contentConfig.js'
import getDialogConfig from './config/dialogConfig.js'
import useDialog from '@/hooks/useDialog'
import getComputedConfig from '@/hooks/getPageConfig'
import to from '@/utils/to'
import { listMenu } from '@/api/system/menu'
import IconSelector from '@/components/IconSelector/IconSelector.vue'
import { nextTick } from 'vue'

const { proxy } = getCurrentInstance()

const { sys_normal_disable, sys_show_hide } = proxy.useDict(
  'sys_normal_disable',
  'sys_show_hide'
)

const pageName = ref('menu')
const showPageSearch = ref(true)
const pageSearchRef = ref(null)
const pageContentRef = ref(null)
// 控制页面排序字段
const descConfig = ref({})
// 点击保存会带上这里面的值（如果和要提交的表单键冲突那么会优先表单）
const otherInfo = ref({})
// 弹出层表单默认值
const defaultData = ref({
  menuType: 'M',
})

const treeSelectInfo = ref([])
const tableData = ref([])
const piniaConfig = {
  listConfig: { listKey: 'data', countKey: 'total' },
  handleList: (list) => {
    tableData.value = proxy.handleTree(list, 'menuId')
    return tableData.value
  },
}
// 弹出层要隐藏的formItem
const dialogHideItems = ref([])
// 表格要隐藏的列
const tableHideItems = ref([])

const dictMap = {
  status: sys_normal_disable,
  parentId: treeSelectInfo,
  visible: sys_show_hide,
}
// 搜索框配置
const searchConfig = getSearchConfig()
const searchConfigComputed = computed(() => {
  return getComputedConfig(searchConfig, dictMap)
})
// 列表配置
const tableSelected = ref([])
const tableListener = {
  selectionChange: (selected) => {
    tableSelected.value = selected
  },
}
const contentConfig = getContentConfig()
const contentConfigComputed = computed(() => {
  contentConfig.hideItems = tableHideItems
  return contentConfig
})
// 弹出成form配置
const dialogLisenter = {
  menuTypeChange: (value) => {
    changeDialogHide(value)
  },
}
const changeDialogHide = (value) => {
  dialogHideItems.value = []
  if (value === 'M') {
    dialogHideItems.value = ['component', 'query', 'isCache', 'perms']
  }
  if (value === 'F') {
    dialogHideItems.value = [
      'icon',
      'isFrame',
      'path',
      'component',
      'query',
      'isCache',
      'visible',
    ]
  }
}
const dialogWidth = ref('650px')
const dialogConfig = getDialogConfig(dialogLisenter)
const dialogConfigComputed = computed(() => {
  dialogConfig.hideItems = dialogHideItems
  return getComputedConfig(dialogConfig, dictMap)
})
// 点击添加的回调函数
const addCallBack = () => {
  changeDialogHide(defaultData.value.menuType)
}
// 点击编辑的回调函数
const editCallBack = async (item, type) => {
  changeDialogHide(item.menuType)
  isEditMore.value = type
}
// 是不是多选之后再点的编辑
const isEditMore = ref(false)
const editMoreClick = () => {
  if (tableSelected.value.length > 0) {
    const data = tableSelected.value[0]
    pageContentRef.value?.editClick(data, true)
    nextTick(() => {
      const newArray = tableSelected.value.slice(1)
      dialogRef.value?.changeSelected(newArray)
    })
  }
}
// 编辑下一个
const editNext = (data) => {
  pageContentRef.value?.editClick(data, true)
}
// 获取弹出层配置
const [dialogRef, infoInit, addClick, editBtnClick] = useDialog(
  addCallBack,
  editCallBack,
  '添加'
)
const search = () => {
  pageSearchRef.value?.search()
}

// 页面查询的前置函数
const beforeSend = (queryInfo) => {
  if (queryInfo.dateRange && Array.isArray(queryInfo.dateRange)) {
    const dateRange = queryInfo.dateRange
    queryInfo['params[beginTime]'] = dateRange[0]
    queryInfo['params[endTime]'] = dateRange[1]
    delete queryInfo.dateRange
  }
}
// 弹出层保存请求发送之前回调函数
const beforeSave = () => {}
// table上面的按钮权限配置
const permission = ref({
  add: 'system:menu:add',
  edit: 'system:menu:edit',
  del: 'system:menu:remove',
})
// 控制搜索的显示隐藏
const triggerShowSearch = () => {
  showPageSearch.value = !showPageSearch.value
}
// 控制table每一列的显示隐藏
const onChangeShowColumn = (filterArr) => {
  tableHideItems.value = filterArr
}

const getTreeSelect = async () => {
  treeSelectInfo.value = []
  const [err, res] = await to(listMenu())
  const menu = { menuId: 0, menuName: '主类目', children: [] }
  menu.children = proxy.handleTree(res.data, 'menuId')
  treeSelectInfo.value.push(menu)
}
const handleAdd = (row) => {
  addClick()
  nextTick(() => {
    dialogRef.value?.setFormData('parentId', row.parentId)
  })
}

const unFoldAll = () => {
  pageContentRef.value?.baseTabelRef.unFoldAll()
}

const init = () => {
  getTreeSelect()
}

init()
</script>
<template>
  <div class="default-main page">
    <PageSearch
      v-show="showPageSearch"
      ref="pageSearchRef"
      :pageName="pageName"
      :searchConfig="searchConfigComputed"
    ></PageSearch>
    <PageContent
      ref="pageContentRef"
      :pageName="pageName"
      :contentConfig="contentConfigComputed"
      :descConfig="descConfig"
      :showPageSearch="showPageSearch"
      :dictMap="dictMap"
      :tableListener="tableListener"
      :tableSelected="tableSelected"
      :permission="permission"
      :piniaConfig="piniaConfig"
      @beforeSend="beforeSend"
      @addClick="addClick"
      @editBtnClick="editBtnClick"
      @onChangeShowColumn="onChangeShowColumn"
      @triggerShowSearch="triggerShowSearch"
      @editMoreClick="editMoreClick"
    >
      <template #handleLeft>
        <el-button class="order16 ml12" type="info" @click="unFoldAll">
          展开/折叠
        </el-button>
      </template>
      <template #todoSlot="{ backData }">
        <el-button
          class="order1"
          size="small"
          type="primary"
          @click="handleAdd(backData)"
          v-hasPermi="['system:menu:add']"
        >
          <SvgIcon size="11" iconClass="plus" />
          <span class="ml6">添加</span>
        </el-button>
      </template>
      <template #iconSlot="{ backData }">
        <SvgIcon v-if="backData.icon" :iconClass="backData.icon" :size="16" />
      </template>
    </PageContent>
    <PageDialog
      ref="dialogRef"
      top="8vh"
      maxHeight="510px"
      :width="dialogWidth"
      :pageName="pageName"
      :dialogConfig="dialogConfigComputed"
      :infoInit="infoInit"
      :search="search"
      :isEditMore="isEditMore"
      :otherInfo="otherInfo"
      :defaultData="defaultData"
      @editNext="editNext"
      @beforeSave="beforeSave"
    >
      <template #iconCustom="{ backData }">
        <IconSelector v-model="backData.formData.icon"></IconSelector>
      </template>
    </PageDialog>
  </div>
</template>

<style scoped lang="scss">
.page {
  background-color: var(--ba-bg-color-overlay);

  :deep(.page-dialog .el-radio) {
    margin-right: 20px;
  }
  :deep(.statusClass .el-radio-group) {
    width: 100%;
  }
  :deep(.edit) {
    margin: 0 12px;
  }
}
</style>
