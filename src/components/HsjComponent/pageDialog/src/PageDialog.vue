<script setup>
import { ref, watch } from 'vue'
import BaseForm from '@/BaseComponent/BaseForm'
import businessStore from '@/store/business/businessStore'
import to from '@/utils/to'

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
    default: '600px',
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
  isEditMore: {
    type: Boolean,
  },
  maxHeight: {
    type: String,
    default: 'initial',
  },
  search: {
    type: Function,
  },
  requestBaseUrl: {
    type: String,
    default: '/',
  },
})
const emits = defineEmits(['closed', 'editNext', 'beforeSave'])
const dialogVisible = ref(false)
const formData = ref({})
const title = ref('')
const formRef = ref(null)
const store = businessStore()
const loading = ref(false)
const tableSelected = ref([])

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
      emits('beforeSave')
      return await store.editDataAction({
        pageName: props.pageName,
        requestUrl: props.requestUrl,
        editInfo: {
          ...props.otherInfo,
          ...formData.value,
        },
        id:
          props.infoInit[props.idKey] ??
          props.infoInit[props.pageName + 'Id'] ??
          props.infoInit['id'],
        sendIdKey: props.sendIdKey,
        requestBaseUrl: props.requestBaseUrl,
      })
    } else {
      //新建
      emits('beforeSave')
      return await store.createDataAction({
        pageName: props.pageName,
        requestUrl: props.requestUrl,
        newData: {
          ...props.otherInfo,
          ...formData.value,
        },
        requestBaseUrl: props.requestBaseUrl,
      })
    }
  }
  const validate = await formRef.value?.getFormValidate()
  if (validate) {
    loading.value = true
    const [err, res] = await to(success())
    if (res) {
      props.search && props.search()
      if (props.isEditMore && tableSelected.value.length > 0) {
        const current = tableSelected.value.shift()
        emits('editNext', current)
      } else {
        dialogVisible.value = false
      }
    }
    loading.value = false
  }
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

const setFormData = (key, value) => {
  formData.value[key] = value
}

const changeSelected = (newValue) => {
  tableSelected.value = newValue
}
defineExpose({
  dialogVisible,
  title,
  formData,
  setFormData,
  changeSelected,
  formRef,
})
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
      <el-scrollbar class="ba-table-form-scrollbar" :max-height="maxHeight">
        <BaseForm
          class="baseForm"
          v-model:data="formData"
          v-bind="dialogConfig"
          ref="formRef"
        >
          <template
            v-for="(value, slotName) in $slots"
            #[slotName]="{ backData }"
          >
            <slot :name="slotName" :backData="backData"> </slot>
          </template>
        </BaseForm>
        <slot></slot>
      </el-scrollbar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false" :loading="loading">
            取消
          </el-button>

          <el-button type="primary" @click="commitClick" :loading="loading">
            <span v-if="tableSelected.length > 0 && isEditMore">
              保存并编辑下一项
            </span>
            <span v-else>保存</span>
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
  :deep(.el-dialog__body) {
    padding: 20px 20px 0px 20px;
  }
  :deep(.el-dialog__footer) {
    text-align: right;
    padding-right: v-bind(footerPaddingRight) !important;
  }
  .baseForm {
    padding: 0 15px;
  }
}
</style>
