<script setup>
import MobileSearch from './MobileSearch.vue'
import PageSearch from './PageSearch.vue'
import { useConfig } from '@/store/modules/layout'
const config = useConfig()
</script>
<template>
  <MobileSearch v-if="config.layout.isMobile" v-bind="$attrs">
    <template v-for="(value, slotName) in $slots" #[slotName]="{ backData }">
      <slot :name="slotName" :backData="backData"> </slot>
    </template>
  </MobileSearch>
  <PageSearch v-bind="$attrs" v-else>
    <template v-for="(value, slotName) in $slots" #[slotName]="{ backData }">
      <slot :name="slotName" :backData="backData"> </slot>
    </template>
  </PageSearch>
</template>

<style scoped lang="scss"></style>
