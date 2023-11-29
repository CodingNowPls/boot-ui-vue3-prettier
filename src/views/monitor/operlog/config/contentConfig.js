export const tableItem = [
  {
    prop: 'operId',
    label: '日志编号',
    width: '100',
  },
  {
    prop: 'title',
    label: '系统模块',
  },
  {
    prop: 'businessType',
    label: '操作类型',
    slotName: 'businessTypeSlot',
  },
  {
    prop: 'operName',
    label: '操作人员',
    sortable: true,
    width: 140,
  },
  {
    prop: 'operIp',
    label: '操作地址',
    width: 140,
  },
  {
    prop: 'status',
    label: '操作状态',
    slotName: 'statusSlot',
  },
  {
    prop: 'operTime',
    label: '操作日期',
    width: 160,
    sortable: true,
  },
  {
    prop: 'costTime',
    label: '消耗时间',
    slotName: 'costTimeSlot',
    sortable: true,
    width: 120,
  },
  {
    prop: 'todo',
    label: '操作',
    width: '120',
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
    },
    showIndex: false,
    showChoose: true,
    pagination: true,
  }
}
