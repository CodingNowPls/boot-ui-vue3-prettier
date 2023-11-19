<script setup>
import { ref } from 'vue'
const props = defineProps({
  data: {
    required: true,
  },
  options: {
    type: Array,
    default: () => {
      return []
    },
  },
  config: {
    type: Object,
    default: () => {
      return {}
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  inputEventFunction: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const dropdown = ref(null)

const labelInfo = ref('')
const inputFocus = () => {
  dropdown.value?.handleOpen()
}
const handleValueChange = (value) => {
  labelInfo.value = value
  emit('update:data', value)
}
const checkInfo = (item) => {
  labelInfo.value = item.label
  emit('update:data', item.value)
}
const emit = defineEmits(['update:data'])
</script>

<template>
  <div class="dropdownCpn">
    <el-input
      @update:modelValue="handleValueChange($event)"
      :model-value="labelInfo"
      @click="inputFocus"
      :disabled="disabled"
      v-on="inputEventFunction || {}"
    >
    </el-input>
    <div class="dropdown" v-show="options.length !== 0">
      <el-dropdown
        ref="dropdown"
        trigger="contextmenu"
        popper-class="inputDropDown"
        :teleported="false"
      >
        <span class="el-dropdown-link"> </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in options"
              @click="checkInfo(item)"
              :key="item.value"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdownCpn {
  position: relative;
}
.dropdown {
  position: absolute;
}
</style>
<style lang="scss">
.inputDropDown {
  min-width: 100px;
  .el-popper__arrow {
    width: 100% !important;
  }
  .el-popper__arrow::before {
    left: calc(50% - 5px) !important;
  }
}
</style>
