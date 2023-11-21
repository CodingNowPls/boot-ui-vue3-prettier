<script setup>
import { selectDictLabel } from '@/utils/ruoyi'
const props = defineProps({
  value: {
    type: [String, Number],
  },
  dictList: {
    type: Array,
    default: () => [],
  },
})
const data = computed(() => {
  if (props.value) {
    return selectDictLabel(props.list, props.value)
  } else {
    return ''
  }
})
</script>

<template>
  <div class="dict">{{ data }}</div>
</template>

<style scoped lang="scss"></style>
