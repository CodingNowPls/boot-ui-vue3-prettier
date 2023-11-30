<template>
  <div class="lmw-from">
    <el-form
      ref="elFormRef"
      :rules="rules"
      :model="data"
      :scroll-to-error="true"
      v-bind="elFormConfig"
    >
      <el-row v-bind="rowConfig">
        <template v-for="item in formItems">
          <el-col
            v-bind="item.layout ? item.layout : colLayout"
            :class="`${item.field}Col`"
            v-if="!isHiddenItem(item)"
          >
            <el-form-item
              class="form-item"
              :class="`${item.field}Class`"
              v-show="!item.isHidden"
              :label="item.hideLabel ? '' : item.label"
              :style="itemStyle"
              :prop="item.field"
              v-bind="item.formItemConfig"
            >
              <slot
                :name="`${item.field}Before`"
                :backData="{ item, data: data[`${item.field}`] }"
              ></slot>
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  clearable
                  :ref="(el) => setItemRef(el, item.field)"
                  :disabled="allDisabled"
                  :show-password="item.type === 'password'"
                  :placeholder="'请输入' + item.label"
                  :model-value="data[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  @keyup.enter="keyUpEnter($event, item)"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                >
                  <template v-for="slotName in item.slotNames" #[slotName]>
                    <slot
                      :name="`${item.field}` + capitalizeFirstLetter(slotName)"
                      :backData="{
                        item,
                        dataValue: data[`${item.field}`],
                        data,
                      }"
                    >
                    </slot>
                  </template>
                </el-input>
              </template>
              <template v-if="item.type === 'inputNumber'">
                <el-input-number
                  :model-value="data[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                />
              </template>
              <template v-if="item.type === 'textarea'">
                <el-input
                  :ref="(el) => setItemRef(el, item.field)"
                  type="textarea"
                  maxlength="150"
                  show-word-limit
                  :placeholder="'请输入' + item.label"
                  :disabled="allDisabled"
                  :model-value="data[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                >
                  <template v-for="slotName in item.slotNames" #[slotName]>
                    <slot
                      :name="`${item.field}` + capitalizeFirstLetter(slotName)"
                      :backData="item"
                    >
                    </slot>
                  </template>
                </el-input>
              </template>
              <template v-if="item.type === 'cascader'">
                <el-cascader
                  clearable
                  :ref="(el) => setItemRef(el, item.field)"
                  :disabled="allDisabled"
                  :placeholder="'请选择' + item.label"
                  :options="getOptions(item)"
                  v-model="data[`${item.field}`]"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                >
                  <template v-for="slotName in item.slotNames" #[slotName]>
                    <slot
                      :name="`${item.field}` + capitalizeFirstLetter(slotName)"
                    >
                    </slot>
                  </template>
                </el-cascader>
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  :ref="(el) => setItemRef(el, item.field)"
                  :disabled="allDisabled"
                  :placeholder="'请选择' + item.label"
                  :model-value="data[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  clearable
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                >
                  <el-option
                    v-for="option in getOptions(item)"
                    :value="
                      item.setValue ? option[item.setValue] : option.value
                    "
                    :label="
                      item.setLabel ? option[item.setLabel] : option.label
                    "
                    :key="option.key ?? option.value"
                    @click="
                      item.optionsClick
                        ? item.optionsClick(option)
                        : optionsClick(option)
                    "
                  >
                  </el-option>
                  <template v-for="slotName in item.slotNames" #[slotName]>
                    <slot
                      :name="`${item.field}` + capitalizeFirstLetter(slotName)"
                    >
                    </slot>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'tree'">
                <el-tree
                  :ref="(el) => setItemRef(el, item.field)"
                  :data="getOptions(item)"
                  :style="{
                    width: '100%',
                  }"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                ></el-tree>
              </template>
              <template v-if="item.type === 'treeSelect'">
                <el-tree-select
                  :ref="(el) => setItemRef(el, item.field)"
                  :disabled="allDisabled"
                  :placeholder="'请选择' + item.label"
                  :model-value="data[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  :data="getOptions(item)"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                >
                </el-tree-select>
              </template>
              <template v-if="item.type === 'datepicker'">
                <el-date-picker
                  class="date"
                  :ref="(el) => setItemRef(el, item.field)"
                  :disabled="allDisabled"
                  :placeholder="'请选择' + item.label"
                  :model-value="data[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                >
                  <template v-for="slotName in item.slotNames" #[slotName]>
                    <slot
                      :name="`${item.field}` + capitalizeFirstLetter(slotName)"
                    >
                    </slot>
                  </template>
                </el-date-picker>
              </template>
              <template v-if="item.type === 'pickerColor'">
                <el-color-picker
                  :ref="(el) => setItemRef(el, item.field)"
                  :disabled="allDisabled"
                  :model-value="data[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                ></el-color-picker>
              </template>
              <template v-if="item.type === 'inputSearch'">
                <InputDropdown
                  :disabled="disabled || item.disabled"
                  :data="data[`${item.field}`]"
                  @update:data="handleValueChange($event, item.field)"
                  :options="item.options.value || item.options || []"
                  :inputEventFunction="item.eventFunction || {}"
                ></InputDropdown>
              </template>
              <template v-if="item.type === 'checkBox'">
                <el-checkbox-group
                  :ref="(el) => setItemRef(el, item.field)"
                  :disabled="allDisabled"
                  v-model="data[`${item.field}`]"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                  v-if="item.isGroup"
                >
                  <el-checkbox
                    v-for="option in getOptions(item)"
                    :key="option.key ?? option.value"
                    :label="option.value"
                    :disabled="allDisabled"
                    v-bind="item.optionConfig ?? {}"
                  >
                    {{ option.label }}
                  </el-checkbox>
                  <template v-for="slotName in item.slotNames" #[slotName]>
                    <slot
                      :name="`${item.field}` + capitalizeFirstLetter(slotName)"
                    >
                    </slot>
                  </template>
                </el-checkbox-group>
                <template v-else>
                  <el-checkbox
                    v-for="option in getOptions(item)"
                    v-model="data[`${item.field}`]"
                    :key="option.key ?? option.value"
                    :label="option.label"
                    :disabled="allDisabled"
                    v-bind="item.config"
                    v-on="item.eventFunction || {}"
                  >
                  </el-checkbox>
                </template>
              </template>
              <template v-if="item.type === 'radio'">
                <el-radio-group
                  :ref="(el) => setItemRef(el, item.field)"
                  :disabled="allDisabled"
                  v-model="data[`${item.field}`]"
                  v-bind="item.config"
                  v-on="item.eventFunction || {}"
                  v-if="item.isGroup"
                >
                  <el-radio
                    v-for="option in getOptions(item)"
                    :key="option.key ?? option.value"
                    :label="option.value"
                    :disabled="allDisabled"
                    v-bind="item.optionConfig ?? {}"
                  >
                    {{ option.label }}
                  </el-radio>
                  <template v-for="slotName in item.slotNames" #[slotName]>
                    <slot
                      :name="`${item.field}` + capitalizeFirstLetter(slotName)"
                    >
                    </slot>
                  </template>
                </el-radio-group>
                <template v-else>
                  <el-radio
                    v-for="option in getOptions(item)"
                    :ref="(el) => setItemRef(el, item.field)"
                    :disabled="allDisabled"
                    :label="option.value"
                    v-model="data[`${item.field}`]"
                    v-bind="item.config"
                    v-on="item.eventFunction || {}"
                  >
                    {{ option.label }}
                  </el-radio>
                </template>
              </template>
              <template v-if="item.type === 'custom'">
                <slot
                  :name="`${item.field}Custom`"
                  :backData="{
                    item: item,
                    formData: data,
                    data: data[`${item.field}`],
                  }"
                >
                  {{ data[`${item.field}`] }}
                </slot>
              </template>
              <slot
                :name="`${item.field}After`"
                :backData="{ item, data: data[`${item.field}`] }"
              ></slot>
            </el-form-item>
          </el-col>
        </template>
        <el-col
          v-bind="footerLayout"
          v-if="$slots['footer']"
          :style="itemStyle"
        >
          <div class="footer">
            <slot name="footer"></slot>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import InputDropdown from './cpn/inputDropdown/inputDropdown.vue'
