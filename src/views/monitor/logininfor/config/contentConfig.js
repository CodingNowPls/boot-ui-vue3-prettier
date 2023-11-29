export const tableItem = [
  {
    prop: 'infoId',
    label: '日志编号',
    width: '100',
  },
  {
    prop: 'userName',
    label: '用户名称',
    sortable: true,
  },
  {
    prop: 'ipaddr',
    label: '地址',
  },
  {
    prop: 'loginLocation',
    label: '登录地点',
  },
  {
    prop: 'os',
    label: '操作系统',
  },
  {
    prop: 'browser',
    label: '浏览器',
  },
  {
    prop: 'status',
    label: '登录状态',
    slotName: 'statusSlot',
  },
  {
    prop: 'msg',
    label: '描述',
  },
  {
    prop: 'loginTime',
    label: '访问时间',
    sortable: true,
    width: 160,
  },
  {
    prop: 'todo',
    label: '操作',
    width: '100',
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
      showOverflowTooltip: false,
    },
    showIndex: false,
    showChoose: true,
    pagination: true,
  }
}
