export default (listeners = {}) => {
  return {
    formItems: [
      {
        field: '',
        type: 'input',
        label: '',
        config: {
          maxlength: 30,
        },
      },
      {
        field: '',
        type: 'inputNumber',
        label: '岗位顺序',
        config: {
          controlsPosition: 'right',
          min: 0,
        },
      },
      {
        field: '',
        type: 'radio',
        label: '',
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
        field: '',
        type: 'textarea',
        label: '',
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
    itemStyle: {
      padding: '0px 8px 0px 8px',
    },
    elFormConfig: {
      labelWidth: '80px',
    },
    hideItems: ref([]),
  }
}
