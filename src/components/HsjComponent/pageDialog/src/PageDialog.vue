<script setup>
import { ref, watch } from 'vue'
import BaseForm from '@/base-component/BaseForm'
import businessStore from '@/store/business/businessStore'

const props = defineProps({
  infoInit: {
    type: Object,
    default: () => ({}),
  },
  otherInfo: {
    type: Object,
    default: () => ({}),
  },
  searchData: {
    type: Object,
    default: () => ({}),
  },
  pageName: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '40%',
  },
  top: {
    type: String,
    default: '10vh',
  },
  dialogConfig: {
    type: Object,
    required: true,
    default: () => [],
  },
  otherRequestOption: {
    type: Object,
    default: () => {},
  },
  defaultData: {
    type: Object,
    default: () => ({}),
  },
  requestUrl: {
    type: String,
    default: 'list',
  },
  idKey: {
    type: String,
  },
  sendIdKey: {
    type: String,
  },
})
const emits = defineEmits(['closed'])
const dialogVisible = ref(false)
const formData = ref({})
const title = ref('')
const formRef = ref(null)
const store = businessStore()
const loading = ref(false)

watch(
  () => props.infoInit,
  (newValue) => {
    if (Object.keys(props.infoInit).length) {
      for (const item of props.dialogConfig.formItems) {
        formData.value[`${item.field}`] = newValue[`${item.field}`]
      }
    } else {
      for (const item of props.dialogConfig.formItems) {
        formData.value[`${item.field}`] = props.defaultData[`${item.field}`]
      }
    }
  }
)

const commitClick = async () => {
  const success = async () => {
    if (Object.keys(props.infoInit).length) {
      //编辑
      await store.editDataAction({
        pageName: props.pageName,
        requestUrl: props.requestUrl,
        editInfo: {
          ...formData.value,
          ...props.otherInfo,
          ...props.otherRequestOption,
        },
        searchData: { ...props.searchData, ...props.otherRequestOption },
        id:
          props.infoInit[props.idKey] ??
          props.infoInit[props.pageName + 'Id'] ??
          props.infoInit['id'],
        sendIdKey: props.sendIdKey,
      })
    } else {
      //新建
      await store.createDataAction({
        pageName: props.pageName,
        requestUrl: props.requestUrl,
        newData: {
          ...formData.value,
          ...props.otherInfo,
          ...props.otherRequestOption,
        },
        searchData: { ...props.searchData, ...props.otherRequestOption },
      })
    }
  }
  await formRef.value?.commit(success, loading, dialogVisible)
}
const footerPaddingRight = computed(() => {
  let pr = 30
  if (props.dialogConfig?.itemStyle?.padding) {
    const padding = props.dialogConfig.itemStyle.padding
    const arr = padding.split(' ')
    if (arr[1]) {
      let num = arr[1].split('px')[0]
      pr += Number(num)
    }
  }
  return pr + 'px'
})
const dialogClosed = () => {
  emits('closed')
}
defineExpose({ dialogVisible, title, formData })
</script>
<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      :top="top"
      :width="width"
      :close-on-click-modal="false"
      draggable
      destroy-on-close
      @closed="dialogClosed"
    >
      <BaseForm v-model:data="formData" v-bind="dialogConfig" ref="formRef">
        <template
          v-for="(value, slotName) in $slots"
          #[slotName]="{ backData }"
        >
          <slot :name="slotName" :backData="backData"></slot>
        </template>
      </BaseForm>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>

          <el-button type="primary" @click="commitClick" :loading="loading">
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.page-dialog {
  :deep(.el-dialog__header) {
    text-align: left;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--ba-bg-color);
  }
  :deep(.el-dialog__title) {
    font-size: 16px;
  }
  :deep(.el-dialog__body) {
    padding: 20px 30px 0px 30px;
  }
  :deep(.el-dialog__footer) {
    text-align: right;
    padding-right: v-bind(footerPaddingRight) !important;
  }
}
</style>
