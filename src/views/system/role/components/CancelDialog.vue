<script setup>
import { authUserSelectAll, unallocatedUserList } from '@/api/system/role'
import getSearchConfig from '../config/authSearch.js'
import getContentConfig from '../config/authContent.js'
import to from '@/utils/to'

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
})
const emits = defineEmits(['update:modelValue'])

const { proxy } = getCurrentInstance()
const route = useRoute()
const pageName = ref('role')
const requestUrl = ref('authUser/unallocatedList')
const roleId = route.params.roleId

const tableHideItems = ref(['todoSlot'])
const searchConfig = getSearchConfig()
const contentConfig = getContentConfig()

const contentConfigComputed = computed(() => {
  contentConfig.hideItems = tableHideItems
  return contentConfig
})

const tableSelected = ref([])
const tableListener = {
  selectionChange: (selected) => {
    tableSelected.value = selected
  },
}

const descConfig = ref({})

const headerButtons = []

const showPageSearch = ref(true)
const otherRequestOption = ref({
  roleId: roleId,
})

const loading = ref(false)

const commitClick = async () => {
  if (tableSelected.value.length === 0) {
    proxy.$modal.msgWarning('请勾选用户')
    return
  }
  loading.value = true
  const uIds = tableSelected.value.map((item) => item.userId)
  const [err, res] = await to(
    authUserSelectAll({ roleId: roleId, userIds: uIds.toString() })
  )
  if (res?.code === 200) {
    proxy.$modal.msgSuccess(res.msg)
    handleValueChange(false)
  }
  loading.value = false
}
const handleCancel = () => {
  handleValueChange(false)
}

const handleValueChange = (value) => {
  emits('update:modelValue', value)
}
</script>
<template>
  <div class="cancelDialog">
    <el-dialog
      width="850px"
      title="选择用户"
      :model-value="modelValue"
      @update:modelValue="handleValueChange($event)"
    >
      <PageSearch
        v-show="showPageSearch"
        ref="pageSearchRef"
        :pageName="pageName"
        :otherRequestOption="otherRequestOption"
        :searchConfig="searchConfig"
      ></PageSearch>
      <PageContent
        ref="pageContentRef"
        :pageName="pageName"
        :contentConfig="contentConfigComputed"
        :descConfig="descConfig"
        :showPageSearch="showPageSearch"
        :headerButtons="headerButtons"
        :showEdit="false"
        :showDelete="false"
        :requestUrl="requestUrl"
        :otherRequestOption="otherRequestOption"
        :tableListener="tableListener"
      >
        <template #statusSlot="{ backData }">
          <el-tag
            :type="backData.status == '0' ? 'success' : 'danger'"
            class="mx-1"
            effect="light"
          >
            {{ backData.status == '0' ? '正常' : '禁用' }}
          </el-tag>
        </template>
      </PageContent>
      <template #footer>
        <el-button :loading="loading" @click="handleCancel"> 取消 </el-button>
        <el-button type="primary" @click="commitClick" :loading="loading">
          保存
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.cancelDialog {
  :deep(.el-pagination) {
    padding-top: 20px;
  }
  :deep(.el-dialog__body) {
    padding-bottom: 0px;
  }
}
</style>
