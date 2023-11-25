export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '15px 20px 0px 0px' },
    formItems: [
      {
        label: '参数名称',
        field: 'configName',
        type: 'input',
      },
      {
        label: '参数键名',
        field: 'configKey',
        type: 'input',
      },
      {
        label: '系统内置',
        field: 'configType',
        type: 'select',
        options: [],
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
