<script setup>
import MobileSearch from './MobileSearch.vue'
import PageSearch from './PageSearch.vue'
import { useConfig } from '@/store/modules/layout'
defineOptions({
  components: {
    MobileSearch,
    PageSearch,
  },
})
const props = defineProps({
  useMobile: {
    type: Boolean,
    default: true,
  },
})
const pageSearchRef = ref(null)
const setFormData = (key, value) => {
  pageSearchRef.value?.setFormData(key, value)
}
const search = (isReset = false) => {
  pageSearchRef.value?.search(isReset)
}
const getFormData = (isReset = false) => {
  pageSearchRef.value?.getFormData(isReset)
}
const config = useConfig()
const layoutType = computed(() => {
  if (props.useMobile && config.layout.isMobile) {
    return 'MobileSearch'
  } else {
    return 'PageSearch'
  }
})
defineExpose({
  getFormData,
  setFormData,
  search,
})
</script>
<template>
  <component ref="pageSearchRef" :is="layoutType">
    <template v-for="(value, slotName) in $slots" #[slotName]="{ backData }">
      <slot :name="slotName" :backData="backData"> </slot>
    </template>
  </component>
</template>

<style scoped lang="scss"></style>
