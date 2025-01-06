<script setup>
import PageContent from './PageContent.vue'
import MobileContent from './MobileContent.vue'
import { useConfig } from '@/store/modules/layout'
import { computed } from 'vue'
defineOptions({
  components: {
    PageContent,
    MobileContent,
  },
})
const props = defineProps({
  useMobile: {
    type: Boolean,
    default: true,
  },
})
const tableRef = ref('tableRef')
const config = useConfig()
const layoutType = computed(() => {
  if (props.useMobile && config.layout.isMobile) {
    return 'MobileContent'
  } else {
    return 'PageContent'
  }
})
const refresh = () => {
  tableRef.value?.refresh()
}
const baseTabelRef = computed(() => {
  return tableRef.value?.baseTabelRef
})
const finalSearchData = computed(() => {
  return tableRef.value?.finalSearchData
})
const deleteRow = (delData) => {
  tableRef.value?.deleteRow(delData)
}
const editClick = (row, type) => {
  tableRef.value?.editClick(row, type)
}
const dataList = computed(() => {
  return tableRef.value?.dataList
})
const mittResize = () => {
  return tableRef.value?.mittResize
}
defineExpose({
  finalSearchData,
  refresh,
  baseTabelRef,
  deleteRow,
  editClick,
  dataList,
  mittResize,
})
</script>
<template>
  <component ref="tableRef" :is="layoutType" v-bind="$attrs">
    <template
      v-for="(value, slotName) in $slots"
      #[slotName]="{ backData, currentItem }"
    >
      <slot :name="slotName" :backData="backData" :currentItem="currentItem">
      </slot>
    </template>
  </component>
</template>

<style scoped lang="scss"></style>
