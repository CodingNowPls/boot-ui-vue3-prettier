export default (listeners = {}) => {
  return {
    itemStyle: { padding: '0px 0px 0px 0px' },
    rules: {
      menuName: [
        { required: true, message: '菜单名称不能为空', trigger: 'blur' },
      ],
      orderNum: [
        { required: true, message: '菜单顺序不能为空', trigger: 'blur' },
      ],
      path: [{ required: true, message: '路由地址不能为空', trigger: 'blur' }],
    },
    formItems: [
      {
        field: 'parentId',
        type: 'treeSelect',
        options: ref([]),
        label: '上级部门',
        config: {
          props: { value: 'deptId', label: 'deptName', children: 'children' },
          valueKey: 'deptId',
          checkStrictly: true,
        },
        layout: {
          xl: 24,
          gl: 24,
          md: 24,
          sm: 24,
          xs: 24,
        },
      },
      {
        field: 'deptName',
        type: 'input',
        label: '部门名称',
      },
      {
        field: 'orderNum',
        type: 'inputNumber',
        label: '显示排序',
        config: {
          controlsPosition: 'right',
          min: 0,
        },
      },
      {
        field: 'leader',
        type: 'input',
        label: '负责人',
      },
      {
        field: 'phone',
        type: 'input',
        label: '联系电话',
      },
      {
        field: 'email',
        type: 'input',
        label: '邮箱',
      },
      {
        field: 'status',
        type: 'radio',
        label: '部门状态',
        isGroup: true,
        options: [],
        config: {
          clearable: false,
        },
        optionConfig: {
          border: true,
        },
      },
    ],
    colLayout: {
      xl: 12,
      gl: 12,
      md: 12,
      sm: 24,
      xs: 24,
    },
    elFormConfig: {
      labelWidth: '80px',
    },
  }
}
