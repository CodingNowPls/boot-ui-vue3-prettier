export default (listeners = {}) => {
  return {
    rules: {
      name: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
      sex: [{ required: true, message: '性别不能为空', trigger: 'change' }],
      age: [{ required: true, message: '年龄不能为空', trigger: 'blur' }],
    },
    formItems: [
      {
        field: 'nickName',
        type: 'input',
        label: '用户昵称',
        config: {
          clearable: false,
          maxlength: 30,
        },
      },
      {
        label: '归属部门',
        field: 'deptId',
        type: 'treeSelect',
        options: ref([]),
        config: {
          props: { label: 'label', value: 'id', children: 'children' },
        },
      },
      {
        field: 'phonenumber',
        type: 'input',
        label: '手机号码',
        config: {
          clearable: false,
          maxlength: 11,
        },
      },
      {
        field: 'email',
        type: 'input',
        label: '邮箱',
        config: {
          clearable: false,
          maxlength: 50,
        },
      },
      {
        field: 'userName',
        type: 'input',
        label: '用户名称',
        config: {
          clearable: false,
          maxlength: 30,
        },
      },

      {
        field: 'password',
        type: 'password',
        label: '用户密码',
        config: {
          clearable: false,
          maxlength: 20,
          showPassword: true,
        },
      },
      {
        field: 'sex',
        type: 'select',
        options: [],
        label: '性别',
        config: {
          clearable: false,
        },
      },

      {
        field: 'status',
        type: 'radio',
        options: [],
        label: '状态',
        config: {
          clearable: false,
        },
      },

      {
        field: 'postIds',
        type: 'select',
        options: [],
        label: '岗位',
        config: {
          clearable: false,
          multiple: true,
        },
        setValue: 'postId',
        setLabel: 'postName',
      },
      {
        field: 'roleIds',
        type: 'select',
        options: [],
        config: {
          clearable: false,
          multiple: true,
        },
        label: '角色',
        setValue: 'roleId',
        setLabel: 'roleName',
      },
      {
        field: 'userId',
        type: 'textarea',
        label: '备注',
        layout: {
          xl: 24,
          gl: 24,
          md: 24,
          sm: 24,
          xs: 24,
        },
      },
    ],
    colLayout: {
      xl: 12,
      gl: 12,
      md: 12,
      sm: 12,
      xs: 24,
    },
    itemStyle: {
      padding: '0px 8px 0px 8px',
    },
    elFormConfig: {
      labelWidth: '80px',
    },
    hideItems: ref([]),
  }
}
