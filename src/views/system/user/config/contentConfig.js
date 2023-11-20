export const tableItem = [
  {
    prop: 'userId',
    label: '用户编号',
    hide: false,
  },
  {
    prop: 'userName',
    label: '用户名称',
  },
  {
    prop: 'nickName',
    label: '用户昵称',
  },

  {
    prop: 'deptName',
    label: '部门',
  },
  {
    prop: 'phonenumber',
    label: '手机号码',
    width: '120',
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
    label: '操作',
    width: '180',
    fixed: 'right',
    slotName: 'todo',
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
      maxHeight: 600,
    },
    showIndex: true,
    showChoose: true,
    pagination: true,
    // border: false,
  }
}
