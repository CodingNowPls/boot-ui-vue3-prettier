<script setup>
import PageContent from './PageContent.vue'
import MobileContent from './MobileContent.vue'
import { useConfig } from '@/store/modules/layout'
const config = useConfig()
</script>
<template>
  <MobileContent v-if="config.layout.isMobile" v-bind="$attrs">
    <template
      v-for="(value, slotName) in $slots"
      #[slotName]="{ backData, currentItem }"
    >
      <slot :name="slotName" :backData="backData" :currentItem="currentItem">
      </slot>
    </template>
  </MobileContent>
  <PageContent v-bind="$attrs" v-else>
    <template
      v-for="(value, slotName) in $slots"
      #[slotName]="{ backData, currentItem }"
    >
      <slot :name="slotName" :backData="backData" :currentItem="currentItem">
      </slot>
    </template>
  </PageContent>
</template>

<style scoped lang="scss"></style>
