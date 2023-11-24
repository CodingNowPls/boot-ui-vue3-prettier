<script setup>
import useTagsViewStore from '@/store/modules/tagsView'
const tagsViewStore = useTagsViewStore()
</script>
<template>
  <el-main class="main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component
            v-if="!route.meta.link"
            :is="Component"
            :key="route.path"
          />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style scoped lang="scss">
.main {
  padding: 0;
}
</style>
