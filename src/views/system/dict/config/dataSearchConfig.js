export default (otherConfig = {}) => {
  return {
    itemStyle: { padding: '15px 20px 0px 0px' },
    formItems: [
      {
        label: '字典名称',
        field: 'dictType',
        type: 'select',
        options: [],
        setLabel: 'dictName',
        setValue: 'dictType',
      },
      {
        label: '字典标签',
        field: 'dictLabel',
        type: 'input',
      },
      {
        label: '状态',
        field: 'status',
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
