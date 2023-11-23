<script setup>
import getAssignConfig from '../config/assignConfig'
import { deptTreeSelect, dataScope } from '@/api/system/role'
import getComputedConfig from '@/hooks/getPageConfig'
import to from '@/utils/to'
import { nextTick } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  infoInit: {
    type: Object,
  },
  roleId: {
    type: [String, Number],
  },
})
const emits = defineEmits(['update:modelValue', 'commitClick'])

const baseFormRef = ref(null)
const treeSelectInfo = ref([])
const dictMap = {
  deptIds: treeSelectInfo,
}
const assignConfig = getAssignConfig()

const assignConfigComputed = computed(() => {
  return getComputedConfig(assignConfig, dictMap)
})

const formData = ref({})

watch(
  () => props.infoInit,
  (newValue) => {
    if (Object.keys(props.infoInit).length) {
      for (const item of assignConfig.formItems) {
        formData.value[`${item.field}`] = newValue[`${item.field}`]
      }
    }
  }
)

const loading = ref(false)

const commitClick = async () => {
  loading.value = true
  const deptIds = getTreeData()
  const data = {
    ...formData.value,
    deptIds,
  }
  const [err, res] = await to(dataScope(data))
  if (res) {
    handleValueChange(false)
    emits('commitClick')
  }
  loading.value = false
}
const handleCancel = () => {
  handleValueChange(false)
}

const getDeptTree = async () => {
  const [err, res] = await to(deptTreeSelect(props.roleId))
  treeSelectInfo.value = res.depts
  let checkedKeys = res.checkedKeys
  nextTick(() => {
    checkedKeys.forEach((item) => {
      setTreeData(item)
    })
  })
}

const setTreeData = (item) => {
  baseFormRef.value?.allRefs?.deptIds?.setChecked(item, true, false)
}

const getTreeData = () => {
  const treeRef = baseFormRef.value?.allRefs?.deptIds
  if (treeRef) {
    let checkedKeys = treeRef.getCheckedKeys()
    let halfCheckedKeys = treeRef.getHalfCheckedKeys()
    checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys)
    return checkedKeys
  } else {
    return []
  }
}

const dialogOpen = () => {
  getDeptTree()
}

const handleValueChange = (value) => {
  emits('update:modelValue', value)
}
</script>
<template>
  <div class="cancelDialog">
    <el-dialog
      top="10vh"
      width="600px"
      title="分配数据权限"
      :model-value="modelValue"
      @update:modelValue="handleValueChange($event)"
      @open="dialogOpen"
    >
      <BaseForm
        ref="baseFormRef"
        v-bind="assignConfigComputed"
        v-model:data="formData"
      ></BaseForm>
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
