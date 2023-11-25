export default (listeners = {}) => {
  return {
    itemStyle: { padding: '0px 0px 0px 0px' },
    rules: {
      parentId: [
        { required: true, message: '上级部门不能为空', trigger: 'blur' },
      ],
      deptName: [
        { required: true, message: '部门名称不能为空', trigger: 'blur' },
      ],
      orderNum: [
        { required: true, message: '显示排序不能为空', trigger: 'blur' },
      ],
      email: [
        {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: ['blur', 'change'],
        },
      ],
      phone: [
        {
          pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
          message: '请输入正确的手机号码',
          trigger: 'blur',
        },
      ],
    },
    formItems: [
      {
        field: 'configName',
        type: 'input',
        label: '参数名称',
      },
      {
        field: 'configKey',
        type: 'input',
        label: '参数键名',
      },
      {
        field: 'configValue',
        type: 'input',
        label: '参数键值',
      },
      {
        field: 'configType',
        type: 'select',
        options: [],
        label: '系统内置',
      },
      {
        field: 'remark',
        type: 'textarea',
        label: '备注',
        config: {
          autosize: { minRows: 4, maxRows: 6 },
        },
      },
    ],
    colLayout: {
      xl: 24,
      gl: 24,
      md: 24,
      sm: 24,
      xs: 24,
    },
    elFormConfig: {
      labelWidth: '80px',
    },
  }
}
