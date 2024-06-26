export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '15px 20px 0px 0px' },
    formItems: [
      {
        label: '操作地址',
        field: 'operIp',
        type: 'input',
      },
      {
        label: '系统模块',
        field: 'title',
        type: 'input',
      },
      {
        label: '操作人员',
        field: 'operName',
        type: 'input',
      },
      {
        label: '类型',
        field: 'businessType',
        type: 'select',
        options: [],
      },
      {
        label: '状态',
        field: 'status',
        type: 'select',
        options: [],
      },
      {
        label: '操作时间',
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
