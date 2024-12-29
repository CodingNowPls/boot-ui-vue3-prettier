<script setup>
import PageContent from './PageContent.vue'
import MobileContent from './MobileContent.vue'
import { useConfig } from '@/store/modules/layout'
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
const config = useConfig()
const layoutType = computed(() => {
  if (props.useMobile && config.layout.isMobile) {
    return 'MobileContent'
  } else {
    return 'PageContent'
  }
})
</script>
<template>
  <component :is="layoutType" v-bind="$attrs">
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
