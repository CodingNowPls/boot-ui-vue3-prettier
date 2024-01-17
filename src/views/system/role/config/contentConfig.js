export const tableItem = [
  {
    prop: 'roleId',
    label: '角色编号',
  },
  {
    prop: 'roleName',
    label: '角色名称',
  },
  {
    prop: 'roleKey',
    label: '权限字符',
  },

  {
    prop: 'roleSort',
    label: '显示顺序',
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
    width: '220',
    fixed: !window.isSmallScreen ? 'right' : false,
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
      rowKey: 'roleId',
    },
    showIndex: true,
    showChoose: true,
    pagination: true,
    selectionConfig: {
      selectable: (item) => {
        return item.roleId !== 1
      },
    },
  }
}
