export default (item, colLayout) => {
  let layout = {}
  if (item.type === 'datepicker') {
    if (item.config?.type && item.config.type.includes('range')) {
      layout = {
        xl: 5,
        lg: 8,
        md: 10,
        sm: 12,
        xs: 24,
      }
      return item.layout || colLayout || layout
    }
  }
  layout = {
    xl: 4,
    lg: 5,
    md: 7,
    sm: 12,
    xs: 24,
  }
  return item.layout || colLayout || layout
}
