export default (listeners = {}) => {
  return {
    rules: {
      username: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入账号',
        },
      ],
      password: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入密码',
        },
      ],
      code: [
        {
          required: true,
          trigger: 'blur',
          message: '请输入验证码',
        },
      ],
    },

    itemStyle: {},
    formItems: [
      {
        field: 'username',
        type: 'input',
        config: {
          placeholder: '账号',
          size: 'large',
        },
        eventFunction: listeners.listener,
        slotNames: ['prefix'],
      },
      {
        field: 'password',
        type: 'password',
        config: {
          placeholder: '密码',
          size: 'large',
          clearable: false,
        },
        eventFunction: listeners.listener,
        slotNames: ['prefix'],
      },
      {
        field: 'code',
        type: 'custom',
        isHidden: listeners.codeHide,
        layout: {
          xs: 24,
          sm: 24,
          md: 24,
          gl: 24,
          xl: 24,
        },
      },
      {
        // label: '记住密码',
        options: [
          {
            label: '记住密码',
            value: true,
          },
        ],
        field: 'rememberMe',
        type: 'checkBox',
        hideLabel: true,
      },
    ],
    colLayout: {
      xl: 24,
      gl: 24,
      md: 24,
      sm: 24,
      xs: 24,
    },
    footerLayout: {
      xl: 24,
      gl: 24,
      md: 24,
      sm: 24,
      xs: 24,
    },
  }
}