const props = defineProps({
  // el-from的配置
  elFormConfig: {
    type: Object,
    default: () => {},
  },
  // 是否全部禁用
  allDisabled: {
    type: Boolean,
    default: false,
  },
  // 是一个数组对象，里面是el-form-item配置
  formItems: {
    type: Array,
    default: () => [],
  },
  // 数据
  data: {
    type: Object,
    required: true,
  },
  // el-form-item的style
  itemStyle: {
    type: Object,
    default: () => ({
      padding: '20px 20px 0px 0px',
    }),
  },
  // 布局适配
  colLayout: {
    type: Object,
    default: () => ({
      xl: 4, //1920
      gl: 6, //1200
      md: 8, //992
      sm: 12, //768
      xs: 24, //<768
    }),
  },
  footerLayout: {
    type: Object,
    default: () => ({
      xl: 3,
      gl: 4,
      md: 4,
      sm: 12,
      xs: 24,
    }),
  },
  // 表单正则校验
  rules: {
    type: Object,
    default: () => ({}),
  },
  rowConfig: {
    type: Object,
    default: () => {
      return {}
    },
  },
  hideItems: {
    type: [Array, Object],
    default: () => [],
  },
})
const emits = defineEmits(['update:data', 'keyUpEnter'])
let elFormRef = ref(null)
const allRefs = ref({})
const setItemRef = (el, type) => {
  if (el) {
    allRefs.value[type] = el
  }
}
const handleValueChange = (value, field) => {
  emits('update:data', { ...props.data, [field]: value })
}
const optionsClick = () => {}
let commit = async (
  success,
  loading = { value: false },
  dialogVisible = { value: false },
  autoCloseDialog = true
) => {
  let isSuccess = elFormRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      success && (await success())
      if (autoCloseDialog) {
        dialogVisible.value = false
      }
      loading.value = false
      return true
    } else {
      return false
    }
  })
  return isSuccess
}
let getFormValidate = async () => {
  return elFormRef.value.validate((valid) => {
    return valid
  })
}

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const isHiddenItem = (item) => {
  let flag = false
  if (isRef(props.hideItems)) {
    if (props.hideItems.value.includes(item.field)) {
      flag = true
    }
  }
  return flag
}
const getOptions = (item) => {
  return item.options?.value ?? item.options ?? []
}
const keyUpEnter = ($event, current) => {
  emits('keyUpEnter', {
    event: $event,
    current,
  })
}

defineExpose({
  commit,
  getFormValidate,
  allRefs,
  elFormRef,
})
</script>

<style scoped lang="scss">
.lmw-from {
  :deep(.el-form-item__label) {
    margin: 0px !important;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }
  :deep(.el-cascader) {
    width: 100%;
  }
  :deep(.el-select) {
    width: 100%;
  }
  :deep(.el-form-item__content) {
    width: 100%;
  }
  :deep(.el-date-editor) {
    width: 100%;
  }
  :deep(.el-input__clear) {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
}
.footer {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
