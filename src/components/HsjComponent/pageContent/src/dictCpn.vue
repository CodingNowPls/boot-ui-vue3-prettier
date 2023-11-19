<script setup>
import { selectDictLabel } from '@/utils/ruoyi'
const props = defineProps({
  dictKey: {
    type: String,
    default: '',
  },
  backData: {
    type: [String, Number],
  },
  dictObj: {
    type: Object,
    default: () => ({}),
  },
})
const data = computed(() => {
  if (props.backData) {
    const list = props.dictObj[props.dictKey] || []
    return selectDictLabel(list, props.backData)
  } else {
    return ''
  }
})
</script>

<template>
  <div class="dict">{{ data }}</div>
</template>

<style scoped lang="scss"></style>
