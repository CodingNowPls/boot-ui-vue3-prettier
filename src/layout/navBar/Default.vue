<template>
  <div class="nav-bar">
    <div class="navTab">
      <NavTabs />
    </div>
    <NavMenus />
  </div>
</template>

<script setup>
import { useConfig } from '@/store/modules/layout.js'
import NavTabs from './Tabs.vue'
import NavMenus from './NavMenus.vue'

const config = useConfig()
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  height: 50px;
  margin: 20px var(--ba-main-space) 0 var(--ba-main-space);
  justify-content: space-between;
  .navTab {
    flex: 1;
    display: flex;
    overflow: auto;
  }
  :deep(.nav-tabs) {
    display: flex;
    height: 100%;
    position: relative;
    .ba-nav-tab {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20px;
      cursor: pointer;
      z-index: 1;
      user-select: none;
      opacity: 0.7;
      color: v-bind('config.getColorVal("headerBarTabColor")');
      .close-icon {
        padding: 2px;
        margin: 2px 0 0 4px;
      }
      .close-icon:hover {
        background: var(--ba-color-primary-light);
        color: var(--el-border-color) !important;
        border-radius: 50%;
      }
      &.active {
        color: v-bind('config.getColorVal("headerBarTabActiveColor")');
      }
      &:hover {
        opacity: 1;
      }
    }
    .nav-tabs-active-box {
      position: absolute;
      height: 40px;
      border-radius: var(--el-border-radius-base);
      background-color: v-bind(
        'config.getColorVal("headerBarTabActiveBackground")'
      );
      box-shadow: var(--el-box-shadow-light);
      transition: all 0.2s;
      -webkit-transition: all 0.2s;
    }
  }
}
.menu {
  width: 331px;
  background: #444;
}
</style>
