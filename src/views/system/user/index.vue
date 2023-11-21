<script setup name="User">
import getSearchConfig from './config/searchConfig'
import getContentConfig from './config/contentConfig.js'
import getDialogConfig from './config/dialogConfig.js'
import useDialog from '@/hooks/useDialog'
import getComputedConfig from '@/hooks/getPageConfig'
import {
  changeUserStatus,
  resetUserPwd,
  getUser,
  deptTreeSelect,
} from '@/api/system/user'
import to from '@/utils/to'
import { ElMessage } from 'element-plus'
import { nextTick } from 'vue'

const { proxy } = getCurrentInstance()
const { sys_normal_disable, sys_user_sex } = proxy.useDict(
  'sys_normal_disable',
  'sys_user_sex'
)

const pageName = ref('user')
const showPageSearch = ref(true)
const pageSearchRef = ref(null)
const pageContentRef = ref(null)
const deptOptions = ref([])
const postOptions = ref([])
const roleOptions = ref([])
const descConfig = ref({})
/** 查询部门下拉树结构 */
const getDeptTree = async () => {
  const [err, res] = await to(deptTreeSelect())
  if (res) {
    deptOptions.value = res.data ?? []
  }
}
const getPostAndRole = async () => {
  const [err, res] = await to(getUser())
  if (res) {
    postOptions.value = res.posts ?? []
    roleOptions.value = res.roles ?? []
  }
}

const dialogHideItems = ref([])
const tableHideItems = ref([])
const dictMap = {
  status: sys_normal_disable,
  sex: sys_user_sex,
  deptId: deptOptions,
  postIds: postOptions,
  roleIds: roleOptions,
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

const dialogConfig = getDialogConfig()

const dialogConfigComputed = computed(() => {
  dialogConfig.hideItems = dialogHideItems
  return getComputedConfig(dialogConfig, dictMap)
})

const addCallBack = () => {
  dialogHideItems.value.length = 0
}
const editCallBack = (item, type) => {
  dialogHideItems.value = ['password', 'userName']
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

const dialogWidth = ref('600px')
const searchData = computed(() => {
  return pageContentRef.value?.finalSearchData
})
const permission = ref({
  add: 'system:user:add',
  edit: 'system:user:edit',
  del: 'system:user:remove',
})

const triggerShowSearch = () => {
  showPageSearch.value = !showPageSearch.value
}

const onChangeShowColumn = (filterArr) => {
  tableHideItems.value = filterArr
}

const handleStatusChange = async (row) => {
  let text = row.status === '0' ? '启用' : '停用'
  const [err, res] = await to(changeUserStatus(row.userId, row.status))
  if (res) {
    ElMessage({
      type: 'success',
      message: text + '成功',
    })
  }
  if (err) {
    row.status = row.status === '0' ? '1' : '0'
  }
}

const init = () => {
  getDeptTree()
  getPostAndRole()
}

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
      @addClick="addClick"
      @editBtnClick="editBtnClick"
      @onChangeShowColumn="onChangeShowColumn"
      @triggerShowSearch="triggerShowSearch"
      @editMoreClick="editMoreClick"
    >
      <template #handleLeft>
        <el-button
          type="warning"
          class="ml12"
          v-hasPermi="['system:user:import']"
        >
          <SvgIcon size="14" iconClass="upload" />
          <span class="ml6">导入</span>
        </el-button>
        <el-button type="warning" v-hasPermi="['system:user:export']">
          <SvgIcon size="14" iconClass="download" />
          <span class="ml6">导出</span>
        </el-button>
      </template>
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
      <template #todoSlotCenter="{ backData }">
        <el-button class="ml12" size="small" type="primary">
          <SvgIcon size="12" iconClass="key" />
          <span class="ml6">重置密码</span>
        </el-button>
      </template>
    </PageContent>
    <PageDialog
      ref="dialogRef"
      :width="dialogWidth"
      :pageName="pageName"
      :dialogConfig="dialogConfigComputed"
      :infoInit="infoInit"
      :searchData="searchData"
      :isEditMore="isEditMore"
      @editNext="editNext"
    >
    </PageDialog>
  </div>
</template>

<style scoped lang="scss">
.userPage {
  background-color: var(--ba-bg-color-overlay);
}
</style>
