export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '15px 20px 0px 0px' },
    formItems: [
      {
        label: '菜单名称',
        field: 'menuName',
        type: 'input',
        layout: {
          xl: 4,
          lg: 4,
          md: 6,
          sm: 12,
          xs: 24,
        },
      },
      {
        label: '状态',
        field: 'status',
        type: 'select',
        options: [],
      },
    ],
  }
}
