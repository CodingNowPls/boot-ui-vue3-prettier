<script setup>
const props = defineProps({
  deptName: {
    type: String,
    required: true,
  },
  deptOptions: {
    type: Array,
    required: true,
  },
})
const emits = defineEmits(['update:deptName', 'handleNode'])

const deptTreeRef = ref(null)

const handleValueChange = (value) => {
  deptTreeRef.value?.filter(value)
  emits('update:deptName', value)
}
/** 通过条件过滤节点  */
const filterNode = (value, data) => {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}
/** 节点单击事件 */
function handleNodeClick(data) {
  emits('handleNode', data)
}
</script>
<template>
  <div class="dept">
    <div>
      <el-input
        :model-value="deptName"
        @update:modelValue="handleValueChange($event)"
        placeholder="请输入部门名称"
        clearable
        prefix-icon="Search"
        style="margin-bottom: 20px"
      />
    </div>
    <div>
      <el-tree
        ref="deptTreeRef"
        node-key="id"
        highlight-current
        default-expand-all
        :data="deptOptions"
        :props="{ label: 'label', children: 'children' }"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
