export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '15px 20px 0px 0px' },
    formItems: [
      {
        label: '公告标题',
        field: 'noticeTitle',
        type: 'input',
      },
      {
        label: '操作人员',
        field: 'createBy',
        type: 'input',
      },
      {
        label: '类型',
        field: 'noticeType',
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
