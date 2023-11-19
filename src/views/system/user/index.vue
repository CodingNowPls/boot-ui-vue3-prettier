<script setup name="User">
import getSearchConfig from './config/searchConfig'
import getContentConfig from './config/contentConfig.js'
import getDialogConfig from './config/dialogConfig.js'
import useDialog from '@/hooks/useDialog'
import {
  changeUserStatus,
  listUser,
  resetUserPwd,
  delUser,
  getUser,
  updateUser,
  addUser,
  deptTreeSelect,
} from '@/api/system/user'
import to from '@/utils/to'
import Dept from './components/Dept'

const pageName = ref('user')
const pageSearchRef = ref(null)
const pageContentRef = ref(null)
const deptName = ref('')
const deptOptions = ref([])
const descConfig = ref({})
/** 查询部门下拉树结构 */
const getDeptTree = async () => {
  const [err, res] = await to(deptTreeSelect())
  if (res) {
    deptOptions.value = res.data
  }
}
const init = () => {
  getDeptTree()
}
const searchOtherConfig = {
  clear: () => {
    console.log('111')
  },
}
const searchConfig = getSearchConfig(searchOtherConfig)
const contentConfig = getContentConfig()
const dialogConfig = getDialogConfig()

const [dialogRef, infoInit, addClick, editBtnClick] = useDialog(
  undefined,
  undefined,
  '添加'
)
const dialogWidth = ref('600px')
const searchData = computed(() => {
  return pageContentRef.value?.finalSearchData
})

init()
</script>
<template>
  <div class="default-main userPage">
    <el-row :gutter="20">
      <el-col :span="4" :xl="4" :gl="4" :md="4" :sm="8" :xs="24">
        <Dept v-model:deptName="deptName" :deptOptions="deptOptions"></Dept>
      </el-col>
      <el-col :span="20" :xl="20" :gl="20" :md="20" :sm="16" :xs="24">
        <PageSearch
          ref="pageSearchRef"
          :pageName="pageName"
          :searchConfig="searchConfig"
        ></PageSearch>
        <PageContent
          :pageName="pageName"
          :contentConfig="contentConfig"
          :descConfig="descConfig"
          @addClick="addClick"
          @editBtnClick="editBtnClick"
        >
        </PageContent>
        <PageDialog
          ref="dialogRef"
          :width="dialogWidth"
          :pageName="pageName"
          :dialogConfig="dialogConfig"
          :infoInit="infoInit"
          :searchData="searchData"
        >
        </PageDialog>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.userPage {
  background-color: #fff;
  padding: 20px;
}
</style>
