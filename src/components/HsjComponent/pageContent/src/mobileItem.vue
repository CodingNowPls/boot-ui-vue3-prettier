<template>
  <div class="data-list">
    <div class="data-card" v-for="item in dataList" :key="item[primaryKey]">
      <!-- 卡片内容区 -->
      <div class="card-content">
        <!-- 头部（订单号和状态） -->
        <div class="card-header">
          <div class="order-number">
            <span class="label">{{ getHeaderFields[0].label }}：</span>
            <span class="value">{{ item[getHeaderFields[0].prop] }}</span>
          </div>
          <div class="status-tag" v-if="statusField">
            <template v-if="statusField.slotName">
              <slot :name="statusField.slotName" :backData="item" />
            </template>
          </div>
        </div>

        <!-- 信息列表 -->
        <div class="info-list">
          <div class="info-row">
            <template v-for="field in getDisplayFields" :key="field.prop">
              <div
                class="info-item"
                :class="{ 'full-width': field.width >= 180 }"
              >
                <template v-if="field.slotName">
                  <slot :name="field.slotName" :backData="item" />
                </template>
                <template v-else>
                  <span class="label">{{ field.label }}：</span>
                  <span class="value">{{
                    formatValue(item[field.prop], field)
                  }}</span>
                </template>
              </div>
            </template>
          </div>
        </div>

        <!-- 底部操作区 -->
        <div class="card-footer" v-if="actionField">
          <slot :name="actionField.slotName" :backData="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'

const props = defineProps({
  dataList: {
    type: Array,
    required: true,
    default: () => [],
  },
  columns: {
    type: Array,
    required: true,
    default: () => [],
  },
  primaryKey: {
    type: String,
    default: 'id',
  },
})

// 获取头部字段（通常是订单号）
const getHeaderFields = computed(() => {
  return props.columns
    .filter((col) => col.prop !== 'todo' && col.prop !== 'status')
    .slice(0, 1)
})

// 获取状态字段
const statusField = computed(() => {
  return props.columns.find((col) => col.prop === 'status')
})

// 获取操作字段
const actionField = computed(() => {
  return props.columns.find((col) => col.prop === 'todo')
})

// 获取需要显示的字段（除去头部字段和操作字段）
const getDisplayFields = computed(() => {
  const headerProps = getHeaderFields.value.map((f) => f.prop)
  return props.columns.filter(
    (col) =>
      !headerProps.includes(col.prop) &&
      col.prop !== 'todo' &&
      col.prop !== 'status'
  )
})

// 格式化显示的值
const formatValue = (value, field) => {
  if (value === undefined || value === null) return '-'

  if (field.prop === 'createTime') {
    return dayjs(value).format('YYYY-MM-DD')
  }

  return value
}
</script>

<style lang="scss" scoped>
.data-list {
  padding: 12px;
  background: #f5f7fa;
}

.data-card {
  position: relative;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  .card-content {
    display: flex;
    flex-direction: column;
  }

  // 头部样式
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;

    .order-number {
      font-size: 15px;

      .label {
        color: #333;
        font-weight: 500;
      }

      .value {
        color: #333;
        font-weight: 500;
      }
    }
  }

  // 信息列表样式
  .info-list {
    padding: 16px;

    .info-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px 24px;
    }

    .info-item {
      display: flex;
      align-items: center;
      font-size: 14px;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;

      &.full-width {
        grid-column: 1 / -1;
        white-space: normal;
      }

      .label {
        color: #666;
        margin-right: 4px;
      }

      .value {
        color: #333;
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  // 底部操作区
  .card-footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 12px 16px;
    border-top: 1px solid #f0f0f0;
    background: #fafafa;
  }

  // 状态标签样式
  :deep(.status-tag) {
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 13px;
    background: #f0f9eb;
    color: #67c23a;

    &.active {
      background: #f0f9eb;
      color: #67c23a;
    }

    &.inactive {
      background: #fef0f0;
      color: #f56c6c;
    }
  }
}

// 响应式处理
@media screen and (max-width: 768px) {
  .data-list {
    padding: 8px;
  }

  .data-card {
    .info-list {
      padding: 12px;

      .info-row {
        grid-template-columns: repeat(2, 1fr);
        gap: 8px 16px;
      }
    }

    .info-item {
      font-size: 13px;
    }

    .card-footer {
      padding: 12px;
      flex-wrap: wrap;
    }
  }
}

// 超窄屏幕处理
@media screen and (max-width: 375px) {
  .data-card {
    .info-list .info-row {
      grid-template-columns: 1fr;
    }
  }
}
</style>
