<script setup name="Menu" lang="jsx">
import getSearchConfig from './config/searchConfig'
// import getContentConfig from './config/contentConfig.js'
import getDialogConfig from './config/dialogConfig.js'
import useDialog from '@/hooks/useDialog'
import getComputedConfig from '@/hooks/getPageConfig'
import IconSelector from '@/components/IconSelector/IconSelector.vue'
import { systemBaseUrl } from '@/api/config/base.js'
import { menu } from '@/views/pageName.js'

const proxy = inject('proxy')
const { sys_normal_disable, sys_show_hide } = proxy.useDict(
  'sys_normal_disable',
  'sys_show_hide'
)
const pageName = menu
const requestBaseUrl = systemBaseUrl
const pageSearchRef = ref(null)
const pageContentRef = ref(null)
// 控制页面排序字段
const descConfig = ref({})
// 点击保存会带上这里面的值（如果和要提交的表单键冲突那么会优先表单）
const otherInfo = ref({})
// 弹出层表单默认值
const defaultData = ref({
  menuType: 'M',
})
const tableData = ref([])
const piniaConfig = {
  listConfig: { listKey: 'data', countKey: 'total' },
  handleList: (list) => {
    const treeList = proxy.handleTree(list, 'menuId')
    const menu = { menuId: 0, menuName: '主类目', children: [] }
    menu.children = treeList
    tableData.value = [menu]
    return treeList
  },
}
// 弹出层要隐藏的formItem
const dialogHideItems = ref([])

const dictMap = {
  status: sys_normal_disable,
  parentId: tableData,
  visible: sys_show_hide,
}
// 搜索框配置
const searchConfig = getSearchConfig()
const searchConfigComputed = computed(() => {
  return getComputedConfig(searchConfig, dictMap)
})
// 列表配置
const tableSelected = ref([])
const tableListener = {
  selectionChange: (selected) => {
    tableSelected.value = selected
  },
}
// const contentConfig = getContentConfig()
// const contentConfigComputed = computed(() => {
//   return contentConfig
// })
// 弹出成form配置
const dialogLisenter = {
  menuTypeChange: (value) => {
    changeDialogHide(value)
  },
}
const changeDialogHide = (value) => {
  dialogHideItems.value = []
  if (value === 'M') {
    dialogHideItems.value = ['component', 'query', 'isCache', 'perms']
  }
  if (value === 'F') {
    dialogHideItems.value = [
      'icon',
      'isFrame',
      'path',
      'component',
      'query',
      'isCache',
      'visible',
    ]
  }
}
const dialogWidth = ref('700px')
const dialogConfig = getDialogConfig(dialogLisenter)
const dialogConfigComputed = computed(() => {
  dialogConfig.hideItems = dialogHideItems
  return getComputedConfig(dialogConfig, dictMap)
})
// 点击添加的回调函数
const addCallBack = () => {
  changeDialogHide(defaultData.value.menuType)
}
// 点击编辑的回调函数
const editCallBack = async (item, type) => {
  changeDialogHide(item.menuType)
  isEditMore.value = type
}
// 是不是多选之后再点的编辑
const isEditMore = ref(false)
// 获取弹出层配置
const [dialogRef, infoInit, addClick, editBtnClick] = useDialog(
  addCallBack,
  editCallBack,
  '添加'
)
const search = () => {
  pageSearchRef.value?.search()
}

// 页面查询的前置函数
const beforeSend = (queryInfo) => {
  if (queryInfo.dateRange && Array.isArray(queryInfo.dateRange)) {
    const dateRange = queryInfo.dateRange
    queryInfo['params[beginTime]'] = dateRange[0]
    queryInfo['params[endTime]'] = dateRange[1]
    delete queryInfo.dateRange
  }
}
// table上面的按钮权限配置
const permission = ref({
  add: 'system:menu:add',
  edit: 'system:menu:edit',
  del: 'system:menu:remove',
})

