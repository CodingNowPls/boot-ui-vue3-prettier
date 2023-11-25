export const tableItem = [
  {
    prop: 'noticeId',
    label: '序号',
    width: '80',
  },
  {
    prop: 'noticeTitle',
    label: '公告标题',
  },
  {
    prop: 'noticeType',
    label: '公告类型',
    slotName: 'noticeTypeSlot',
    width: '100',
  },
  {
    prop: 'status',
    label: '状态',
    slotName: 'statusSlot',
  },
  {
    prop: 'createBy',
    label: '创建者',
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
      stripe: false,
      showOverflowTooltip: false,
    },
    showIndex: false,
    showChoose: true,
    pagination: false,
    // border: false,
  }
}
