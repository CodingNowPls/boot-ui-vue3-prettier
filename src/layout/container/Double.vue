<template>
  <el-container class="layout-container">
    <Aside />
    <el-container class="content-wrapper">
      <Header />
      <Main />
    </el-container>
  </el-container>
</template>

<script setup>
import Aside from '../components/Aside.vue'
import Header from '../components/Header.vue'
import Main from '../components/Main.vue'
</script>

<style scoped>
.layout-container {
  height: 100%;
  width: 100%;
}
.content-wrapper {
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