const handleAdd = (row) => {
  addClick()
  nextTick(() => {
    dialogRef.value?.setFormData('parentId', row.menuId)
  })
}

const unFoldAll = () => {
  pageContentRef.value?.baseTabelRef.unFoldAll()
}
const SelectionCell = ({ value, intermediate = false, onChange }) => {
  return (
    <ElCheckbox
      onChange={onChange}
      modelValue={value}
      indeterminate={intermediate}
    />
  )
}
const contentConfig = {
  tableItem: [
    {
      key: 'selection',
      align: 'center',
      width: 50,
      cellRenderer: ({ rowData }) => {
        const onChange = (value) => (rowData.checked = value)
        return <SelectionCell value={rowData.checked} onChange={onChange} />
      },

      headerCellRenderer: () => {
        const _data = unref(tableData)
        const onChange = (value) =>
          (tableData.value = _data.map((row) => {
            row.checked = value
            return row
          }))
        const allSelected = _data.every((row) => row.checked)
        const containsChecked = _data.some((row) => row.checked)
        return (
          <SelectionCell
            value={allSelected}
            intermediate={containsChecked && !allSelected}
            onChange={onChange}
          />
        )
      },
    },
    {
      key: 'menuName',
      title: '菜单名称',
      dataKey: 'menuName',
      width: 160,
      align: 'left',
    },
    {
      key: 'icon',
      title: '图标',
      width: 70,
      align: 'center',
      cellRenderer: ({ rowData }) => {
        if (rowData.icon) {
          return <SvgIcon iconClass={rowData.icon} size="16" />
        } else {
          return ''
        }
      },
    },
    {
      key: 'orderNum',
      title: '排序',
      dataKey: 'orderNum',
      width: 70,
      align: 'center',
    },
    {
      key: 'perms',
      title: '权限标识',
      dataKey: 'perms',
      width: 150,
      align: 'center',
    },
    {
      key: 'component',
      title: '组件路径',
      dataKey: 'component',
      align: 'center',
      width: 220,
    },
    {
      key: 'createTime',
      title: '创建时间',
      dataKey: 'createTime',
      align: 'center',
      width: 180,
    },
  ],
  elTableConfig: {
    expandColumnKey: 'menuName',
    rowKey: 'menuId',
  },
  pagination: false,
}
</script>
<template>
  <div class="default-main page">
    <PageSearch
      ref="pageSearchRef"
      :pageName="pageName"
      :searchConfig="searchConfigComputed"
    ></PageSearch>
    <PageContentV2
      ref="pageContentRef"
      :pageName="pageName"
      :contentConfig="contentConfig"
      :descConfig="descConfig"
      :dictMap="dictMap"
      :tableListener="tableListener"
      :tableSelected="tableSelected"
      :permission="permission"
      :piniaConfig="piniaConfig"
      :requestBaseUrl="requestBaseUrl"
      @beforeSend="beforeSend"
      @addClick="addClick"
    >
      <template #handleLeft>
        <el-button class="order16 ml12" type="info" @click="unFoldAll">
          展开/折叠
        </el-button>
      </template>
    </PageContentV2>
    <PageDialog
      ref="dialogRef"
      :width="getWidth(dialogWidth)"
      :pageName="pageName"
      :dialogConfig="dialogConfigComputed"
      :infoInit="infoInit"
      :search="search"
      :isEditMore="isEditMore"
      :otherInfo="otherInfo"
      :defaultData="defaultData"
      :requestBaseUrl="requestBaseUrl"
    >
      <template #iconCustom="{ backData }">
        <IconSelector v-model="backData.formData.icon"></IconSelector>
      </template>
    </PageDialog>
  </div>
</template>

<style scoped lang="scss">
.page {
  :deep(.page-dialog .el-radio) {
    margin-right: 20px;
  }
  :deep(.statusClass .el-radio-group) {
    width: 100%;
  }
  :deep(.edit) {
    margin: 0 12px;
  }
}
</style>
