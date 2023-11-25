<script setup>
const props = defineProps({
  border: {
    type: Boolean,
    default: true,
  },
  dataList: {
    // 数据
    type: Array,
    default: () => [],
  },
  tableItem: {
    // 每列的名字
    type: Array,
    default: () => [],
  },
  tableListener: {
    type: Object,
    default: () => {
      return {}
    },
  },
  showChoose: {
    // 是否展示复选框
    type: Boolean,
    default: false,
  },
  showIndex: {
    // 是否展示序号
    type: Boolean,
    default: false,
  },
  pagination: {
    // 是否显示分页
    type: Boolean,
    default: true,
  },
  listCount: {
    //总条数
    type: Number,
    default: 0,
  },
  paginationInfo: {
    // 分页的页码和偏移
    type: Object,
    default: () => ({ pageNum: 1, pageSize: 50 }),
  },
  elTableConfig: {
    type: Object,
    default: () => {
      return {}
    },
  },
  showExpand: {
    type: Boolean,
    default: false,
  },
  align: {
    type: String,
    default: 'center',
  },
  changeColor: {
    type: Boolean,
    default: false,
  },
  paginationLayout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  otherStartColumn: {
    type: Array,
    default: () => [],
  },
  hideItems: {
    type: [Array, Object],
    default: () => ({}),
  },
})
const emit = defineEmits(['update:paginationInfo', 'sortChange'])
const elTableRef = ref(null)
const handleCurrentChange = (pageNum) => {
  elTableRef.value.setScrollTop(0)
  setTimeout(() => {
    // 让CurrentChange比sizeChange后执行
    emit('update:paginationInfo', { ...props.paginationInfo, pageNum })
  }, 0)
}
const sortChange = (order) => {
  elTableRef.value.setScrollTop(0)
  emit('sortChange', order)
}
const handleSizeChange = (pageSize) => {
  elTableRef.value.setScrollTop(0)
  emit('update:paginationInfo', {
    ...props.paginationInfo,
    pageSize,
  })
}
const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
const hasSlot = (slots, arr) => {
  return arr.some((key) => slots.hasOwnProperty(key))
}

const isHiddenItem = (item) => {
  let flag = false
  if (isRef(props.hideItems)) {
    if (props.hideItems.value.includes(item.prop)) {
      flag = true
    }
  }
  return flag
}
const tableHeight = () => {
  const viewportHeight = window.innerHeight - 253
  return 400
}
let maxHeight = tableHeight()
let expandAll = false
// 使用递归写法比设置default-expand-all来控制折叠和展开性能高很多
const setUnFoldAll = (children, unfold) => {
  for (const key in children) {
    elTableRef.value.toggleRowExpansion(children[key], unfold)
    if (children[key].children) {
      setUnFoldAll(children[key].children, unfold)
    }
  }
}

const unFoldAll = (...arg) => {
  if (arg) {
    expandAll = arg[0]
    setUnFoldAll(props.dataList, expandAll)
  } else {
    expandAll = !expandAll
    setUnFoldAll(props.dataList, expandAll)
  }
}

defineExpose({
  elTableRef,
  unFoldAll,
})
</script>

<template>
  <div class="lmw-table">
    <div class="header" v-if="hasSlot($slots, ['handleLeft', 'handleRight'])">
      <slot name="header">
        <div class="handle">
          <slot name="handleLeft"></slot>
        </div>
        <div class="handleRight">
          <slot name="handleRight"></slot>
        </div>
      </slot>
    </div>
    <el-table
      class="elTable"
      ref="elTableRef"
      :data="dataList"
      :border="border"
      :maxHeight="maxHeight"
      :show-overflow-tooltip="true"
      style="width: 100%"
      stripe
      @sort-change="sortChange"
      v-on="tableListener"
      v-bind="elTableConfig"
    >
      <el-table-column type="expand" v-if="showExpand">
        <template #default="{ row }">
          <slot name="expand" :backData="row"></slot>
        </template>
      </el-table-column>
      <el-table-column
        type="selection"
        width="55"
        :align="align"
        v-if="showChoose"
      ></el-table-column>
      <el-table-column
        width="55"
        :align="align"
        label="序号"
        type="index"
        v-if="showIndex"
      ></el-table-column>

      <template v-for="item in tableItem" :key="item.prop">
        <el-table-column
          :align="align"
          v-bind="item"
          v-if="!isHiddenItem(item) && !item.hide"
        >
          <template #header v-if="!item.useOwn">
            <slot :name="`${item.slotName}Header`">
              {{ item.label }}
            </slot>
          </template>
          <template v-else #header="{ column }">
            <slot :name="item.prop" :backData="column"></slot>
          </template>

          <template #default="scope">
            <slot
              :name="item.slotName"
              :backData="scope.row"
              :currentItem="item"
            >
              <template v-if="item.prop">
                {{ scope.row[item.prop] }}
              </template>
            </slot>
          </template>
          <template v-for="slotName in item.slotNames" #[slotName]="slotData">
            <slot
              :name="`${item.prop}` + capitalizeFirstLetter(slotName)"
              :backData="slotData"
            ></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <div class="footer" v-if="pagination">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationInfo.pageNum"
          :page-sizes="[50, 100, 200, 300]"
          :page-size="paginationInfo.pageSize"
          :layout="paginationLayout"
          :total="listCount"
          background
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  /* display: flex;
  background-color: var(--ba-bg-color-overlay);
  border: 1px solid var(--ba-border-color);
  border-bottom: none;
  padding: 13px 15px; */

  position: relative;
  overflow-x: auto;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 100%;
  background-color: var(--ba-bg-color-overlay);
  border: 1px solid var(--ba-border-color);
  border-bottom: none;
  padding: 13px 15px;
  font-size: 14px;
  .table-header-operate-text {
    margin-left: 6px;
  }
}
.footer {
  :deep(.el-pagination) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-end;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    background-color: var(--ba-bg-color-overlay);
    padding: 13px 15px;
  }
}
.btns {
  display: flex;
}
.lmw-table {
  :deep(
      .el-table__body-wrapper .el-table-column--selection > .cell,
      .el-table__header-wrapper .el-table-column--selection > .cell
    ) {
    display: block;
  }
}
</style>
