<script setup name="Menu">
import { ElNotification } from 'element-plus'
import getSearchConfig from './config/searchConfig'
import getContentConfig from './config/contentConfig.js'
import getDialogConfig from './config/dialogConfig.js'
import useDialog from '@/hooks/useDialog'
import getComputedConfig from '@/hooks/getPageConfig'
import to from '@/utils/to'
import { changeRoleStatus } from '@/api/system/role'
import { getMenu, listMenu } from '@/api/system/menu'
import IconSelector from '@/components/IconSelector/IconSelector.vue'

const { proxy } = getCurrentInstance()

const { sys_normal_disable, sys_show_hide } = proxy.useDict(
  'sys_normal_disable',
  'sys_show_hide'
)

const pageName = ref('menu')
const showPageSearch = ref(true)
const pageSearchRef = ref(null)
const pageContentRef = ref(null)
const descConfig = ref({})
const treeSelectInfo = ref([])
const piniaConfig = {
  listConfig: { listKey: 'data', countKey: 'total' },
  handleList: (list) => {
    return proxy.handleTree(list, 'menuId')
  },
}

const getTreeSelect = async () => {
  treeSelectInfo.value = []
  const [err, res] = await to(listMenu())
  const menu = { menuId: 0, menuName: '主类目', children: [] }
  menu.children = proxy.handleTree(res.data, 'menuId')
  treeSelectInfo.value.push(menu)
}
const dialogHideItems = ref([])
const tableHideItems = ref([])
const dictMap = {
  status: sys_normal_disable,
  parentId: treeSelectInfo,
  visible: sys_show_hide,
}

const searchConfig = getSearchConfig()
const searchConfigComputed = computed(() => {
  return getComputedConfig(searchConfig, dictMap)
})
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

const dialogLisenter = {
  menuTypeChange: (value) => {
    console.log('value: ', value)
  },
}

const dialogConfig = getDialogConfig(dialogLisenter)

const dialogConfigComputed = computed(() => {
  dialogConfig.hideItems = dialogHideItems
  return getComputedConfig(dialogConfig, dictMap)
})

const addCallBack = () => {
  getTreeSelect()
}
const editCallBack = async (item, type) => {
  const menuId = item.menuId
  const [err, res] = await to(getMenu(menuId))
  if (res) {
    console.log(res)
  }
  isEditMore.value = type
}
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

const editNext = (data) => {
  pageContentRef.value?.editClick(data, true)
}

const [dialogRef, infoInit, addClick, editBtnClick] = useDialog(
  addCallBack,
  editCallBack,
  '添加'
)

const dialogWidth = ref('550px')
const searchData = computed(() => {
  return pageContentRef.value?.finalSearchData
})

const beforeSend = (queryInfo) => {
  if (queryInfo.dateRange && Array.isArray(queryInfo.dateRange)) {
    const dateRange = queryInfo.dateRange
    queryInfo['params[beginTime]'] = dateRange[0]
    queryInfo['params[endTime]'] = dateRange[1]
    delete queryInfo.dateRange
  }
}
const beforeSave = () => {
  otherInfo.value.menuIds = getTreeData()
}

const permission = ref({
  add: 'system:menu:add',
  edit: 'system:menu:edit',
  del: 'system:menu:remove',
})

const triggerShowSearch = () => {
  showPageSearch.value = !showPageSearch.value
}

const onChangeShowColumn = (filterArr) => {
  tableHideItems.value = filterArr
}

const handleStatusChange = async (row) => {
  let text = row.status === '0' ? '启用' : '停用'
  const [err, res] = await to(changeRoleStatus(row.userId, row.status))
  if (res) {
    ElNotification({
      type: 'success',
      message: text + '成功',
    })
  }
  if (err) {
    row.status = row.status === '0' ? '1' : '0'
  }
}

const otherInfo = ref({})
const getTreeData = () => {
  const treeRef = dialogRef.value?.formRef?.allRefs?.menuIds
  if (treeRef) {
    let checkedKeys = treeRef.getCheckedKeys()
    let halfCheckedKeys = treeRef.getHalfCheckedKeys()
    checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
    return checkedKeys
  } else {
    return []
  }
}
const handleAdd = () => {}

const init = () => {}

init()
</script>
<template>
  <div class="default-main userPage">
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
      <template #statusSlot="{ backData }">
        <el-switch
          v-model="backData.status"
          active-value="0"
          inactive-value="1"
          @click="handleStatusChange(backData)"
        ></el-switch>
      </template>
      <template #deptSlot="{ backData }">
        <span> {{ backData.dept?.deptName }}</span>
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
      :searchData="searchData"
      :isEditMore="isEditMore"
      :otherInfo="otherInfo"
      @editNext="editNext"
      @beforeSave="beforeSave"
    >
      <template #iconCustom="{ backData }">
        {{ backData }}
        <IconSelector v-model="backData.formData.icon"></IconSelector>
      </template>
    </PageDialog>
  </div>
</template>

<style scoped lang="scss">
.userPage {
  background-color: var(--ba-bg-color-overlay);
}
.userPage {
  :deep(.statusClass .el-radio-group) {
    width: 100%;
  }
  :deep(.edit) {
    margin: 0 12px;
  }
}
</style>
