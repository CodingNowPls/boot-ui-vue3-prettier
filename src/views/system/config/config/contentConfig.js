export const tableItem = [
  {
    prop: 'configId',
    label: '主键',
    width: '80',
  },
  {
    prop: 'configName',
    label: '参数名称',
  },
  {
    prop: 'configKey',
    label: '参数键名',
  },
  {
    prop: 'configValue',
    label: '参数键值',
  },
  {
    prop: 'configType',
    label: '系统内置',
    slotName: 'configTypeSlot',
    width: '100',
  },
  {
    prop: 'remark',
    label: '备注',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
  {
    prop: 'todo',
    label: '操作',
    width: '200',
    fixed: 'right',
    slotName: 'todo',
    showOverflowTooltip: false,
  },
]
export default () => {
  return {
    tableItem,
    elTableConfig: {
      tooltipOptions: {
        popperClass: 'lmw_popper',
        effect: 'light',
      },
      showOverflowTooltip: false,
    },
    showIndex: false,
    showChoose: true,
    pagination: false,
    // border: false,
  }
}
