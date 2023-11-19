<template>
  <div class="base-echart">
    <div ref="echartRef" :style="{ height: height, width: width }"></div>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from 'vue'
import useEchart from './hook/useEchart'
export default {
  props: {
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '300px',
    },
    options: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const echartRef = ref()
    onMounted(() => {
      if (echartRef.value) {
        const { setOption } = useEchart(echartRef.value)
        watchEffect(() => {
          setOption(props.options, true)
        })
      }
    })
    return {
      echartRef,
    }
  },
}
</script>

<style scoped></style>
