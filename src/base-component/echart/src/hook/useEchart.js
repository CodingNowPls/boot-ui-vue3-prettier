import * as echarts from 'echarts'

const getScale = (containRatio = true, baseWidth = 1920) => {
  const currentScale = document.documentElement.clientWidth / baseWidth
  const formattedScale = currentScale > 1 ? currentScale : 1
  const resultScale = containRatio
    ? formattedScale * window.devicePixelRatio
    : formattedScale
  return Math.ceil(resultScale)
}
const ratio = getScale()
export default function (el) {
  const eachartInstance = echarts.init(el, null, {
    locale: 'ZH',
    // renderer: 'svg',
    devicePixelRatio: ratio,
  })
  const setOption = (option, flag = false) => {
    eachartInstance.setOption(option, flag)
  }
  window.addEventListener('resize', () => {
    eachartInstance.resize()
  })
  const updateResize = () => {
    eachartInstance.resize()
  }
  return {
    eachartInstance,
    setOption,
    updateResize,
  }
}
