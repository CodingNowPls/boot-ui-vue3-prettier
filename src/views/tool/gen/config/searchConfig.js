export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '15px 20px 0px 0px' },
    formItems: [
      {
        label: '表名称',
        field: 'tableName',
        type: 'input',
      },
      {
        label: '表描述',
        field: 'tableComment',
        type: 'input',
      },
      {
        label: '表名称',
        field: 'tableName',
        type: 'input',
      },
      {
        label: '创建时间',
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
