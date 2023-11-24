export const tableItem = [
  {
    prop: 'deptName',
    label: '部门名称',
    align: 'left',
  },
  {
    prop: 'orderNum',
    label: '排序',
  },
  {
    prop: 'status',
    label: '状态',
    slotName: 'statusSlot',
  },
  {
    prop: 'createTime',
    label: '创建时间',
  },
  {
    prop: 'todo',
    label: '操作',
    width: '250',
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
      rowKey: 'deptId',
      treeProps: { children: 'children', hasChildren: 'hasChildren' },
      stripe: false,
      defaultExpandAll: true,
    },
    showIndex: false,
    showChoose: true,
    pagination: false,
    // border: false,
  }
}
