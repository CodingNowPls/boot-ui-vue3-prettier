<script setup>
import BaseForm from '@/base-component/BaseForm'
import emitter from '@/utils/hsj/bus'
const props = defineProps({
  searchConfig: {
    type: Object,
    default: () => {},
  },
  initSearch: {
    type: Object,
    default: () => {},
  },
  pageName: {
    type: String,
    required: true,
  },
  otherRequestOption: {
    type: Object,
    default: () => {},
  },
  showSearch: {
    type: Boolean,
    default: true,
  },
})
const baseFormRef = ref(null)
const searchLoading = ref(false)
const formItem = props.searchConfig?.formItems ?? []

let formData = ref({})
const search = () => {
  searchLoading.value = true
  emitter.emit(`search${props.pageName}Info`, {
    ...formData.value,
    ...props.otherRequestOption,
    searchLoading,
  })
}
const reset = () => {
  baseFormRef.value?.elFormRef?.resetFields()
  search()
}
onMounted(() => {
  for (const item of formItem) {
    formData.value[item.field] = item.default ?? ''
  }
  for (const key in props.initSearch) {
    formData.value[key] = props.initSearch[key]
  }
})
defineExpose({
  formData,
  search,
})
</script>

<template>
  <div class="page-search">
    <div class="search">
      <BaseForm ref="baseFormRef" v-bind="searchConfig" v-model:data="formData">
        <template #footer>
          <div class="footer" v-if="showSearch">
            <el-button
              type="primary"
              icon="Search"
              @click="search"
              :loading="searchLoading"
              >检索</el-button
            >
            <el-button @click="reset" icon="Refresh" :loading="searchLoading">
              重置
            </el-button>
          </div>
        </template>
      </BaseForm>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-search {
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  background-color: var(--ba-bg-color-overlay);
  border: 1px solid var(--ba-border-color);
  border-bottom: none;
  padding: 13px 15px;
  font-size: 14px;
}
.footer {
  text-align: right;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
