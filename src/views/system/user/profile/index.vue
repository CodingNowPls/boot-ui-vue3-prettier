<script setup>
import UserInfo from './userInfo.vue'
</script>
<template>
  <div class="default-main profile">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <UserInfo></UserInfo>
      </el-col>
      <el-col :lg="6"> </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss"></style>
