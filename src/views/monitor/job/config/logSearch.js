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
        label: '执行状态',
        field: 'status',
        type: 'select',
        options: [],
      },
      {
        label: '执行时间',
        field: 'dateRange',
        type: 'datepicker',
        config: {
          type: 'daterange',
          valueFormat: 'YYYY-MM-DD',
          format: 'YYYY/MM/DD',
        },
        layout: {
          xl: 5,
          gl: 6,
          md: 7,
          sm: 12,
          xs: 24,
        },
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
