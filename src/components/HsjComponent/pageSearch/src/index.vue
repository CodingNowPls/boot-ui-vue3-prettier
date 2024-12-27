<script setup>
import { useTemplateRef } from 'vue'
import MobileSearch from './MobileSearch.vue'
import PageSearch from './PageSearch.vue'
import { useConfig } from '@/store/modules/layout'
const config = useConfig()
const pageSearchRef = useTemplateRef('pageSearchRef')
const setFormData = (key, value) => {
  pageSearchRef.value.setFormData(key, value)
}
const search = (isReset = false) => {
  pageSearchRef.value.search(isReset)
}
</script>
<template>
  <MobileSearch
    ref="pageSearchRef"
    v-if="config.layout.isMobile"
    v-bind="$attrs"
  >
    <template v-for="(value, slotName) in $slots" #[slotName]="{ backData }">
      <slot :name="slotName" :backData="backData"> </slot>
    </template>
  </MobileSearch>
  <PageSearch ref="pageSearchRef" v-bind="$attrs" v-else>
    <template v-for="(value, slotName) in $slots" #[slotName]="{ backData }">
      <slot :name="slotName" :backData="backData"> </slot>
    </template>
  </PageSearch>
</template>

<style scoped lang="scss"></style>
