export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '15px 20px 0px 0px' },
    formItems: [
      {
        label: '任务名称',
        field: 'jobName',
        type: 'input',
      },
      {
        label: '任务组名',
        field: 'jobGroup',
        type: 'select',
        options: [],
      },
      {
        label: '任务状态',
        field: 'status',
        type: 'select',
        options: [],
      },
    ],
    colLayout: {
      xl: 4,
      gl: 4,
      md: 6,
      sm: 12,
      xs: 24,
    },
  }
}
