export const tableItem = [
  {
    prop: 'postId',
    label: '岗位编号',
  },
  {
    prop: 'postCode',
    label: '岗位编码',
  },
  {
    prop: 'postName',
    label: '岗位名称',
  },

  {
    prop: 'postSort',
    label: '岗位排序',
  },
  {
    prop: 'status',
    label: '状态',
    width: '120',
    slotName: 'statusSlot',
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: '180',
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
    },
    showIndex: false,
    showChoose: true,
    pagination: true,
    // border: false,
  }
}
