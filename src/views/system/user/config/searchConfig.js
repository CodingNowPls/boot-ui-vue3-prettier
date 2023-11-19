export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '0px 20px 0px 0px' },
    formItems: [
      {
        label: '用户名称',
        field: 'userName',
        type: 'input',
        eventFunction: {
          change: otherConfig.clear,
        },
      },
      {
        label: '手机号码',
        field: 'phonenumber',
        type: 'input',
        eventFunction: {
          change: otherConfig.clear,
        },
      },
      {
        label: '用户状态',
        field: 'status',
        type: 'input',
        eventFunction: {
          change: otherConfig.clear,
        },
      },
      {
        label: '创建时间',
        field: 'dateRange',
        type: 'datepicker',
        eventFunction: {
          change: otherConfig.clear,
        },
        config: {
          type: 'daterange',
        },
      },
    ],
    colLayout: {
      xl: 3,
      gl: 6,
      md: 8,
      sm: 12,
      xs: 24,
    },
  }
}
