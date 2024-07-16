export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '0px 20px 0px 0px' },
    formItems: [
      {
        label: '岗位编码',
        field: 'postCode',
        type: 'input',
      },
      {
        label: '岗位名称',
        field: 'postName',
        type: 'input',
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
