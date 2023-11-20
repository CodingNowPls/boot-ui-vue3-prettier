export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '0px 20px 0px 0px' },
    formItems: [
      {
        label: '用户名称',
        field: 'userName',
        type: 'input',
      },
      {
        label: '手机号码',
        field: 'phonenumber',
        type: 'input',
      },
      {
        label: '部门',
        field: 'deptId',
        type: 'treeSelect',
        options: ref([]),
        config: {
          props: { label: 'label', value: 'id', children: 'children' },
        },
      },
      {
        label: '用户状态',
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
        },
      },
    ],
    colLayout: {
      xl: 3,
      gl: 4,
      md: 7,
      sm: 12,
      xs: 24,
    },
  }
}
