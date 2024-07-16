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
      },
    ],
  }
}
