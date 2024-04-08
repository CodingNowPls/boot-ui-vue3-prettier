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
        label: '上级菜单',
        config: {
          props: { value: 'menuId', label: 'menuName', children: 'children' },
          valueKey: 'menuId',
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
        field: 'menuType',
        type: 'radio',
        label: '菜单类型',
        isGroup: true,
        options: [
          {
            label: '目录',
            value: 'M',
          },
          {
            label: '菜单',
            value: 'C',
          },
          {
            label: '按钮',
            value: 'F',
          },
        ],
        config: {
          clearable: false,
        },
        optionConfig: {
          border: true,
        },
        eventFunction: {
          change: listeners.menuTypeChange,
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
        label: '菜单图标',
        field: 'icon',
        type: 'custom',
        layout: {
          xl: 24,
          gl: 24,
          md: 24,
          sm: 24,
          xs: 24,
        },
      },
      {
        field: 'menuName',
        type: 'input',
        label: '菜单名称',
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
        field: 'isFrame',
        type: 'radio',
        label: '是否外链',
        isGroup: true,
        options: [
          {
            label: '是',
            value: '0',
          },
          {
            label: '否',
            value: '1',
          },
        ],
        config: {
          clearable: false,
        },
        optionConfig: {
          border: true,
        },
      },

      {
        field: 'path',
        type: 'input',
        label: '路由地址',
      },

      {
        field: 'component',
        type: 'input',
        label: '组件路径',
      },

      {
        field: 'perms',
        type: 'input',
        label: '权限字符',
      },

      {
        field: 'query',
        type: 'input',
        label: '路由参数',
      },

      {
        field: 'isCache',
        type: 'radio',
        label: '是否缓存',
        isGroup: true,
        options: [
          {
            label: '缓存',
            value: '0',
          },
          {
            label: '不缓存',
            value: '1',
          },
        ],
        config: {
          clearable: false,
        },
        optionConfig: {
          border: true,
        },
      },

      {
        field: 'visible',
        type: 'radio',
        label: '显示状态',
        isGroup: true,
        options: [],
        config: {
          clearable: false,
        },
        optionConfig: {
          border: true,
        },
      },

      {
        field: 'status',
        type: 'radio',
        label: '菜单状态',
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
      labelWidth: '100px',
    },
  }
}
