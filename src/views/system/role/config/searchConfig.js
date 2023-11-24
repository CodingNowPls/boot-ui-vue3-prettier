export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '15px 20px 0px 0px' },
    formItems: [
      {
        label: '角色名称',
        field: 'roleName',
        type: 'input',
        config: {
          placeholder: '角色名称',
        },
        layout: {
          xl: 4,
          gl: 4,
          md: 4,
          sm: 12,
          xs: 24,
        },
      },
      {
        label: '权限字符',
        field: 'roleKey',
        type: 'input',
        config: {
          placeholder: '权限字符',
        },
        layout: {
          xl: 4,
          gl: 4,
          md: 4,
          sm: 12,
          xs: 24,
        },
      },
      {
        label: '角色状态',
        field: 'status',
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
      md: 5,
      sm: 12,
      xs: 24,
    },
  }
}
